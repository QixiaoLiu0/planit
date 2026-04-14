import { theme } from "@/styles/theme";
import React from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

interface Label {
  value: string;
  count: number;
}

interface HistoryToggleProps {
  activeLabel: string;
  labels: Label[];
  onSelect: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}
const HistoryToggle = ({
  activeLabel,
  labels,
  onSelect,
  style,
}: HistoryToggleProps) => {
  return (
    <View style={[styles.container, style]}>
      {labels.map(label => {
        const isActive = activeLabel === label.value;
        return (
          <Pressable
            onPress={() => onSelect(label.value)}
            key={label.value}
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1 },
              styles.textWrapper,
              isActive ? styles.textWapperActive : styles.textWapperInactive,
            ]}
          >
            <Text
              style={[
                styles.text,
                isActive ? styles.textActive : styles.textInactive,
              ]}
            >
              {label.value} ({label.count})
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: theme.paddingXs,
    backgroundColor: "#f5f5f7",
    borderRadius: theme.fontSizeL * 0.8,
  },
  textWrapper: {
    paddingVertical: theme.paddingS,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.fontSizeL * 0.8,
  },
  textWapperActive: {
    backgroundColor: "#fff",
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
    }),
  },
  textWapperInactive: { backgroundColor: "#f5f5f7" },
  text: {
    fontSize: theme.fontSizeL,
    letterSpacing: theme.fontSizeL * 0.03,
  },
  textActive: {
    fontWeight: 600,
    color: theme.themeColors.terracotta,
  },
  textInactive: {
    fontWeight: 400,
    color: "#aeaeb2",
  },
});
export default HistoryToggle;
