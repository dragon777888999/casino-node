import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { backendUrl } from "../../anchor/setup";
import { accessToken, setAccessToken, userInfo } from "../../anchor/global";

export const MainPage = () => {
  const wallet = useWallet();
  const [gameUrl, setGameUrl] = useState("");

  const listGames = [
    "aviator",
    "mines",
    "goal",
    "dice",
    "plinko",
    "keno",
    "hilo",
    "hotline",
    "mini-roulette",
  ];
  const onClickGame = async (vendorCode: string, gameCode: string) => {
    try {
      const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": accessToken,
        },
        body: JSON.stringify({
          method: "GetLaunchUrl",
          vendorCode,
          gameCode,
          userCode: wallet.publicKey,
          currencyCode: userInfo.selectedCoinType,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.status == 0) {
        setGameUrl(result.launchUrl);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      {gameUrl != "" ? (
        <section>
          <div className="center-wrapper">
            <button
              className="back-btn"
              onClick={() => {
                setGameUrl("");
              }}
            >
              Back
            </button>
          </div>
          <div className="iframe-container">
            <iframe src={gameUrl} allowFullScreen frameBorder="0"></iframe>
          </div>
        </section>
      ) : (
        <>
          <section className="banner"></section>
          <section className="games">
            <div className="bannerDown">
              <div className="bannerDownLeftLine"></div>
              <p className="bannerDownText">PLAY BIG WIN BIG</p>
              <div className="bannerDownRightLine"></div>
            </div>
            <div className="game-grid">
              {listGames.map((gameCode, index) => (
                <div key={gameCode} className="game">
                  <img
                    src={`/gamTheme/images/${gameCode}.png`}
                    onClick={() => onClickGame("Spribe_Mini", gameCode)}
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
