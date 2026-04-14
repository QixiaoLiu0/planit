import { useTheme } from "@/context/ThemeContext";
import { theme } from "@/styles/theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ProfileCardProps {
  name: string;
}
const ProfileCard = ({ name }: ProfileCardProps) => {
  const { activeColors } = useTheme();
  const nameSplitArr = name.split(" ");

  const getInitials = (str: string) => {
    const arr = str.trim().split(/\s+/);
    if (!arr[0]) return ".";
    const first = arr[0][0].toUpperCase();
    const last = arr.length > 1 ? arr[arr.length - 1][0].toUpperCase() : "";
    return `${first}${last}`;
  };
  return (
    <Pressable
      onPress={() => router.push({ pathname: "/settings/profile" })}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        styles.container,
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: activeColors.primary }]}>
        <Text style={styles.avatarName}>{getInitials(name)}</Text>
      </View>
      <Text style={styles.nameText}>{name}</Text>
      <EvilIcons
        style={styles.chevron}
        name="chevron-right"
        size={18}
        color="#aeaeb2"
      />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: theme.paddingS,
    borderBottomColor: "#e5e5ea",
  },
  avatar: {
    borderRadius: 50,
    // padding: theme.paddingL,
    // backgroundColor: theme.themeColors.teal,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    marginRight: theme.marginM,
  },
  avatarName: {
    color: "#fff",
    fontSize: theme.fontSizeXl,
    fontWeight: 700,
  },
  nameText: {
    color: theme.fontColor.bodyTextDark,
    fontWeight: 600,
    fontSize: theme.fontSizeXl,
    flex: 1,
  },
  chevron: {
    marginLeft: theme.marginM,
  },
});
export default ProfileCard;
