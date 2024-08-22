interface LangName {
  en: string;
  ko: string;
}

// Define the main type
export interface InfoList {
  type: string;
  currencyCode: string;
  betAmount: number;
  payoutAmount: number;
  userCode: string;
  vendorName: LangName; // This will be a JSON string that needs to be parsed
  gameName: LangName; // This will be a JSON string that needs to be parsed
}
