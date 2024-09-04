// Define the main type
export interface WagerInfo {
  type: string;
  currencyCode: string;
  betAmount: number;
  payoutAmount: number;
  userCode: string;
  vendorName: string; // This will be a JSON string that needs to be parsed
  gameName: string; // This will be a JSON string that needs to be parsed
  vendorCode: string,
  gameCode: string,
  time: number;
}
