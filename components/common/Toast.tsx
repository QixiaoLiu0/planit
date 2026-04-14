import { theme } from "@/styles/theme";
import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

interface ToastProps {
  visible: boolean;
  message: string;
}

const Toast = ({ visible, message }: ToastProps) => {
  return (
    <Modal
      style={styles.container}
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.toastBox}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {},
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    // backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  toastBox: {
    backgroundColor: "rgba(36, 36, 36, 0.8)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  message: {
    color: "#FFFFFF",
    fontSize: theme.fontSizeM,
    fontWeight: "600",
    padding: theme.paddingM,
  },
});
