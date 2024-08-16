export let accessToken = "";

export function setAccessToken(value: string) {
  accessToken = value;
}

interface SiteInfo {
  isLoginMode: boolean;
  agentCode: string;
  chain: string;
  availableCoinTypes: Array<string>;
  digitsMap: { [key: string]: number };
  tokenAddressMap: { [key: string]: string };
  mark: string;
}

export let siteInfo: SiteInfo = {
  isLoginMode: false,
  agentCode: "",
  chain: "",
  availableCoinTypes: [],
  tokenAddressMap: {},
  mark: "",
  digitsMap: {},
};

export function setSiteInfo(value: SiteInfo) {
  siteInfo = value;
}

interface UserInfo {
  status: number;
  selectedCoinType: string;
  balances: { [key: string]: number };
  userCode: string;
  nickName: string;
}

export let userInfo: UserInfo = {
  status: 0,
  selectedCoinType: "",
  balances: {},
  nickName: "",
  userCode: "",
};

export function setUserInfo(value: UserInfo) {
  userInfo = value;
}

interface GameData {
  vendorCode: string;
  gameType: number;
  imageUrl: string;
  gameCode: string;
  gameName: string;
}

export let gameData: GameData = {
  vendorCode: "",
  gameType: 0,
  gameCode: "",
  imageUrl: "",
  gameName: "",
};

export function setGameData(value: GameData) {
  gameData = value;
}

// export const backendUrl = "https://api.roogsino.io";"
export const backendUrl = "https://test.oraicasino.io";
