export type BalanceModalInfo = {
  balance: Number;
  depositAddress: string;
  modalMessage: string;
  withdrawalMaxLimit: Number;
  depositMinLimit: Number;
};

export type VirtualBalanceModalInfo = {
  balance: Number;
  modalMessage: string;
  depositConvertRatio: string;
  withdrawalMaxLimit: string;
  depositConvertMinLimit: string;
  withdrawConvertRatio: string;
  withdrawConvertMaxLimit: string;
};
