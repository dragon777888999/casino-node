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

export const backendUrl = "https://api.roogsino.io";
export const solanaNetworkUrl = "https://api.devnet.solana.com";

export async function updateSiteInfo(){
  try {
    if (siteInfo.chain!="")
      return;
    const domain = window.location.host;
    const response = await fetch(
      `${backendUrl}/Account/SiteInfo?domain=${domain}`,
    );
    const result = await response.json();
    console.log("--------------site info------------");
    console.log(result);
    setSiteInfo(result);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
