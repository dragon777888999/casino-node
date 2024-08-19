interface GameName {
  en: string;
  ko: string;
}

interface VendorName {
  en: string;
}

// Define the main type
interface InfoList {
  type: string;
  currencyCode: string;
  betAmount: number;
  payoutAmount: number;
  userCode: string;
  vendorName: string; // This will be a JSON string that needs to be parsed
  gameName: string; // This will be a JSON string that needs to be parsed
}
