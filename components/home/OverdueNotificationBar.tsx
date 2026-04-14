import { theme } from "@/styles/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface OverdueNotificationBarProp {
  count: number;
  style?: StyleProp<ViewStyle>;
}
const OverdueNotificationBar = ({
  count,
  style,
}: OverdueNotificationBarProp) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name="notifications" size={24} color="#ff8367" />
      <Text style={styles.text}>Overdue ({count})</Text>
    </View>
  );
};

export default OverdueNotificationBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#faeae7",
    paddingHorizontal: theme.paddingS,
    paddingVertical: 5,
    gap: 15,
  },
  text: {
    color: "#d26c57",
    fontWeight: 600,
    fontSize: theme.fontSizeL,
  },
});
