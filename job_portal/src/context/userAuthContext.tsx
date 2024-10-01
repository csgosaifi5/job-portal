import Applicant from "@/lib/models/applicants";
import Employer from "@/lib/models/employer";
import React, { PropsWithChildren, createContext, useContext, useState } from "react";
import UserService from "@/services/UserService";

const userService = new UserService();

interface UserContextType {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  user: any | null;
  setUser: (value: Applicant | Employer | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserAuth must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  const value: UserContextType = {
    isLoading,
    setIsLoading,
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
