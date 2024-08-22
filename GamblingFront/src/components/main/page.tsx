"use client";

import React from "react";
import Image from "next/image";

import GamePanel from "./GamePanel";
import { useAppContext } from "../../hooks/AppContext";

import { Data } from "@/anchor/divide_css";
interface GameData {
  vendorCode: string;
  gameType: number;
  imageUrl: string;
  gameCode: string;
  gameName: string;
}
const Main: React.FC = () => {
  const { siteInfo } = useAppContext();
  let bannerImgSrc = "";

  let width = 40;
  let height = 40;
  if (siteInfo.mark) {
    if (siteInfo.themeMap?.banner) {
      // bannerImgSrc = `/${siteInfo.themeMap.banner}/images/banner.png`;

      bannerImgSrc = "/RebelGames/images/banner.png";
      width = Number(siteInfo.themeMap.bannerWidth);
      height = Number(siteInfo.themeMap.bannerWidth);
    } else {
      bannerImgSrc = "/default/images/banner.png";
    }
  }
  // const cardHeaderImg = `/${siteInfo.mark}/images/gamePanel/card-header.png`;
  const cardHeaderImg = `/RebelGames/images/gamePanel/card-header.png`;
  const cardfooterImg = `/RebelGames/images/gamePanel/card-footer.png`;
  const style = siteInfo.themeMap.style ? siteInfo.themeMap.style : "";

  return (
    <div className=" max-w-screen mx-auto" id="root">
      <div className="banner">
        {/* <div className="banner"></div> */}
        {style && (
          <Image
            src={bannerImgSrc}
            alt="Project Thumbnail"
            layout="responsive"
            width={width}
            height={height}
            style={{ width: "100%" }}
          />
        )}
      </div>
      <div className={`${style}-card`}>
        <div className="RebelGames-card-header">
          <div className="">
            <Image
              src={cardHeaderImg}
              alt="Project Thumbnail"
              layout="responsive"
              width={width}
              height={height}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className={`${style}-card-body`}>
          <div className={`${style}-card-body-contain`}>
            <GamePanel title={"Original"} gameType={9} />
          </div>
        </div>
        <div className={`${style}-card-footer`}>
          <Image
            src={cardfooterImg}
            alt="Project Thumbnail"
            layout="responsive"
            width={width}
            height={height}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      {/* <GamePanel title={"Original"} gameType={9} /> */}
      {Data.Rogoosino.slot && <GamePanel title={"Slots"} gameType={1} />}
      {/* <WebSocketComponent websocketUrl={`${backendUrl}/websocket`} /> */}
      {Data.Rogoosino.provider && (
        <div className="mt-10">
          <div className="sub-title ">
            <Image
              src="/images/icon/provider.png"
              alt="Project Thumbnail"
              width={28}
              height={28}
            />
            <span className="ml-3">Provider</span>
          </div>
          {/* <div className="mt-3 flex grid grid-cols-2 gap-3 gap-4 md:grid-cols-5 md:gap-6 xl:grid-cols-6 xl:gap-4 2xl:grid-cols-8 2xl:gap-7.5"></div> */}

          <div className="games-block ">
            <div className="games-block-item ">
              <div className="custom-procard mt-2 p-1 ">
                <a>
                  <Image
                    src="/images/provider/spribe.svg" // Path relative to the public directory
                    alt="Logo"
                    width={80} // Adjust width
                    height={80} // Adjust height
                  />
                </a>
              </div>
            </div>
            <div className="games-block-item ">
              <div className="custom-procard mt-2 p-1 ">
                <a>
                  <Image
                    src="/images/provider/croco.svg" // Path relative to the public directory
                    alt="Logo"
                    width={80} // Adjust width
                    height={80} // Adjust height
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <hr
        className="max-w-screen-2xl"
        style={{
          marginTop: "48px",
          transform: "scaleX(1.05)",
          color: "#2b4265",
        }}
      ></hr> */}
    </div>
  );
};

export default Main;
