import { ThemeName } from "@/context/ThemeContext";
import { theme } from "@/styles/theme";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface ColorPlateProps {
  colorName: ThemeName;
  onSelect: (colorName: ThemeName) => void;
  selectedColor: ThemeName;
}
const ColorPlate = ({
  colorName,
  onSelect,
  selectedColor,
}: ColorPlateProps) => {
  return (
    <Pressable
      onPress={() => onSelect(colorName)}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        styles.container,
        { borderColor: theme.themeColors[colorName] },
        selectedColor === colorName ? { borderWidth: 2 } : { borderWidth: 0 },
      ]}
    >
      <View
        style={[
          styles.innerBox,
          { backgroundColor: theme.themeColors[colorName] },
        ]}
      ></View>
    </Pressable>
  );
};

export default ColorPlate;

const styles = StyleSheet.create({
  container: {
    padding: theme.paddingXxs,
    borderRadius: 50,
  },
  innerBox: {
    padding: theme.paddingL,
    borderRadius: 50,
  },
});
