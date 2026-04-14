import { theme } from "@/styles/theme";
import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

interface SwitchCardProps {
  leftIcon: React.ReactNode;
  title: string;
  isActive: boolean;
  onToggle: (newValue: boolean) => void;
}
const SwitchCard = ({
  leftIcon,
  title,
  isActive,
  onToggle,
}: SwitchCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>{leftIcon}</View>
      <Text style={styles.title}>{title}</Text>
      <Switch
        style={styles.switch}
        value={isActive}
        onValueChange={() => onToggle(!isActive)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.paddingS,
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    marginRight: theme.marginS,
  },
  title: {
    flex: 1,
    fontSize: theme.fontSizeXl,
    color: theme.fontColor.bodyTextDark,
    letterSpacing: theme.fontSizeXl * 0.05,
  },
  switch: {
    marginLeft: theme.marginS,
  },
});
export default SwitchCard;
