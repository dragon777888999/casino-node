import { backendUrl } from "@/anchor/global";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface SiteInfo {
  isLoginMode: boolean;
  enableSideBar: boolean;
  communityMap: string;
  agentCode: string;
  chain: string;
  availableCoinTypes: Array<string>;
  digitsMap: { [key: string]: number };
  tokenAddressMap: { [key: string]: string };
  themeMap: { [key: string]: string };
  mark: string;
  walletModalMessage: string;
  themeCode: string;
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
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  siteInfo: SiteInfo;
  setSiteInfo: (siteInfo: SiteInfo) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  loginStep: Number;
  setLoginStep: (loginStep: Number) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  walletAddress: string;
  setWalletAddress: (walletAddress: string) => void;
  socket: WebSocket | null;
  setSocket: (socket: WebSocket | null) => void;
  socketData: string;
  setSocketData: (data: string) => void;
}

// Create the context with a default value
export const AppContext = createContext<AppState | undefined>(undefined);

// Create a custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Create the provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    status: 0,
    selectedCoinType: "",
    balances: {},
    userCode: "",
    nickName: "",
  });
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    isLoginMode: false, // default to false (not in login mode)
    enableSideBar: false,
    communityMap: "",
    agentCode: "", // empty string for agent code
    chain: "", // empty string for blockchain type
    availableCoinTypes: [], // empty array for available coin types
    digitsMap: {}, // empty object for digits mapping
    tokenAddressMap: {}, // empty object for token addresses
    themeMap: {}, // empty object for token addresses
    mark: "", // empty string for mark
    walletModalMessage: "", // empty string for wallet modal message
    themeCode: "", // empty string for theme code
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [loginStep, setLoginStep] = useState<Number>(0);
  const [accessToken, setAccessToken] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketData, setSocketData] = useState<string>("");
  const value = {
    userInfo,
    setUserInfo,
    siteInfo,
    setSiteInfo,
    loading,
    setLoading,
    loginStep,
    setLoginStep,
    accessToken,
    setAccessToken,
    walletAddress,
    setWalletAddress,
    socket,
    setSocket,
    socketData,
    setSocketData,
  };

  useEffect(() => {
    // Create a new URL object from the string
    let parsedUrl = new URL(backendUrl);

    // Determine the WebSocket protocol (ws or wss)
    let wsProtocol = parsedUrl.protocol === "https:" ? "wss:" : "ws:";

    // Construct the WebSocket URL
    let wsUrl = `${wsProtocol}//${parsedUrl.host}/websocket`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      console.log("Received:", event.data);
      setSocketData(event.data); // Update the state with received data
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
