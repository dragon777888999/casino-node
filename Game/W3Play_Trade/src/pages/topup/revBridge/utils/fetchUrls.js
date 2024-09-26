const baseURL = "https://rb.playblock.io";
const revBaseURL = "https://rb.playblock.io";

export const endpoints = {
  getExchangeRate: `${baseURL}/getexchangerate`,
  getCoinsList: `${baseURL}/getcoinslist`,
  getWalletForUser: `${baseURL}/getWalletForUser`,
};

export const revEndpoints = {
  getMessage: `${revBaseURL}/swapout`,
};
