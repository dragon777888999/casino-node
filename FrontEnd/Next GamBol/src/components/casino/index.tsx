"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useRef } from "react";
import { backendUrl } from "@/anchor/global";
import GamePanel from "../main/GamePanel";
import { useAppContext } from '../../context/AppContext';
// import { accessToken } from "@/anchor/global";

const Casino = () => {
  const { siteInfo,setSiteInfo, userInfo, accessToken } = useAppContext();

  const searchParams = useSearchParams();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const vendorCode = searchParams?.get("vendorcode");
  const gameCode = searchParams?.get("gameCode");
  const [launchUrl, setLaunchUrl] = useState("");
  const [loading, setLoading] = useState(true);

  console.log(vendorCode);
  const getDataFromLocalStorage = (key: any) => {
    const data = localStorage.getItem(key);
    return data ? data : " ";
  };
  useEffect(() => {
    const getLaunchUrl = async () => {
      try {
        if (accessToken == "")
          return;
        const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
          method: "POST",

          headers: {
            "X-Access-Token": accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method: "GetLaunchUrl",
            currencyCode: userInfo?.selectedCoinType,
            userCode: userInfo?.userCode,
            gameCode: gameCode,
            vendorCode: vendorCode,
          }),
        });
        console.log("-----------getLaunchUrl-------");
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        if (result.status === 0) {
          setLaunchUrl(result.launchUrl || []);
        } else {
          throw new Error("Unexpected status code");
        }
      } catch (error) {
        console.error("Error fetching game data:", error);
      } finally {
        setLoading(false);
      }
    };
    getLaunchUrl(); // Fetch for original games
  }, []);
  function toggleFullScreen(isFull: boolean): void {
    // Check if the document is currently in fullscreen mode

    const iframe = iframeRef.current;

    if (iframe) {
      // If fullscreen is not enabled and we want to enter fullscreen
      if (isFull && iframe) {
        // Enter fullscreen mode for iframe
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
          iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) {
          iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
          iframe.msRequestFullscreen();
        }
      }
    }
  }

  return (
    <div>
      {launchUrl != " " ? (
        <section>
          <div className="main-contain">
            <div className="game-content">
              <div className="aspect-ratio">
                <div className="game-container">
                  <iframe
                    ref={iframeRef}
                    src={launchUrl}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    width="560"
                    height="315"
                    frameBorder="0"
                    allowFullScreen
                    style={{ border: "none" }}
                  ></iframe>
                </div>
              </div>
              <div className="game-bar">
                <div className="flex items-center">
                  {" "}
                  <Image
                    width={176}
                    height={32}
                    src={"/images/logo/logo.svg"}
                    alt="Logo"
                    priority
                  />
                </div>
                <div className="flex items-center ">
                  <button onClick={() => toggleFullScreen(true)}>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <path
                          d="M19.5312 7.8125V10.9375C19.5312 11.1447 19.4489 11.3434 19.3024 11.4899C19.1559 11.6364 18.9572 11.7188 18.75 11.7188C18.5428 11.7188 18.3441 11.6364 18.1976 11.4899C18.0511 11.3434 17.9688 11.1447 17.9688 10.9375V8.59375H15.625C15.4178 8.59375 15.2191 8.51144 15.0726 8.36493C14.9261 8.21841 14.8438 8.0197 14.8438 7.8125C14.8438 7.6053 14.9261 7.40659 15.0726 7.26007C15.2191 7.11356 15.4178 7.03125 15.625 7.03125H18.75C18.9572 7.03125 19.1559 7.11356 19.3024 7.26007C19.4489 7.40659 19.5312 7.6053 19.5312 7.8125ZM9.375 16.4062H7.03125V14.0625C7.03125 13.8553 6.94894 13.6566 6.80243 13.5101C6.65591 13.3636 6.4572 13.2812 6.25 13.2812C6.0428 13.2812 5.84409 13.3636 5.69757 13.5101C5.55106 13.6566 5.46875 13.8553 5.46875 14.0625V17.1875C5.46875 17.3947 5.55106 17.5934 5.69757 17.7399C5.84409 17.8864 6.0428 17.9688 6.25 17.9688H9.375C9.5822 17.9688 9.78091 17.8864 9.92743 17.7399C10.0739 17.5934 10.1562 17.3947 10.1562 17.1875C10.1562 16.9803 10.0739 16.7816 9.92743 16.6351C9.78091 16.4886 9.5822 16.4062 9.375 16.4062ZM22.6562 5.46875V19.5312C22.6562 19.9457 22.4916 20.3431 22.1986 20.6361C21.9056 20.9291 21.5082 21.0938 21.0938 21.0938H3.90625C3.49185 21.0938 3.09442 20.9291 2.8014 20.6361C2.50837 20.3431 2.34375 19.9457 2.34375 19.5312V5.46875C2.34375 5.05435 2.50837 4.65692 2.8014 4.3639C3.09442 4.07087 3.49185 3.90625 3.90625 3.90625H21.0938C21.5082 3.90625 21.9056 4.07087 22.1986 4.3639C22.4916 4.65692 22.6562 5.05435 22.6562 5.46875ZM21.0938 19.5312V5.46875H3.90625V19.5312H21.0938Z"
                          fill="#5E679E"
                        ></path>
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
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
          <GamePanel title={"Original Games"} gameType={9} />
        </>
      )}
    </div>
  );
};
export default Casino;
