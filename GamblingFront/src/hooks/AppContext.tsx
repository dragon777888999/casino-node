import { backendUrl } from "@/anchor/global";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";

export enum WalletType {
  Phantom = 1,
  Crossmark,
  Gem,
  Xumm,

  TronLink,
}

export interface SiteInfo {
  isLoginMode: boolean;
  enableSideBar: boolean;
  communityMap: string;
  agentCode: string;
  chain: string;
  availableCoinTypes: Array<string>;
  virtualCoinType: string;
  digitsMap: { [key: string]: number };
  tokenAddressMap: { [key: string]: string };
  themeMap: { [key: string]: string };
  featureMap: { [key: string]: boolean };
  mark: string;
  checkBalance: boolean;
  walletModalMessage: string;
  themeCode: string;
  title: string;
  description: string;
  showProvider: boolean;
}
export interface UserInfo {
  status: number;
  selectedCoinType: string;
  balances: { [key: string]: number };
  userCode: string;
  nickName: string;
}

// Define the shape of your context's data
interface AppState {
  loginStep: number;
  setLoginStep: (loginStep: number) => void;

  siteInfoList: { [key: string]: SiteInfo };
  setSiteInfoList: (siteInfoList: { [key: string]: SiteInfo }) => void;

  chatbarOpen: boolean;
  setChatbarOpen: (chatbarOpen: boolean) => void;

  siteInfo: SiteInfo;
  setSiteInfo: (siteInfo: SiteInfo) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;

  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  walletAddress: string;
  setWalletAddress: (walletAddress: string) => void;
  walletType: number;
  setWalletType: (walletType: number) => void;

  socket: WebSocket | null;
  setSocket: (socket: WebSocket | null) => void;
  socketData: string;
  setSocketData: (data: string) => void;

  affiliaterCode : string;
  setAffiliaterCode : (affiliaterCode : string) => void;
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
  const [siteInfoList, setSiteInfoList] = useState<{ [key: string]: SiteInfo }>(
    {},
  );
  const [siteInfo, setSiteInfo] = useState<SiteInfo>({
    isLoginMode: false, // default to false (not in login mode)
    enableSideBar: false,
    communityMap: "",
    agentCode: "", // empty string for agent code
    chain: "", // empty string for blockchain type
    availableCoinTypes: [], // empty array for available coin types
    virtualCoinType: "",
    digitsMap: {}, // empty object for digits mapping
    tokenAddressMap: {}, // empty object for token addresses
    themeMap: {}, // empty object for token addresses
    mark: "", // empty string for mark
    walletModalMessage: "", // empty string for wallet modal message
    themeCode: "", // empty string for theme code
    title: "",
    description: "",
    showProvider: true,
    checkBalance: false,
    featureMap: {},
  });
  const [loginStep, setLoginStep] = useState<number>(0);
  const [chatbarOpen, setChatbarOpen] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [walletType, setWalletType] = useState<number>(0);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketData, setSocketData] = useState<string>("");
  const [affiliaterCode, setAffiliaterCode] = useState<string>("");

  const value = {
    userInfo,
    setUserInfo,
    siteInfoList,
    setSiteInfoList,
    siteInfo,
    setSiteInfo,
    loginStep,
    setLoginStep,
    chatbarOpen,
    setChatbarOpen,
    accessToken,
    setAccessToken,
    walletAddress,
    setWalletAddress,
    walletType,
    setWalletType,
    socket,
    setSocket,
    socketData,
    setSocketData,
    
    affiliaterCode,
    setAffiliaterCode
  };

  const reconnectInterval = useRef(1000); // Initial reconnect interval (1 second)
  const maxReconnectInterval = useRef(30000); // Maximum reconnect interval (30 seconds)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const connectWebSocket = () => {
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
      //console.log("Received:", event.data);
      setSocketData(event.data); // Update the state with received data
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      handleReconnect();
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      ws.close();
    };

    setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "ping" }));
      }
    }, 60000); // Send a ping every 60 seconds

    setSocket(ws);
  };
  const handleReconnect = () => {
    // Clear any existing timeouts
    if (timeout.current !== null) {
      clearTimeout(timeout.current);
    }

    // Attempt to reconnect after a delay
    timeout.current = setTimeout(() => {
      console.log(
        `Attempting to reconnect in ${reconnectInterval.current / 1000} seconds...`,
      );
      connectWebSocket();

      // Increase the reconnect interval, but don't exceed the maximum
      reconnectInterval.current = Math.min(
        reconnectInterval.current * 2,
        maxReconnectInterval.current,
      );
    }, reconnectInterval.current);
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
