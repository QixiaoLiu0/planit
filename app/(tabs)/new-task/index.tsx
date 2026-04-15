import FormField from "@/components/common/FormField";
import MyButton from "@/components/common/MyButton";
import OptionGroup from "@/components/common/OptionGroup";
import SafeHeader from "@/components/common/SafeHeader";
import Toast from "@/components/common/Toast";
import PriorityBtn from "@/components/new-task/PriorityBtn";
import { useTheme } from "@/context/ThemeContext";
import { CATEGORY_OPTIONS, REMINDER_OPTIONS } from "@/lib/constant";
import { get, set, STORAGE_KEYS } from "@/lib/storage";
import { theme } from "@/styles/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const Index = () => {
  const { activeColors } = useTheme();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Academics"); //current selected category
  const [priority, setPriority] = useState("Low");
  const [date, setDate] = useState(new Date());
  const [reminer, setReminer] = useState("Off");

  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const openPicker = (mode: "date" | "time") => {
    setPickerMode(mode);
    setShowPicker(true);
  };
  const onDatePickerChange = (event: any, selectedDate?: Date) => {
    // close picker dialog while onchanged
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  const triggerToast = (message: string) => {
    setToastMsg(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };
  const handleCreateTask = async () => {
    if (taskName.trim() === "" || description.trim() === "") {
      triggerToast("task name or description can not be empty!");
      return;
    }
    const newTask = {
      id: Date.now().toString(), //task id
      taskName: taskName.trim(),
      description: description.trim(),
      category,
      priority,
      dueDateTime: date.toISOString(),
      status: "onGoing",
      completedDateTime: "",
    };
    try {
      const existingTasks = await get<any[]>(STORAGE_KEYS.TASKS);
      const taskArr = existingTasks ? existingTasks : [];
      const updatedTask = [newTask, ...taskArr];
      await set(STORAGE_KEYS.TASKS, updatedTask);

      const checkData = await get(STORAGE_KEYS.TASKS);
      console.log("tasks：", JSON.stringify(checkData, null, 2));
      triggerToast("Task Created Successfully!");

      setTaskName("");
      setDescription("");
      setCategory("Academics");
      setPriority("Low");
      setDate(new Date());
      setReminer("Off");
    } catch (error) {}
  };
  //
  return (
    <View>
      <View style={styles.container}>
        <SafeHeader
          style={styles.header}
          title={"New Task"}
          rightContent={<MyButton title="Create" onClick={handleCreateTask} />}
        />

        {/* TASK NAME */}
        <FormField title={"TASK NAME"}>
          <TextInput
            value={taskName}
            onChangeText={setTaskName}
            style={[styles.taskNameInput, styles.taskInput]}
          />
        </FormField>
        {/* DESCRIPTION */}
        <FormField title={"DESCRIPTION"}>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={[styles.taskDescInput, styles.taskInput]}
          />
        </FormField>

        {/* CATEGORY */}
        <FormField title={"CATEGORY"}>
          <OptionGroup
            options={CATEGORY_OPTIONS}
            selectedValue={category}
            onSelect={setCategory}
          />
        </FormField>

        {/* PRIORITY */}
        <FormField title={"PRIORITY"}>
          <View style={styles.priorityWrapper}>
            <PriorityBtn
              title="Low"
              activeTitle={priority}
              onSelect={setPriority}
            />
            <PriorityBtn
              title="Medium"
              activeTitle={priority}
              onSelect={setPriority}
            />
            <PriorityBtn
              title="High"
              activeTitle={priority}
              onSelect={setPriority}
            />
          </View>
        </FormField>

        {/* Due Date & Time */}
        <FormField title={"DUE DATE & TIME"}>
          <View style={styles.calendarWrapper}>
            {/*left: date btn*/}
            <Pressable
              onPress={() => openPicker("date")}
              style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                styles.pickerWrapper,
              ]}
            >
              <Entypo name="calendar" size={14} color={activeColors.primary} />
              <Text style={styles.dateTimeText}>
                {dayjs(date).format("MMM DD, YYYY")}
              </Text>
            </Pressable>

            {/* right: time btn */}
            <Pressable
              onPress={() => openPicker("time")}
              style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                styles.pickerWrapper,
              ]}
            >
              <AntDesign
                name="clock-circle"
                size={14}
                color={activeColors.primary}
              />
              <Text style={styles.dateTimeText}>
                {dayjs(date).format("HH:mm")}
              </Text>
            </Pressable>
          </View>
        </FormField>
        {showPicker && (
          <DateTimePicker
            value={date} // current selected date
            mode={pickerMode} // date || time
            is24Hour={true}
            onChange={onDatePickerChange}
          />
        )}

        {/* Reminder */}
        <FormField title={"REMINDER"}>
          <OptionGroup
            options={REMINDER_OPTIONS}
            selectedValue={reminer}
            onSelect={setReminer}
          />
        </FormField>
      </View>
      <Toast visible={showToast} message={toastMsg} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.paddingL,
    height: "100%",
    backgroundColor: "#fff",
  },
  header: { marginBottom: theme.marginL },
  priorityWrapper: {
    flexDirection: "row",
  },
  calendarWrapper: {
    flexDirection: "row",
    gap: 5,
  },
  pickerWrapper: {
    flexDirection: "row",
    padding: theme.paddingM,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#e2e2e2",
    gap: 5,
  },
  taskInput: {
    padding: theme.paddingM,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#e5e5ea",
    backgroundColor: "#f5f5f7",
  },
  taskNameInput: {
    fontSize: theme.fontSizeXl,
    fontWeight: 600,
  },
  taskDescInput: {
    fontSize: theme.fontSizeS,
    fontWeight: 500,
  },
  dateTimeText: {
    color: theme.fontColor.bodyTextDark,
  },
  pill: { flexDirection: "row" },
});
