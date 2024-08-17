import React, { createContext, useContext, useState, ReactNode } from "react";

interface SiteInfo {
  isLoginMode: boolean;
  agentCode: string;
  chain: string;
  availableCoinTypes: Array<string>;
  digitsMap: { [key: string]: number };
  tokenAddressMap: { [key: string]: string };
  mark: string;
}
interface UserInfo {
  status: number;
  selectedCoinType: string;
  balances: { [key: string]: number };
  userCode: string;
  nickName: string;
}

// Define the shape of your context's data
interface AppState {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
  siteInfo: SiteInfo | null;
  setSiteInfo: (siteInfo: SiteInfo | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

// Create the context with a default value
export const AppContext = createContext<AppState | undefined>(undefined);

// Create a custom hook to use the AppContext
// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === undefined) {
//     throw new Error("useAppContext must be used within an AppProvider");
//   }
//   return context;
// };

// Create the provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>({
    status: 0,
    selectedCoinType: "",
    balances: {},
    userCode: "",
    nickName: "",
  });
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");
  const value = {
    userInfo,
    setUserInfo,
    siteInfo,
    setSiteInfo,
    loading,
    setLoading,
    accessToken,
    setAccessToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
