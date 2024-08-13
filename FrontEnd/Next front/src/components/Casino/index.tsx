"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useState } from "react";
import Image from "next/image";
const Casino = () => {
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
  const onClickGame = async (vendorCode: string, gameCode: string) => {};
  const setUrl = () => {
    setGameUrl("https://www.freeslots.com/slot101.htm");
  };
  return (
    <div>
      {gameUrl != "" ? (
        <section>
          <div className="center-wrapper flex justify-end">
            <button
              className="back-btn inline-flex items-center justify-center rounded-full bg-meta-3 px-10 py-4 text-center font-medium  hover:bg-opacity-90 lg:px-8 xl:px-10"
              onClick={() => {
                setGameUrl("");
              }}
            >
              <img src="/images/project/arrowleft.png" alt="arrow" width={40} />
            </button>
          </div>
          <div className="iframe-container">
            <iframe src={gameUrl} allowFullScreen frameBorder="0"></iframe>
          </div>
        </section>
      ) : (
        <>
          <section className="banner">
            <Image
              src="/images/project/banner.png"
              alt="Project Thumbnail"
              layout="responsive"
              width={800}
              height={450}
              style={{ width: "100%" }}
            />
          </section>
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
                    src={`/images/project/${gameCode}.png`}
                    onClick={setUrl}
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
export default Casino;
