// JavaScript equivalent of the TypeScript code

// Declare the global variable for access token
let accessToken = "";

// Function to set the access token
function setAccessToken(value) {
  accessToken = value;
}

// SiteInfo object with initial values
const siteInfo = {
  agentCode: "",
  chain: "",
  availableCoinTypes: [],
  tokenAddressMap: {},
  mark: "",
  digitsMap: {},
};

// Function to set the site information
function setSiteInfo(value) {
  Object.assign(siteInfo, value);
}

// UserInfo object with initial values
let userInfo = {
  status: 0,
  selectedCoinType: "",
  balances: {},
  userCode: "",
  nickName: "",
};

// Function to set the user information
function setUserInfo(value) {
  userInfo = value;
}

// Exporting the variables and functions
export {
  accessToken,
  setAccessToken,
  siteInfo,
  setSiteInfo,
  userInfo,
  setUserInfo,
};
