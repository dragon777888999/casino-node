import type { RootState } from "../store";

// Other code such as selectors can use the imported `RootState` type
export const agentCode = (state: RootState) => state.siteInfo.agentCode;
export const alertSeverity = (state: RootState) => state.alert.severity;

export const selectAllArticle = (state: RootState) => state.getSiteInfo;
