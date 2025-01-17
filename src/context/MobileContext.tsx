import { ReactNode, useState, createContext, useMemo, useContext } from "react";
import { isMobile } from "react-device-detect";

export interface TMobileContext {
  mobile: boolean;
  toggleMobile: () => void;
}

export const MobileContext = createContext<TMobileContext | undefined>(
  undefined,
);

export function MobileProvider({ children }: { children: ReactNode }) {
  const [mobile, setMobile] = useState<boolean>(isMobile);

  const toggleMobile = () => {
    setMobile((prev) => {
      console.log("toggile to: ", !prev);
      return !prev;
    });
  };

  const mobileValues = useMemo(
    () => ({
      mobile,
      toggleMobile,
    }),
    [mobile],
  );

  return (
    <MobileContext.Provider value={mobileValues}>
      {children}
    </MobileContext.Provider>
  );
}

export function useMobileContext() {
  const context = useContext(MobileContext);

  if (!context) {
    throw new Error("useMobileContext must be used within a MobileProvider");
  }
  return context;
}
