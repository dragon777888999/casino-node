"use client";

import React from "react";
import Image from "next/image";

import GamePanel from "./GamePanel";

interface GameData {
  vendorCode: string;
  gameType: number;
  imageUrl: string;
  gameCode: string;
  gameName: string;
}
const imgUrls = [
  "/images/project/recommend.png",
  "/images/project/original.png",
];
const Main: React.FC = () => {
  return (
    <div className=" max-w-screen mx-auto">
      <div className="banner">
        {/* <div className="banner"></div> */}
        <Image
          src="/images/project/banner.png"
          alt="Project Thumbnail"
          layout="responsive"
          width={800}
          height={450}
          style={{ width: "100%" }}
        />
      </div>
      <GamePanel title={"Original"} gameType={9} imgUrl={imgUrls[0]} />
      <GamePanel title={"Slot"} gameType={1} imgUrl={imgUrls[1]} />

      <div className="mt-10">
        <h4 style={{ marginBottom: "15px", color: "white", fontSize: "20px" }}>
          Provider
        </h4>
        <div className="mt-3 flex grid grid-cols-2 gap-3 gap-4 md:grid-cols-5 md:gap-6 xl:grid-cols-6 xl:gap-4 2xl:grid-cols-8 2xl:gap-7.5">
          <div className="custom-procard mt-2 p-1 ">
            <a>
              <Image
                src="/images/provider/zillion.svg" // Path relative to the public directory
                alt="Logo"
                width={80} // Adjust width
                height={80} // Adjust height
              />
            </a>
          </div>
          <div className="custom-procard mt-2 p-1 ">
            <a>
              <Image
                src="/images/provider/bgaming.svg" // Path relative to the public directory
                alt="Logo"
                width={100} // Adjust width
                height={100} // Adjust height
              />
            </a>
          </div>
          <div className="custom-procard mt-2 p-1 ">
            <a>
              <Image
                src="/images/provider/endorphina.svg" // Path relative to the public directory
                alt="Logo"
                width={100} // Adjust width
                height={100} // Adjust height
              />
            </a>
          </div>
          <div className="custom-procard mt-2 p-1 ">
            <a>
              <Image
                src="/images/provider/evolution.svg" // Path relative to the public directory
                alt="Logo"
                width={100} // Adjust width
                height={100} // Adjust height
              />
            </a>
          </div>
          <div className="custom-procard mt-2 p-1 ">
            <a>
              <Image
                src="/images/provider/nolimit.svg" // Path relative to the public directory
                alt="Logo"
                width={100} // Adjust width
                height={100} // Adjust height
              />
            </a>
          </div>
          <div className="custom-procard mt-2 p-1 ">
            <a>
              <Image
                src="/images/provider/playngo.svg" // Path relative to the public directory
                alt="Logo"
                width={100} // Adjust width
                height={100} // Adjust height
              />
            </a>
          </div>
          <div className="custom-procard mt-2 p-1 ">
            <a>
              <Image
                src="/images/provider/prgmaticplay.svg" // Path relative to the public directory
                alt="Logo"
                width={100} // Adjust width
                height={100} // Adjust height
              />
            </a>
          </div>
          <div className="custom-procard mt-2 p-1 ">
            <a>
              <Image
                src="/images/provider/thunderkick.svg" // Path relative to the public directory
                alt="Logo"
                width={40} // Adjust width
                height={40} // Adjust height
              />
            </a>
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
