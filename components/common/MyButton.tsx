import { useTheme } from "@/context/ThemeContext";
import { theme } from "@/styles/theme";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface MyButtonProp {
  title: string;
  onClick: () => void;
}

const MyButton = ({ title = "Button", onClick }: MyButtonProp) => {
  const { activeColors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: activeColors.primary }]}>
      <Pressable
        onPress={onClick}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      >
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.paddingS,
    paddingHorizontal: theme.paddingS,
    borderRadius: theme.fontSizeXs / 2,
  },
  title: {
    color: theme.fontColor.bodyTextLight,
    fontSize: theme.fontSizeS,
    fontWeight: 600,
  },
});
