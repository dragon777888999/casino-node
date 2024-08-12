import React, { Component } from "react";
// import { backendUrl } from "../anchor/setup";
// import { accessToken, userInfo } from "../anchor/global";

class Casino extends Component {
  state = {
    gameUrl: "",
  };

  listGames = [
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

  // onClickGame = async (vendorCode, gameCode) => {
  //   try {
  //     const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-Access-Token": accessToken,
  //       },
  //       body: JSON.stringify({
  //         method: "GetLaunchUrl",
  //         vendorCode,
  //         gameCode,
  //         userCode: userInfo.userCode,
  //         currencyCode: userInfo.selectedCoinType,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const result = await response.json();
  //     if (result.status === 0) {
  //       this.setState({ gameUrl: result.launchUrl });
  //     } else {
  //       console.error("Error in result:", result);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  setGameUrl = () => {
    this.setState({
      gameUrl:
        "https://rainbet.com/casino/live/blackjack/bgaming-multihand-blackjack-pro",
    });
  };
  render() {
    const { gameUrl } = this.state;
    // const { gameUrl } = "";

    return (
      <div className="body_contain" style={{ margin: "auto" }}>
        {gameUrl ? (
          <section>
            <div className="center-wrapper">
              <button
                type="button"
                className="btn btn-outline-primary btn-fw"
                onClick={() => this.setState({ gameUrl: "" })}
              >
                Back
              </button>
            </div>
            <div className="iframe-container">
              <iframe
                src={gameUrl}
                allowFullScreen
                frameBorder="0"
                title="Game"
              ></iframe>
            </div>
          </section>
        ) : (
          <>
            <section className="banner"></section>
            <section className="games ">
              <div className="game-grid ">
                {this.listGames.map((gameCode) => (
                  <div key={gameCode} className="game">
                    <img
                      src={require(`../../assets/images/project/${gameCode}.png`)}
                      alt={gameCode}
                      onClick={this.setGameUrl}
                    />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    );
  }
}

export default Casino;
