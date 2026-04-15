import OptionGroup from "@/components/common/OptionGroup";
import SafeHeader from "@/components/common/SafeHeader";
import Toast from "@/components/common/Toast";
import CollapsibleTaskGroup from "@/components/tasks/CollapsibleTaskGroup";
import HistoryTaskItem from "@/components/tasks/HistoryTaskItem";
import HistoryToggle from "@/components/tasks/HistoryToggle";
import OverdueTaskItem from "@/components/tasks/OverDueTaskItem";
import TaskItem from "@/components/tasks/TaskItem";
import {
  TASK_CATEGORY_OPTIONS,
  TOGGLE_LABEL_HISTORY,
  TOGGLE_LABEL_UPCOMING,
} from "@/lib/constant";
import { get, set, STORAGE_KEYS } from "@/lib/storage";
import { theme } from "@/styles/theme";
import dayjs from "dayjs";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

/**
 * id, taskName, description, dueDateTime, category, priority, status, completedDateTime
 *
 * statue: string 'ongoing', 'completed', 'deleted'
 */

const Index = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [toggle, setToggle] = useState("Upcoming"); //current toggle value
  const [category, setCategory] = useState("All"); //current category
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useFocusEffect(
    useCallback(() => {
      // console.log("Task focused!!");
      const fetchTask = async () => {
        const existingTasks = await get<any[]>(STORAGE_KEYS.TASKS);
        const taskArr = existingTasks ? existingTasks : [];
        setTasks(taskArr);
        console.log(JSON.stringify(taskArr, null, 2));
      };
      fetchTask();

      return () => {
        // console.log("Task loses focus!!");
      };
    }, []),
  );
  //the tasks that the status are "Completed"
  const allCompletedTasks = useMemo(() => {
    if (!Array.isArray(tasks)) {
      return [];
    }
    return tasks.filter(task => task.status === "Completed");
  }, [tasks]);

  // the tasks that the status are "onGoing", regardless of due date
  const allOngoingTasks = useMemo(() => {
    if (!Array.isArray(tasks)) {
      return [];
    }
    return tasks.filter(task => task.status === "onGoing");
  }, [tasks]);

  //the tasks are overdue && status is "onGoing"
  const overdueTasks = allOngoingTasks.filter(task => {
    return dayjs(task.dueDateTime).isBefore(dayjs(), "day");
  });

  //the tasks are not overdue && status is "onGoing"
  const upcomingTasks = allOngoingTasks
    .filter(task => {
      return dayjs(task.dueDateTime).isAfter(dayjs());
    })
    .sort((x, y) => {
      return dayjs(x.dueDateTime).diff(dayjs(y.dueDateTime));
    });

  const handleToggleLabels = () => {
    return [
      { value: "Upcoming", count: upcomingTasks.length },
      { value: "History", count: allCompletedTasks.length },
    ];
  };
  const handleTaskComplete = async (id: string, taskName: string) => {
    // console.log(id, taskName);
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? {
            ...task,
            status: "Completed",
            completedDateTime: dayjs().toISOString(),
          }
        : task,
    );
    setTasks(updatedTasks);
    triggerToast(`${taskName} has been eliminated`);
    try {
      await set(STORAGE_KEYS.TASKS, updatedTasks);
    } catch (error) {}
  };
  const triggerToast = (message: string) => {
    setToastMsg(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };
  const handlePushTaskDetail = (id: string) => {
    router.push({ pathname: "/tasks/[id]", params: { id } });
  };
  const filterByCategory = (category: string) => {
    setCategory(category);
  };
  const filteredUpcomingTasks = useMemo(() => {
    if (category === "All") return upcomingTasks;
    return upcomingTasks.filter(task => task.category === category);
  }, [upcomingTasks, category]);
  return (
    <View>
      <View style={styles.container}>
        <SafeHeader title="My Tasks" style={styles.header} />
        {/* HistoryToggle */}
        <HistoryToggle
          style={styles.toggleWrapper}
          onSelect={setToggle}
          activeLabel={toggle}
          labels={handleToggleLabels()}
        />

        {/* toggle == Upcoming*/}
        {toggle === TOGGLE_LABEL_UPCOMING && (
          <>
            {overdueTasks.length > 0 && (
              <CollapsibleTaskGroup count={overdueTasks.length}>
                {overdueTasks.map(overdueTask => {
                  return (
                    <OverdueTaskItem
                      onRadioPress={() =>
                        handleTaskComplete(overdueTask.id, overdueTask.taskName)
                      }
                      onTaskPress={() => handlePushTaskDetail(overdueTask.id)}
                      key={overdueTask.id}
                      title={overdueTask.taskName}
                      hasRightIcon={true}
                    />
                  );
                })}
              </CollapsibleTaskGroup>
            )}
            <OptionGroup
              style={styles.categorySelecterWrapper}
              options={TASK_CATEGORY_OPTIONS}
              selectedValue={category}
              onSelect={val => filterByCategory(val)}
            />
            {filteredUpcomingTasks.map(filteredUpcomingTask => {
              return (
                <TaskItem
                  onRadioPress={() =>
                    handleTaskComplete(
                      filteredUpcomingTask.id,
                      filteredUpcomingTask.taskName,
                    )
                  }
                  onTaskPress={() =>
                    handlePushTaskDetail(filteredUpcomingTask.id)
                  }
                  key={filteredUpcomingTask.id}
                  id={filteredUpcomingTask.id}
                  title={filteredUpcomingTask.taskName}
                  dueDateTime={dayjs(filteredUpcomingTask.dueDateTime).format(
                    "MMM DD HH:mm",
                  )}
                  priority={filteredUpcomingTask.priority}
                />
              );
            })}
          </>
        )}

        {/* toggle == History*/}
        {toggle === TOGGLE_LABEL_HISTORY && (
          <>
            {allCompletedTasks.map(completedTask => {
              return (
                <HistoryTaskItem
                  onTaskPress={() => handlePushTaskDetail(completedTask.id)}
                  key={completedTask.id}
                  title={completedTask.taskName}
                  completedDate={dayjs(completedTask.completedDateTime).format(
                    "MMM DD HH:mm",
                  )}
                />
              );
            })}
          </>
        )}
      </View>
      <Toast visible={showToast} message={toastMsg} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    overflow: "scroll",
    position: "relative",
    paddingHorizontal: theme.paddingL,
  },
  header: { marginBottom: theme.marginL },
  toggleWrapper: { marginBottom: theme.marginL },
  categorySelecterWrapper: {
    marginVertical: theme.marginXs,
  },
});
