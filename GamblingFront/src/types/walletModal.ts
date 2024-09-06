export type BalanceModalInfo = {
  balance: Number;
  depositAddress: string;
  withdrawalMaxLimit: Number;
  depositMinLimit: Number;
};

export type VirtualBalanceModalInfo = {
  balance: Number;
  depositConvertRatio: string;
  withdrawalMaxLimit: string;
  depositConvertMinLimit: string;
  withdrawConvertRatio: string;
  withdrawConvertMaxLimit: string;
};
