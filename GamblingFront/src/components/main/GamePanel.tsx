import { useState, useEffect } from "react";
import Link from "next/link";
import { backendUrl } from "@/anchor/global";
import { useAppContext } from "../../hooks/AppContext";
import Image from "next/image";
import { userInfo } from "os";
interface LangName {
  en: string;
  ko: string;
}
interface GameData {
  vendorCode: string;
  gameType: number;
  imageUrl: string;
  gameCode: string;
  gameName: string;
  vendorName: string;
}

export default function GamePanel({
  title,
  gameType,
}: {
  title: string;
  gameType: number;
}) {
  const { siteInfo } = useAppContext();
  const [vendorGames, setVendorGames] = useState<GameData[]>([]);
  let imgUrl = `/default/images/gamePanel/${gameType}.png`;
  if (siteInfo?.themeMap.style)
    imgUrl = `/${siteInfo.themeMap.style}/images/gamePanel/${gameType}.png`;
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(`${backendUrl}/backend/unauthorizeapi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method: "GetVendorGames",
            gametype: gameType,
            agentCode: siteInfo?.agentCode,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("game", result.vendorGames);
        if (result.status === 0) {
          setVendorGames(result.vendorGames || []);
        } else {
          throw new Error("Unexpected status code");
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };
    fetchGameData(); // Fetch for original games
  }, []);
  const style = siteInfo.themeMap.style ? siteInfo.themeMap.style : "";

  return (
    <div className="SlotsList_list_container  mt-10 ">
      <h3 className="SlotsList_heading-item sub-title mb-3 flex items-center gap-3 text-white">
        <Image src={imgUrl} alt="Project Thumbnail" width={28} height={18} />

        {title}
      </h3>

      {/* <div className="mt-3 flex grid grid-cols-2 gap-3 gap-4 md:grid-cols-5 md:gap-6 xl:grid-cols-6 xl:gap-4 2xl:grid-cols-8 2xl:gap-7.5">
        {vendorGames.map((gameData) => {
          // Parse JSON strings
          const gameName = JSON.parse(gameData.gameName);
          const imageUrl = JSON.parse(gameData.imageUrl);
          let imageSrc = imageUrl.en;
          if (siteInfo?.themeCode) {
            imageSrc = `/${siteInfo?.themeCode}/images/${gameData.vendorCode}/${gameData.gameCode}.png`;
          }
          // console.log("--------vender------");
          // console.log(gameData.vendorCode);
          return (
            <div
              key={gameName.en} // Use gameCode as a unique key
              style={{
                position: "relative",
                height: "100%",
                width: "150px",
              }}
            >
              <Link
                className="Quick_Link"
                href={`/casino?vendorcode=${encodeURIComponent(gameData.vendorCode)}&gameCode=${gameData.gameCode}`}
              >
                <div>
                  <div className="SlotsList_slot-image">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="34"
                      viewBox="0 0 28 34"
                      fill="none"
                    >
                      <path
                        d="M27.055 14.9547L2.695 0.283333C2.3975 0.10625 2.09125 0 1.74125 0C0.7875 0 0.00874987 0.796875 0.00874987 1.77083H0V32.2292H0.00874987C0.00874987 33.2031 0.7875 34 1.74125 34C2.1 34 2.3975 33.876 2.72125 33.699L27.055 19.0453C27.6325 18.5583 28 17.8234 28 17C28 16.1766 27.6325 15.4505 27.055 14.9547Z"
                        fill="white"
                      ></path>
                    </svg>
                  </div>
                  <Image
                    src={imageSrc}
                    alt={gameName.en || "Game Thumbnail"} // Provide fallback alt text
                    layout="responsive"
                    width={800}
                    height={450}
                    style={{ width: "100%", borderRadius: "6px" }}
                  />
                  <div
                    className="flex justify-center"
                    style={{ backgroundColor: "black" }}
                  >
                    <p>{gameName.en}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div> */}
      <div className="games-block ">
        {vendorGames.map((gameData) => {
          // Parse JSON strings
          const gameName = JSON.parse(gameData.gameName);
          const imageUrl = JSON.parse(gameData.imageUrl);
          const vendorName = JSON.parse(gameData.vendorName);
          let imageSrc = imageUrl.en;
          if (siteInfo?.themeMap.vendorImage) {
            imageSrc = `/${siteInfo?.themeMap.vendorImage}/images/vendorGame/${gameData.vendorCode}/${gameData.gameCode}.png`;
          }
          // console.log("--------vender------");
          // console.log(gameData.vendorCode);
          return (
            <div
              // className={`games-block-item,${siteInfo.mark}-block-item`}
              className="games-block-item"
              key={gameData.gameCode}
            >
              <div className="game-block-item-inner">
                <div className="game-block-item-content">
                  <Link
                    className="Quick_Link"
                    href={`/casino?vendorcode=${encodeURIComponent(gameData.vendorCode)}&gameCode=${gameData.gameCode}`}
                  >
                    <div>
                      <div className="SlotsList_slot-image">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="34"
                          viewBox="0 0 28 34"
                          fill="none"
                        >
                          <path
                            d="M27.055 14.9547L2.695 0.283333C2.3975 0.10625 2.09125 0 1.74125 0C0.7875 0 0.00874987 0.796875 0.00874987 1.77083H0V32.2292H0.00874987C0.00874987 33.2031 0.7875 34 1.74125 34C2.1 34 2.3975 33.876 2.72125 33.699L27.055 19.0453C27.6325 18.5583 28 17.8234 28 17C28 16.1766 27.6325 15.4505 27.055 14.9547Z"
                            fill="white"
                          ></path>
                        </svg>
                      </div>
                      <Image
                        className="game-block-item-content-img"
                        src={imageSrc}
                        alt={gameName.en || "Game Thumbnail"} // Provide fallback alt text
                        layout="responsive"
                        width={1200}
                        height={800}
                        style={{ width: "100%", borderRadius: "6px" }}
                      />
                    </div>
                  </Link>
                  <div className="game-item-title">
                    <div className="game-item-title-vender">
                      {vendorName.en}
                    </div>
                    <p className="game-item-title-p">{gameName.en}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
