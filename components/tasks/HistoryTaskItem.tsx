import { theme } from "@/styles/theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HistoryTaskItemProps {
  title: string;
  completedDate: string;
  onTaskPress: () => void;
}

const HistoryTaskItem = ({
  title,
  completedDate,
  onTaskPress,
}: HistoryTaskItemProps) => {
  return (
    <Pressable
      onPress={onTaskPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        styles.container,
      ]}
    >
      <MaterialIcons
        style={styles.doneIcon}
        name="done"
        size={24}
        color="#55a88e"
      />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.completed}>Completed {completedDate}</Text>
      </View>
      <EvilIcons
        style={styles.chevronIcon}
        name="chevron-right"
        size={18}
        color="#aeaeb2"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: theme.paddingM,
  },
  doneIcon: { marginRight: theme.marginS },
  textWrapper: { flex: 1 },
  title: {
    textDecorationLine: "line-through",
    color: "#aeaeb2",
    fontSize: theme.fontSizeL,
    letterSpacing: theme.fontSizeL * 0.1,
  },
  completed: {
    color: "#aeaeb2",
    fontSize: theme.fontSizeXs,
  },
  chevronIcon: {
    marginLeft: theme.marginS,
  },
});

export default HistoryTaskItem;
