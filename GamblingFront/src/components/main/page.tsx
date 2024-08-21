"use client";

import React from "react";
import Image from "next/image";

import GamePanel from "./GamePanel";
import { useAppContext } from "../../hooks/AppContext";
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
      bannerImgSrc = `/${siteInfo.themeMap.banner}/images/banner.png`;
      width = Number(siteInfo.themeMap.bannerWidth);
      height = Number(siteInfo.themeMap.bannerWidth);
    } else {
      bannerImgSrc = "/default/images/banner.png";
    }
  }

  return (
    <div className=" max-w-screen mx-auto">
      <div className="banner">
        {/* <div className="banner"></div> */}
        {siteInfo.mark && (
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
      <GamePanel title={"Original"} gameType={9} />
      <GamePanel title={"Slots"} gameType={1} />

      {/* <WebSocketComponent websocketUrl={`${backendUrl}/websocket`} /> */}

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
      <hr
        className="max-w-screen-2xl"
        style={{
          marginTop: "48px",
          transform: "scaleX(1.05)",
          color: "#2b4265",
        }}
      ></hr>
    </div>
  );
};

export default Main;
