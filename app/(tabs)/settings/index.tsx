import FormField from "@/components/common/FormField";
import SafeHeader from "@/components/common/SafeHeader";
import ColorPlate from "@/components/settings/ColorPlate";
import ProfileCard from "@/components/settings/ProfileCard";
import SwitchCard from "@/components/settings/SwitchCard";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { THEME_COLOR } from "@/lib/constant";
import { theme } from "@/styles/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Index = () => {
  const [isReminderOn, setIsReminderOn] = useState(false);
  const { themeName, changeTheme, activeColors } = useTheme();
  const { profileName } = useUser();

  const handleProfile = () => {
    router.push({ pathname: "/settings/profile" });
  };
  return (
    <View style={styles.container}>
      <SafeHeader style={styles.header} title="Settings" />
      {profileName !== "" ? (
        <ProfileCard name={profileName} />
      ) : (
        <Pressable
          onPress={handleProfile}
          style={({ pressed }) => [
            styles.editNameWrapper,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <View style={styles.editNameContent}>
            <Ionicons name="create-outline" size={18} color="#8e8e93" />
            <Text style={styles.editNameText}>Edit your name here</Text>
          </View>
        </Pressable>
      )}

      {/* Notification */}
      <FormField style={styles.notifiWrapper} title={"NOTIFICATION"}>
        <SwitchCard
          key={1}
          onToggle={setIsReminderOn}
          isActive={isReminderOn}
          title={"Task Reminers"}
          leftIcon={
            <Ionicons
              name="notifications"
              size={24}
              color={activeColors.primary}
            />
          }
        />
      </FormField>

      {/* THEME COLOR */}
      <FormField title={"THEME COLOR"}>
        <View style={styles.colorPlateWrapper}>
          {THEME_COLOR.map(color => {
            return (
              <ColorPlate
                key={color}
                colorName={color}
                selectedColor={themeName}
                onSelect={changeTheme}
              />
            );
          })}
        </View>
      </FormField>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.paddingL,
    backgroundColor: "#fff",
    height: "100%",
  },
  editNameWrapper: {
    backgroundColor: "#f5f5f7",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  editNameContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  editNameText: {
    fontSize: 16,
    color: "#8e8e93",
    fontWeight: "500",
    marginLeft: 8,
  },
  header: {
    marginBottom: theme.marginL,
  },
  notifiWrapper: {
    marginTop: theme.marginM,
  },
  colorPlateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
export default Index;