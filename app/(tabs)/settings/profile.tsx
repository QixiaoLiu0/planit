import FormField from "@/components/common/FormField";
import MyButton from "@/components/common/MyButton";
import SafeHeader from "@/components/common/SafeHeader";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { theme } from "@/styles/theme";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Profile = () => {
  const { activeColors } = useTheme();
  const { profileName, updateProfileName } = useUser();

  const [inputText, setInputText] = useState(profileName);

  const getInitials = (name: string) => {
    const arr = name.trim().split(/\s+/);
    if (!arr[0]) return "";
    const first = arr[0][0].toUpperCase();
    const last = arr.length > 1 ? arr[arr.length - 1][0].toUpperCase() : "";
    return `${first}${last}`;
  };

  const handleSaveName = async () => {
    const cleanName = inputText.trim();
    await updateProfileName(cleanName);
    router.back();
  };

  return (
    <View style={styles.container}>
      <SafeHeader
        style={styles.header}
        title="Profile"
        rightContent={<MyButton title="Save" onClick={handleSaveName} />}
      />

      {inputText.trim() !== "" && (
        <View style={styles.profileCircleWrapper}>
          <View
            style={[
              styles.profileCircle,
              { backgroundColor: activeColors.primary },
            ]}
          >
            <Text style={styles.text}>{getInitials(inputText)}</Text>
          </View>
        </View>
      )}

      <FormField title="FULL NAME">
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          style={[styles.profileNameInput, styles.nameInput]}
          autoFocus={true}
        />
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
  header: {
    marginBottom: theme.marginL,
  },
  profileCircleWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileCircle: {
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    // padding: theme.paddingXl,
    // backgroundColor: theme.themeColors.teal,
    marginRight: theme.marginM,
  },
  text: {
    color: theme.fontColor.bodyTextLight,
    fontSize: theme.fontSizeXxl,
    fontWeight: 700,
  },
  nameInput: {
    padding: theme.paddingM,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#e5e5ea",
    backgroundColor: "#f5f5f7",
  },
  profileNameInput: {
    fontSize: theme.fontSizeXl,
    fontWeight: 600,
  },
});
export default Profile;
