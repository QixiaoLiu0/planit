import { theme } from "@/styles/theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TaskItemProps {
  id: string;
  title?: string;
  dueDateTime?: string;
  priority?: "High" | "Medium" | "Low";
  onRadioPress: () => void;
  onTaskPress: () => void;
}
const TaskItem = ({
  title,
  dueDateTime,
  priority = "High",
  onRadioPress,
  onTaskPress,
}: TaskItemProps) => {
  const { bgColor, textColor } = theme.taskPriorityColor[priority];
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onRadioPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.radio]}
      >
        <View></View>
      </Pressable>
      <Pressable
        onPress={onTaskPress}
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 },
          styles.rightContent,
        ]}
      >
        <View style={styles.textWrapper}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.dueDateTime}>{dueDateTime}</Text>
        </View>
        <Text
          style={[
            styles.priorityWrapper,
            { backgroundColor: bgColor, color: textColor },
          ]}
        >
          {priority}
        </Text>
        <EvilIcons name="chevron-right" size={18} color="#aeaeb2" />
      </Pressable>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.paddingS,
    borderBottomColor: "#f1f1f1",
    borderBottomWidth: 1,
  },

  radio: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "#e1e1e1",
    marginRight: 10,
  },
  rightContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSizeXl,
    color: theme.fontColor.bodyTextDark,
    letterSpacing: theme.fontSizeXl * 0.05,
    marginBottom: theme.marginXs,
    fontWeight: 600,
  },
  dueDateTime: {
    color: "#aeaeb2",
  },
  priorityWrapper: {
    backgroundColor: "#faeae7",
    padding: theme.paddingXs,
    borderRadius: theme.paddingXs,
    fontSize: theme.fontSizeXs,
    marginRight: theme.marginS,
  },
});
