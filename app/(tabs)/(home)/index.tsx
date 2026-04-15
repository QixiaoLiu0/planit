import SafeHeader from "@/components/common/SafeHeader";
import Toast from "@/components/common/Toast";
import MyCalendar from "@/components/home/MyCalendar";
import OverdueNotificationBar from "@/components/home/OverdueNotificationBar";
import TaskOverviewItem from "@/components/home/TaskOverviewItem";
import { get, set, STORAGE_KEYS } from "@/lib/storage";
import { theme } from "@/styles/theme";
import dayjs from "dayjs";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Index = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // useEffect(() => {
  //   const nukeDirtyData = async () => {
  //     try {
  //       await remove(STORAGE_KEYS.TASKS);
  //       console.log("data cleared");
  //     } catch (e) {
  //       console.log("error", e);
  //     }
  //   };
  //   nukeDirtyData();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      // console.log("Home gets focused");
      const fetchTask = async () => {
        const existingTasks = await get<any[]>(STORAGE_KEYS.TASKS);
        // console.log("--- check data type ---");
        // console.log("typeof is:", typeof existingTasks);
        // console.log("is that array? :", Array.isArray(existingTasks));
        // console.log("content:", existingTasks);
        const taskArr = existingTasks ? existingTasks : [];
        setTasks(taskArr);
        // console.log(JSON.stringify(taskArr, null, 2));
      };
      fetchTask();

      return () => {
        console.log("Home loses focus！");
      };
    }, []),
  );

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

  const markedDates = useMemo(() => {
    const marks: { [key: string]: any } = {};
    allOngoingTasks.forEach(task => {
      const dateKey = dayjs(task.dueDateTime).format("YYYY-MM-DD");
      const isOverdue = dayjs(task.dueDateTime).isBefore(dayjs(), "day");
      const dotColor = isOverdue
        ? theme.themeColors.terracotta
        : theme.themeColors.teal;
      marks[dateKey] = {
        marked: true,
        dotColor,
      };
    });

    if (selectedDate) {
      marks[selectedDate] = {
        ...marks[selectedDate],
        selected: true,
        disableTouchEvent: true,
        selectedColor: theme.themeColors.teal,
      };
    }
    return marks;
  }, [tasks, selectedDate]);

  const handleTaskComplete = async (id: string, taskName: string) => {
    console.log(id);
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

  return (
    <View>
      <View style={styles.container}>
        <SafeHeader
          style={styles.header}
          title={
            dayjs().hour() < 12
              ? "Good Morning ☀️"
              : dayjs().hour() < 18
                ? "Good Afternoon ☕️"
                : "Good Evening 🌙"
          }
        />

        {overdueTasks.length > 0 && (
          <OverdueNotificationBar
            style={styles.notifiMargin}
            count={overdueTasks.length}
          />
        )}
        <Text style={styles.upcoming}>Upcoming</Text>
        <ScrollView
          style={styles.taskWrapper}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {upcomingTasks.length > 0 &&
            upcomingTasks.map(task => {
              return (
                <TaskOverviewItem
                  onPress={() => handleTaskComplete(task.id, task.taskName)}
                  key={task.id}
                  title={task.taskName}
                  duedate={dayjs(task.dueDateTime).format("MMM D HH:mm")}
                  oneWeekFromNow={
                    dayjs(task.dueDateTime).isAfter(dayjs()) &&
                    dayjs(task.dueDateTime).isBefore(dayjs().add(7, "day"))
                  }
                />
              );
            })}
          {upcomingTasks.length === 0 && (
            <View style={styles.taskEmpty}>
              <Text style={styles.taskEmptyText}>
                You don't have any task so far...
              </Text>
            </View>
          )}
        </ScrollView>

        <MyCalendar
          onDateSelected={setSelectedDate}
          markedDates={markedDates}
        />
      </View>
      <Toast visible={showToast} message={toastMsg} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.paddingL,
    backgroundColor: "#fff",
    height: "100%",
  },
  header: {
    marginBottom: theme.marginL,
  },
  upcoming: {
    fontSize: theme.fontSizeL,
    letterSpacing: theme.fontSizeL * 0.1,
    color: "#aeaeb2",
  },
  notifiMargin: {
    marginVertical: theme.marginS,
  },
  taskWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5ea",
    height: "40%",
    maxHeight: "40%",
  },
  taskEmpty: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  taskEmptyText: {
    fontSize: theme.fontSizeL,
    color: "#adadad",
  },
});
