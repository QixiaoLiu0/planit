import { get, set, STORAGE_KEYS } from "@/lib/storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  profileName: string;
  updateProfileName: (newName: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const loadUserData = async () => {
      const savedName = await get<string>(STORAGE_KEYS.PROFILE_NAME);
      if (savedName) {
        setProfileName(savedName);
      }
    };
    loadUserData();
  }, []);

  const updateProfileName = async (newName: string) => {
    setProfileName(newName);
    try {
      await set(STORAGE_KEYS.PROFILE_NAME, newName);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider value={{ profileName, updateProfileName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
