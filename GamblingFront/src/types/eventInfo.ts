// Define the main type
export interface EventInfo {
    userCode: string;
    nickName: string;
    vendorCode: string;
    gameCode: string;
    betAmount: number; 
    payoutAmount: number;
    gameName: string;
    vendorName : string;
    count : number;
    bonus : {
      bonusType : number,
      currencyCode : String,
      value : number
    };
  }
  