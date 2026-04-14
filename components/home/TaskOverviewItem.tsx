import { theme } from "@/styles/theme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TaskOverviewItemProp {
  title: string;
  duedate: string;
  oneWeekFromNow?: boolean;
  onPress: () => void;
}

const TaskOverviewItem = ({
  title = "Calculus Assignment #4",
  duedate = "Mar 20",
  oneWeekFromNow = true,
  onPress,
}: TaskOverviewItemProp) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      >
        <View style={styles.radio}></View>
      </Pressable>

      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
        {title}
      </Text>
      <Text style={[oneWeekFromNow ? styles.highLight : null, styles.dueDate]}>
        {duedate}
      </Text>
    </View>
  );
};

export default TaskOverviewItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.paddingS,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "#e1e1e1",
    marginRight: 10,
  },
  highLight: {
    color: "#ff2f2f",
    fontWeight: 500,
  },
  title: {
    fontSize: theme.fontSizeXl,
    flex: 1,
    color: theme.fontColor.bodyTextDark,
    letterSpacing: theme.fontSizeXl * 0.05,
  },
  dueDate: {
    fontSize: theme.fontSizeXs,
    marginLeft: 5,
  },
});
