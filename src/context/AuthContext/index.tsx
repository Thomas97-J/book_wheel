import React, { createContext, ReactNode, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase";

interface AuthContextType {
  currentUser: User | null | undefined;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: currentUser,
    error,
    isLoading,
  } = useQuery({ queryKey: ["user"], queryFn: fetchUser });

  return (
    <AuthContext.Provider value={{ currentUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
