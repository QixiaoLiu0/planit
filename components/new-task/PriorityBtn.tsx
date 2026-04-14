import { theme } from "@/styles/theme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface PriorityBtnProps {
  title: "Low" | "Medium" | "High";
  activeTitle: string;
  onSelect: (title: string) => void;
}
const PriorityBtn = ({ title, activeTitle, onSelect }: PriorityBtnProps) => {
  return (
    <Pressable
      onPress={() => onSelect(title)}
      style={[
        styles.container,
        activeTitle === title
          ? {
              borderColor: theme.taskPriorityColor[title].borderColor,
              borderWidth: 1,
            }
          : null,
      ]}
    >
      <View
        style={[
          {
            borderColor: theme.taskPriorityColor[title].borderColor,
            backgroundColor: theme.taskPriorityColor[title].bgColor,
          },
          styles.pressableWrapper,
        ]}
      >
        <Text style={[{ color: theme.taskPriorityColor[title].textColor }]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 3,

    borderRadius: 5,
  },
  pressableWrapper: {
    borderWidth: 1,
    borderRadius: 5,
    padding: theme.paddingXs,
    paddingVertical: 8,
    paddingHorizontal: 40,
  },
});
export default PriorityBtn;
