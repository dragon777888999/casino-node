import { createAsyncThunk } from "@reduxjs/toolkit";

const getSiteInfoData = createAsyncThunk("getSiteInfo", async (data: any) => {
  const payload = data;
  return payload;
});

export { getSiteInfoData };
