import state from "../state";
import req from "../utils/request";

const getLeaderboard = async (partnerRef, from, to, isDemoModeActive) => {
  return req(
    {
      url: state.leaderboard_url,
      params: {
        ref: partnerRef,
        ...(from && { from }),
        ...(to && { to }),
        mode: isDemoModeActive ? "demo" : "real",
      },
    },
    true
  );
};

const getLeaderboardWinsPaid = async (
  partnerRef,
  from,
  to,
  isDemoModeActive
) => {
  return req(
    {
      url: state.leaderboard_url,
      params: {
        ref: partnerRef,
        ...(from && { from }),
        ...(to && { to }),
        mode: isDemoModeActive ? "demo" : "real",
        criteria: "winsPaid",
      },
    },
    true
  );
};

export default { getLeaderboard, getLeaderboardWinsPaid };
