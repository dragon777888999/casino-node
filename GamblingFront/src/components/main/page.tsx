"use client";

import React from "react";
import Image from "next/image";

import GamePanel from "./GamePanel";
import ProviderPanel from "./ProviderPanel";
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
  let smallBannerImgSrc = "";

  let width = 40;
  let height = 40;
  if (siteInfo.themeMap) {
    if (siteInfo.themeMap?.banner) {
      bannerImgSrc = `/${siteInfo.themeMap.banner}/images/banner.png`;
      smallBannerImgSrc = `/${siteInfo.themeMap.banner}/images/smallBanner.png`;

      //bannerImgSrc = "/RebelGames/images/banner.png";
      width = Number(siteInfo.themeMap.bannerWidth);
      height = Number(siteInfo.themeMap.bannerWidth);
    } else {
      bannerImgSrc = "/default/images/banner.png";
      smallBannerImgSrc = `/default/images/smallBanner.png`;
      width = 800;
      height = 450;
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
        <Image
          src={bannerImgSrc}
          alt="Project Thumbnail"
          layout="responsive"
          width={width}
          height={height}
          style={{ width: "100%" }}
        />
      </div>
      <div className="smallBanner">
        {/* <div className="banner"></div> */}
        <Image
          src={smallBannerImgSrc}
          alt="Project Thumbnail"
          layout="responsive"
          width={width}
          height={height}
          style={{ width: "100%" }}
        />
      </div>
      <div className="style-card">
        <div className="style-card-header">
          <div className="">
            <Image
              id="card-img"
              src={cardHeaderImg}
              alt="Project Thumbnail"
              layout="responsive"
              width={width}
              height={height}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="style-card-body">
          <div className={`${style}-card-body-contain`}>
            <GamePanel title={"Original"} gameType={9} />
          </div>
        </div>
        <div className="style-card-footer">
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
      <GamePanel title={"Featured Games"} gameType={9} />
      <GamePanel title={"Featured Slots"} gameType={1} />
      {siteInfo.showProvider ? <ProviderPanel /> : <></>}

      <div className="splite-line">
        <hr
          className="max-w-screen-2xl"
          style={{
            marginTop: "48px",
            transform: "scaleX(1.05)",
            color: "#2b4265",
          }}
        ></hr>
      </div>
    </div>
  );
};

export default Main;
