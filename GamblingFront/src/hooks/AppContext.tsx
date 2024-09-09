import { backendUrl } from "@/anchor/global";
import React, {
  createContext,
  useContext,
  useState,

  ReactNode,
} from "react";

export enum WalletType {
  Phantom = 1,
  Crossmark,
  Gem,
  Xumm,

  TronLink,
}

interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteInfo {
  isLoginMode: boolean;
  enableSideBar: boolean;
  communityMap: string;
  agentCode: string;
  chain: string;
  availableCoinTypes: Array<string>;
  virtualCoinType: string;
  faqList:Array<FAQItem>,
  digitsMap: { [key: string]: number };
  tokenAddressMap: { [key: string]: string };
  themeMap: { [key: string]: string };
  featureMap: { [key: string]: boolean };
  mark: string;
  copyrightText: string;
  checkBalance: boolean;
  walletModalMessageMap: { [key: string]: string };
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

  siteInfo: SiteInfo;
  setSiteInfo: (siteInfo: SiteInfo) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;

  chatbarOpen: boolean;
  setChatbarOpen: (chatbarOpen: boolean) => void;

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

  affiliaterCode: string;
  setAffiliaterCode: (affiliaterCode: string) => void;
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
    faqList:[],
    virtualCoinType: "",
    digitsMap: {}, // empty object for digits mapping
    tokenAddressMap: {}, // empty object for token addresses
    themeMap: {}, // empty object for token addresses
    mark: "", // empty string for mark
    copyrightText:"",
    walletModalMessageMap: {}, // empty string for wallet modal message
    themeCode: "", // empty string for theme code
    title: "",
    description: "",
    showProvider: true,
    checkBalance: false,
    featureMap: {},
  });
  const [loginStep, setLoginStep] = useState<number>(0);
  const [accessToken, setAccessToken] = useState<string>("");
  const [walletType, setWalletType] = useState<number>(0);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketData, setSocketData] = useState<string>("");
  const [affiliaterCode, setAffiliaterCode] = useState<string>("");
  const [chatbarOpen, setChatbarOpen] = useState<boolean>(false);

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
    setAffiliaterCode,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
