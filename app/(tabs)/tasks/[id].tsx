import SafeHeader from "@/components/common/SafeHeader";
import { get, STORAGE_KEYS } from "@/lib/storage";
import { theme } from "@/styles/theme";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import dayjs from "dayjs";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const TaskDetails = () => {
  const { id } = useLocalSearchParams();
  const [taskDetail, setTaskDetail] = useState<any>({}); // only manage the task whose ID matches exactly.
  useEffect(() => {
    const fetchTask = async () => {
      const existingTasks = await get<any[]>(STORAGE_KEYS.TASKS);
      const taskArr = existingTasks ? existingTasks : [];
      const currTask = taskArr.find(t => t.id == id);
      if (currTask) {
        setTaskDetail(currTask);
      }
    };
    fetchTask();
  }, [id]);

  return (
    <View style={styles.container}>
      <SafeHeader title={taskDetail.taskName} style={styles.header} />
      <View style={styles.card}>
        <MaterialIcons
          style={styles.cardIcon}
          name="description"
          size={20}
          color="#aeaeb2"
        />
        <Text style={styles.title}>Description</Text>
        <Text style={styles.content}>{taskDetail.description}</Text>
      </View>

      <View style={styles.card}>
        <Fontisto
          style={styles.cardIcon}
          name="date"
          size={20}
          color="#aeaeb2"
        />
        <Text style={styles.title}>Create Time</Text>
        <Text style={styles.content}>
          {dayjs(Number(taskDetail.id)).format("YYYY-MM-DD HH:mm")}
        </Text>
      </View>

      <View style={styles.card}>
        <Ionicons
          style={styles.cardIcon}
          name="notifications"
          size={20}
          color="#aeaeb2"
        />
        <Text style={styles.title}>Due Time</Text>
        <Text style={styles.content}>
          {dayjs(taskDetail.dueDateTime).format("YYYY-MM-DD HH:mm")}
        </Text>
      </View>

      <View style={styles.card}>
        <MaterialIcons
          style={styles.cardIcon}
          name="category"
          size={20}
          color="#aeaeb2"
        />
        <Text style={styles.title}>Category</Text>
        <Text style={styles.content}>{taskDetail.category}</Text>
      </View>

      <View style={styles.card}>
        <MaterialCommunityIcons
          style={styles.cardIcon}
          name="priority-high"
          size={20}
          color="#aeaeb2"
        />
        <Text style={styles.title}>Priority</Text>
        <Text style={styles.content}>{taskDetail.priority}</Text>
      </View>

      <View style={styles.card}>
        <MaterialCommunityIcons
          style={styles.cardIcon}
          name="list-status"
          size={20}
          color="#aeaeb2"
        />
        <Text style={styles.title}>Status</Text>
        <Text style={styles.content}>{taskDetail.status}</Text>
      </View>
      {taskDetail.completedDateTime?.trim() != "" && (
        <View style={styles.card}>
          <MaterialIcons
            style={styles.cardIcon}
            name="done"
            size={20}
            color="#aeaeb2"
          />
          <Text style={styles.title}>Completed Time</Text>
          <Text style={styles.content}>
            {dayjs(taskDetail.completedDateTime).format("YYYY-MM-DD HH:mm")}
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.paddingL,
    backgroundColor: "#fff",
    height: "100%",
  },
  header: { marginBottom: theme.marginL },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: theme.paddingS,
    borderColor: "#e5e5ea",
  },
  cardIcon: { marginRight: theme.marginS },
  title: {
    color: theme.fontColor.bodyTextDark,
    fontSize: theme.fontSizeM,
    marginRight: theme.marginXs,
  },
  content: {
    marginLeft: theme.marginXs,
    fontSize: theme.fontSizeM,
    textAlign: "right",
    flex: 1,
    color: theme.fontColor.bodyTextDark,
  },
});
export default TaskDetails;
