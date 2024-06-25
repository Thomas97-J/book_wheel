import React, { createContext, ReactNode, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../firebase";

interface AuthContextType {
  currentUser: User | null | undefined;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchUser(): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: currentUser,
    error,
    isLoading,
  } = useQuery({ queryKey: ["auth"], queryFn: fetchUser });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await signOut(auth);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  async function logout() {
    await mutation.mutateAsync();
  }

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, logout }}>
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
