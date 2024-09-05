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
  depositMinLimit: string;
  withdrawConvertRatio: string;
  withdrawConvertMaxLimit: string;
};
