import { theme } from "@/styles/theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface OverdueTaskItemProp {
  title: string;
  hasRightIcon?: boolean;
  onRadioPress: () => void;
  onTaskPress: () => void;
}

const OverdueTaskItem = ({
  title,
  hasRightIcon,
  onRadioPress,
  onTaskPress,
}: OverdueTaskItemProp) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onRadioPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      >
        <View style={styles.radio}></View>
      </Pressable>
      <Pressable
        onPress={onTaskPress}
        style={({ pressed }) => [
          styles.taskMainArea,
          { opacity: pressed ? 0.5 : 1 },
        ]}
      >
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        {hasRightIcon && (
          <EvilIcons name="chevron-right" size={18} color="#aeaeb2" />
        )}
      </Pressable>
    </View>
  );
};

export default OverdueTaskItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#f4d7d2",
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "#e1e1e1",
  },
  title: {
    fontSize: theme.fontSizeL,
    color: theme.fontColor.bodyTextDark,
    // flex: 1,
  },
  taskMainArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
