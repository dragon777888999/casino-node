import state from "../state";
import req from "../utils/request";

const getHighRollers = async (wallet) => {
  return req({
    url: state.high_rollers_url,
    method: "POST",
    body: {
      ...(wallet && { wallet }),
    },
  });
};
const getHighRollersHistory = async () => {
  return req({
    url: state.high_rollers_history_url,
  });
};
const getWinRatio = async (wallet, mode) => {
  const url = `${state.win_ratio_url}${mode === "demo" ? "_demo" : ""}`;

  return req({
    url: url,
    method: "POST",
    body: {
      ...(wallet && { wallet }),
    },
  });
};
const getWinRatioHistory = async () => {
  return req({
    url: state.win_ratio_history_url,
  });
};

export default {
  getHighRollers,
  getHighRollersHistory,
  getWinRatio,
  getWinRatioHistory,
};
