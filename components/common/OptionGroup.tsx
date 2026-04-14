import Pill from "@/components/common/Pill";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface Option {
  value: string;
}

interface OptionGroupProps {
  onSelect: (value: string) => void;
  options: Option[];
  selectedValue: string;
  style?: StyleProp<ViewStyle>;
}

const OptionGroup = ({
  onSelect,
  options,
  selectedValue,
  style,
}: OptionGroupProps) => {
  return (
    <View style={[styles.container, style]}>
      {options.map(option => {
        return (
          <Pill
            key={option.value}
            title={option.value}
            isActive={selectedValue === option.value}
            onPress={() => onSelect(option.value)}
          ></Pill>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 10, flexWrap: "wrap" },
});

export default OptionGroup;
