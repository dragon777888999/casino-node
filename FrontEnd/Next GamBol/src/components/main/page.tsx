"use client";
import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { backendUrl, siteInfo } from "@/anchor/global";
import { useEffect } from "react";
import { Tuple } from "@reduxjs/toolkit";

interface GameData {
  vendorCode: string;
  gameType: number;
  imageUrl: string;
  gameCode: string;
  gameName: string;
}

const Main: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [slotData, setSlotData] = useState<GameData[]>();
  const [originalData, setOriginalData] = useState<GameData[]>();
  const fetchGameData = async (type: number) => {
    try {
      const response = await fetch(`${backendUrl}/backend/unauthorizeapi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "GetVendorGames",
          gametype: type,
          agentCode: siteInfo.agentCode,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.status === 0) {
        if (type === 9) {
          setOriginalData(result.vendorGames || []);
        } else if (type === 1) {
          setSlotData(result.vendorGames || []);
        }
      } else {
        throw new Error("Unexpected status code");
      }
    } catch (error) {
      console.error("Error fetching game data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameData(9); // Fetch for original games
    // fetchGameData(1); // Fetch for slot games
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

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
          Original Game
        </h3>

        <div className="mt-3 flex grid grid-cols-2 gap-3 gap-4 md:grid-cols-5 md:gap-6 xl:grid-cols-6 xl:gap-4 2xl:grid-cols-8 2xl:gap-7.5">
          {originalData.map((gameData) => {
            // Parse JSON strings
            const gameName = JSON.parse(gameData.gameName);
            const imageUrl = JSON.parse(gameData.imageUrl);

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
                  href="/"
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
      <div className="SlotsList_list_container mt-10">
        <h3 className="SlotsList_heading-item flex gap-3 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 14 15"
          >
            <path
              fill="rgb(113, 121, 165)"
              fillRule="evenodd"
              d="M.021 8.835L5.846.068a.153.153 0 01.255 0l5.825 8.767a.127.127 0 01.006.131.127.127 0 01-.113.068H10.7a.229.229 0 00-.225.2 4.547 4.547 0 01-2.217 3.303 6.11 6.11 0 01-.7.326.407.407 0 00-.187.154l-1.28 1.926a.129.129 0 01-.167.042.129.129 0 01-.046-.042l-1.282-1.93a.412.412 0 00-.201-.156 4.533 4.533 0 01-2.92-3.623.229.229 0 00-.226-.2H.128a.128.128 0 01-.107-.2zm8.422-1.777L5.975 3.18 3.507 7.058a2.931 2.931 0 002.468 4.503 2.924 2.924 0 002.566-1.52 2.932 2.932 0 00-.098-2.983zm-.74.456L5.974 4.8 4.248 7.514a2.052 2.052 0 001.727 3.152A2.046 2.046 0 008.022 8.55a2.052 2.052 0 00-.32-1.035z"
              clipRule="evenodd"
              fillOpacity="1"
            ></path>
          </svg>
          Slot Game
        </h3>

        {/* <div className="mt-3 flex grid grid-cols-2 gap-3 gap-4 md:grid-cols-5 md:gap-6 xl:grid-cols-6 xl:gap-4 2xl:grid-cols-8 2xl:gap-7.5">
          {slotData.map((gamesDate) => {
            // Parse JSON strings
            const gameName = JSON.parse(gamesDate.gameName);
            const imageUrl = JSON.parse(gamesDate.imageUrl);

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
                  href="/"
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
                      alt={gameName || "Game Thumbnail"} // Provide fallback alt text
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
      </div>
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
