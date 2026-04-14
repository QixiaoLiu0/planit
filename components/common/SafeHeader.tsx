import { theme } from "@/styles/theme";
import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeHeaderProps {
  leftContent?: React.ReactNode;
  title: string;
  rightContent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SafeHeader = ({
  leftContent,
  title,
  rightContent,
  style,
}: SafeHeaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[{ marginTop: insets.top }, styles.container, style]}>
      <View
        style={[
          styles.leftSideWrapper,
          leftContent ? styles.leftItemsGap : null,
        ]}
      >
        <View>{leftContent}</View>
        <Text style={[leftContent ? styles.thin : styles.bold, styles.title]}>
          {title}
        </Text>
      </View>

      <Text>{rightContent}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSideWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftItemsGap: { gap: 10 },
  bold: { fontWeight: 600 },
  thin: { fontWeight: 400 },
  title: {
    fontSize: theme.fontSizeXxl,
  },
});

export default SafeHeader;
