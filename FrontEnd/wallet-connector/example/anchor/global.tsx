export let accessToken = ""

export function setAccessToken(value: string) {
    accessToken = value;
}

interface SiteInfo {
    agentCode: string;
    chain: string;
    availableCoinTypes:Array<string>;
    digitsMap:{ [key: string]: number };
    tokenAddressMap: { [key: string]: string };
    mark: string;
}

export let siteInfo : SiteInfo={
    agentCode:"",
    chain:"",
    availableCoinTypes : [],
    tokenAddressMap:{},
    mark:"",
    digitsMap:{}
}

export function setSiteInfo(value: SiteInfo) {
    siteInfo = value;
}

interface UserInfo {
    status : number,
    selectedCoinType: string;
    balances: { [key: string]: number },
    userCode:string,
    nickName:string
}

export let userInfo : UserInfo={status:0,selectedCoinType:"",balances : {}, nickName:"",userCode:""}

export function setUserInfo(value: UserInfo) {
    userInfo = value;
}