export type BalanceModalInfo = {
  balance: number;
  depositAddress: string;
  withdrawalMaxLimit: number;
  depositMinLimit: number;
};

export type VirtualBalanceModalInfo = {
  virtualBalance: number;
  balances: { [key: string]: number };
  depositConvertRatio: { [key: string]: number };
  depositMinLimit: number;
  withdrawConvertRatio: { [key: string]: number };
  withdrawMaxLimit: number;
};
