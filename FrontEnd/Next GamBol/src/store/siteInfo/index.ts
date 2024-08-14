import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSiteInfoData } from "./actions";
import type { siteInfoState } from "./types";

const PREFIX = "siteInfo";

const initialState: any = {
  agentCode: "",
  chain: "",
  availableCoinTypes: [],
  tokenAddressMap: {},
  mark: "",
  digitsMap: {},
};

const setSiteInfoData = (state: any, data: any) => {
  state.siteInfo = data;
};

export const siteInfoReducer = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(
      getSiteInfoData.fulfilled.type,
      (state: any, action: PayloadAction<any>) => {
        setSiteInfoData(state, action.payload);
      },
    );
  },
});

export const { getSiteInfoData };

export default siteInfoReducer.reducer;
