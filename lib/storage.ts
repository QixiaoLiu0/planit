import AsyncStorage from "@react-native-async-storage/async-storage";


export const STORAGE_KEYS = {
  TASKS: "tasks",
  THEME: "theme",
  PROFILE_NAME: "profileName"
} as const;




export const get = async <T>(key: string): Promise<T | null> => {
  const value = await AsyncStorage.getItem(key);
  if (value === null) return null;
  return JSON.parse(value) as T;
};

export const set = async (key: string, value: unknown): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const remove = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key);
};

