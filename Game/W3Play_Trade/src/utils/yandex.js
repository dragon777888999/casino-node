import state from "../state";

export default (action) => {
  // evt that is sent to ga4 => if exists in the list will be sent as yandex evt with diff name
  let evtsList = [
    { ydxEvt: "playnow", ga4Evt: "1_play_now" },
    { ydxEvt: "walletcon", ga4Evt: "2_wallet_connection" },
    { ydxEvt: "trade", ga4Evt: "3_trade" },
    { ydxEvt: "walletdis", ga4Evt: "wallet_disconnection" },
    { ydxEvt: "soundsoff", ga4Evt: "sounds_off" },
    { ydxEvt: "autologin", ga4Evt: "auto_login_wallet_connection" },
    { ydxEvt: "connect_wallet_click", ga4Evt: "connect_wallet_click" },
  ];

  let matchedYdxEvt = evtsList.find(
    (itm) => itm.ga4Evt === action?.toLowerCase()
  );

  if (matchedYdxEvt) {
    // evts will be sent only on prod
    if (
      state.active_network === "mainnet" &&
      window.location.hostname !== "localhost"
    ) {
      if (typeof ym !== "undefined") {
        ym(92075750, "reachGoal", matchedYdxEvt.ydxEvt);
      } else {
        console.warn("Yandex Metrica is not defined");
      }
    }
  }
};
