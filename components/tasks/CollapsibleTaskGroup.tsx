import { theme } from "@/styles/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CollapsibleTaskGroupProps {
  count?: number;
  children: ReactNode;
  themeColor?: string;
}
const CollapsibleTaskGroup = ({
  count = 0,
  children,
  themeColor = "#faeae7",
}: CollapsibleTaskGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <View style={[styles.container, { backgroundColor: themeColor }]}>
      <Pressable style={styles.header} onPress={toggleExpand}>
        <View style={styles.textWrap}>
          <Ionicons name="warning-outline" size={20} color="red" />
          <Text style={styles.text}>Overdue ({count}) </Text>
        </View>
        <FontAwesome name="caret-down" size={12} color="#d26c57" />
      </Pressable>

      {isExpanded && <View>{children}</View>}
    </View>
  );
};

export default CollapsibleTaskGroup;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "#faeae7",
    paddingHorizontal: theme.paddingL,
    marginBottom: theme.marginM,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
  },
  textWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "#d26c57",
    fontWeight: 600,
    fontSize: theme.fontSizeL,
  },
});
