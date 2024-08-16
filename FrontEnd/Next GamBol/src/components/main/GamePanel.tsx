import { useState, useEffect } from "react";
import Link from "next/link";
import { backendUrl, siteInfo, updateSiteInfo } from "@/anchor/global";
import Image from "next/image";

interface GameData {
    vendorCode: string;
    gameType: number;
    imageUrl: string;
    gameCode: string;
    gameName: string;
}

export default function GamePanel({
  title,
  gameType,
}: {
  title: string;
  gameType: number;
}) {
  const [loading, setLoading] = useState(true);
  const [vendorGames, setVendorGames] = useState<GameData[]>([]);

  useEffect(() => {
    const fetchGameData = async () => {
      await updateSiteInfo();
      try {
        const response = await fetch(`${backendUrl}/backend/unauthorizeapi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method: "GetVendorGames",
            gametype: gameType,
            agentCode: siteInfo.agentCode,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        if (result.status === 0) {
          setVendorGames(result.vendorGames || []);
        } else {
          throw new Error("Unexpected status code");
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGameData(); // Fetch for original games
  }, []);

  return (
    <div className="SlotsList_list_container mt-10">
      <h3 className="SlotsList_heading-item flex gap-3 text-white">
        <svg
          width="18"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 46.7 50.22"
          fill="#7179A5"
        >
          <defs>
            <linearGradient
              id="linear-gradient"
              x1="23.35"
              x2="23.35"
              y1="51.36"
              y2="1.15"
              gradientTransform="matrix(1 0 0 -1 0 51.36)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#5cb4ff"></stop>
              <stop offset="1" stopColor="#0082f0"></stop>
            </linearGradient>
            <linearGradient
              id="linear-gradient-2"
              x1="23.35"
              x2="23.35"
              y1="51.36"
              y2="1.15"
              gradientTransform="matrix(1 0 0 -1 0 51.36)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#87c1f2"></stop>
              <stop offset="1" stopColor="#3a8dda"></stop>
            </linearGradient>
            <linearGradient
              id="linear-gradient-3"
              x1="23.35"
              x2="23.35"
              y1="51.21"
              y2="1.3"
              gradientTransform="matrix(1 0 0 -1 0 51.36)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#fff" stopOpacity="0.75"></stop>
              <stop offset="1" stopColor="#fff" stopOpacity="0.05"></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#linear-gradient)"
            strokeWidth="0"
            d="M46.36 7.54L40.97.55c-.54-.54-1.44-.72-2.16-.36l-2.16 1.08C31.44 3.78 25.69 4.32 20.12 2.7c-2.34-.72-4.85-.9-7.19-.9H1.8C.72 1.8 0 2.52 0 3.59v20.8c0 1.08.72 1.79 1.8 1.79h7.19c1.08 0 1.8-.72 1.8-1.79 0-2.87 2.34-5.2 5.39-5.2h5.21l-2.7 3.23C12.4 29.95 7.91 38.56 5.39 48.06c0 .36 0 1.08.36 1.43.36.36.9.72 1.44.72h23.36c1.08 0 1.8-.72 1.8-1.79 0-9.86 2.7-19.55 7.73-28.15l6.29-10.76c.54-.54.36-1.26 0-1.97z"
          ></path>
          <path
            fill="url(#linear-gradient-2)"
            fillOpacity="0.4"
            strokeWidth="0"
            d="M46.36 7.54L40.97.55c-.54-.54-1.44-.72-2.16-.36l-2.16 1.08C31.44 3.78 25.69 4.32 20.12 2.7c-2.34-.72-4.85-.9-7.19-.9H1.8C.72 1.8 0 2.52 0 3.59v20.8c0 1.08.72 1.79 1.8 1.79h7.19c1.08 0 1.8-.72 1.8-1.79 0-2.87 2.34-5.2 5.39-5.2h5.21l-2.7 3.23C12.4 29.95 7.91 38.56 5.39 48.06c0 .36 0 1.08.36 1.43.36.36.9.72 1.44.72h23.36c1.08 0 1.8-.72 1.8-1.79 0-9.86 2.7-19.55 7.73-28.15l6.29-10.76c.54-.54.36-1.26 0-1.97z"
          ></path>
          <path
            fill="none"
            stroke="url(#linear-gradient-3)"
            strokeWidth="0.28"
            d="M36.78 1.53h0L38.94.45c.59-.3 1.34-.15 1.8.29l5.36 6.95c.17.34.28.64.29.91.02.26-.05.49-.25.69l-.03.03-.02.03-6.29 10.76c-5.06 8.65-7.77 18.39-7.77 28.3 0 .47-.16.84-.41 1.09-.25.25-.62.41-1.09.41H7.19c-.42 0-.89-.29-1.23-.63-.11-.11-.19-.31-.23-.56-.04-.22-.04-.45-.04-.63 2.51-9.45 6.97-18 13.23-25.49l2.7-3.23.41-.49h-5.85c-3.21 0-5.69 2.46-5.69 5.5 0 .47-.16.84-.41 1.09-.25.25-.62.41-1.09.41H1.8c-.47 0-.84-.16-1.09-.41-.25-.25-.41-.62-.41-1.09V3.59c0-.47.16-.84.41-1.09.25-.25.62-.41 1.09-.41h11.14c2.32 0 4.81.18 7.1.88h0c5.64 1.64 11.47 1.09 16.74-1.45z"
          ></path>
        </svg>
        {title}
      </h3>

      <div className="mt-3 flex grid grid-cols-2 gap-3 gap-4 md:grid-cols-5 md:gap-6 xl:grid-cols-6 xl:gap-4 2xl:grid-cols-8 2xl:gap-7.5">
        {vendorGames.map((gameData) => {
          // Parse JSON strings
          const gameName = JSON.parse(gameData.gameName);
          const imageUrl = JSON.parse(gameData.imageUrl);
          console.log("--------vender------");
          console.log(gameData.vendorCode);
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
                // href={`/casino?gameurl=${encodeURIComponent(imageUrl)}`}
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
                    src={imageUrl.en}
                    alt={gameData.gameName || "Game Thumbnail"} // Provide fallback alt text
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
      </div>
    </div>
  );
}
