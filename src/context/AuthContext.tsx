import { ReactNode, useState, createContext, useMemo, useContext } from "react";
import { LoadingPage } from "@/components/LoadingPage";
import { Role } from "@/types/role.type";
import { ROLES } from "@/constants/roles";
import { User } from "@/types/user.type";

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignInProps {
  creds: LoginFormValues;
  redirect: string | undefined;
}

export interface AuthContext {
  isAuthenticated: boolean;
  user: User | null;
  roles: Set<Role> | null;
  clientId: string | null;
  isAuthLoading: boolean;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthLoading] = useState<boolean>(false);
  const tempRoles: Set<Role> = new Set<Role>([]);

  ROLES.forEach((role) => {
    tempRoles.add(role);
  });

  const authValues = useMemo(() => {
    return {
      user: {
        firstName: "Demo",
        lastName: "User",
        email: "scott.charles.dev@gmail.com",
        phoneNumber: "+14036804131",
        uid: "mWQiarISEcAlgbFSiTgsWuAbxTny",
        clientId: "default",
        roles: ["sysAdmin", "clientAdmin", "csr", "user"],
        authStatus: "active",
      } as User,
      roles: tempRoles,
      clientId: "defualt",
      isAuthenticated: true,
      isAuthLoading,
    };
  }, []);

  return isAuthLoading ? (
    <LoadingPage />
  ) : (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
