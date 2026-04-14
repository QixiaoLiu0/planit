import { theme } from "@/styles/theme";
import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface FormFieldProp {
  title: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const FormField = ({ title, children, style }: FormFieldProp) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.childrenWrapper}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 5, marginBottom: theme.marginL },
  title: {
    color: "#929294",
    fontWeight: 500,
    fontSize: theme.fontSizeM,
    letterSpacing: theme.fontSizeM * 0.05,
  },
  childrenWrapper: {
    // borderWidth: 1,
  },
});

export default FormField;
