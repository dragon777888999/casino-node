import { useContext, useEffect, useMemo, useState } from "react";

export const MainPage = () => {
  // const wallet = useWallet();
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
  //     try {
  //       const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Access-Token": accessToken,
  //         },
  //         body: JSON.stringify({
  //           method: "GetLaunchUrl",
  //           vendorCode,
  //           gameCode,
  //           userCode: wallet.publicKey,
  //           currencyCode: userInfo.selectedCoinType,
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const result = await response.json();
  //       if (result.status == 0) {
  //         setGameUrl(result.launchUrl);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };
  return (
    <div>
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
              <img src={`/enTheme2/images/${gameCode}.png`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
