import { useTheme } from "@/context/ThemeContext";
import { theme } from "@/styles/theme";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface PillProps {
  title: string;
  isActive: boolean;
  onPress?: () => void;
}

const Pill = ({ title = "Pill", isActive = false, onPress }: PillProps) => {
  const { activeColors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        styles.container,
        isActive
          ? {
              borderColor: activeColors.primary,
              backgroundColor: activeColors.light,
            }
          : styles.containerInactive,
      ]}
    >
      <Text
        style={[
          styles.title,
          isActive
            ? {
                color: activeColors.primary,
              }
            : styles.titleInactive,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

//
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.paddingM,
    paddingVertical: theme.paddingXs,
    borderWidth: 1.3,
    borderRadius: 50,
  },

  containerInactive: {
    borderColor: "#e5e5ea",
    backgroundColor: "#f5f5f7",
  },
  title: {
    fontWeight: 500,
    fontSize: theme.fontSizeXs,
  },
  titleInactive: {
    color: "#6e6e73",
  },
});

export default Pill;
