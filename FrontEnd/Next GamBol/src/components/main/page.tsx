"use client";
import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
const Main: React.FC = () => {
  const gameurl =
    "https://app.roogsino.io/mines?currency=USD&operator=xyz_.1.2.6&jurisdiction=CW&lang=en&user=16792&token=3891eaf725dde508f2b57300";

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

      {/* <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-3">
        <div className="custom-card">
          <div className="">
            <div
              style={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "12px",
              }}
            >
              <div
                className="align-self-start flex items-center "
                style={{
                  gap: "10px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20.3 21.88"
                  width={17}
                >
                  <path
                    fill="url(#slots)"
                    d="M20.16 3.28 17.8.24a.83.83 0 0 0-.93-.16l-.94.47a9.96 9.96 0 0 1-7.19.63C7.73.86 6.65.78 5.62.78H.79C.31.78 0 1.1 0 1.57v9.06c0 .47.31.78.78.78h3.13c.46 0 .78-.31.78-.78a2.29 2.29 0 0 1 2.34-2.27H9.3l-1.18 1.4a28.83 28.83 0 0 0-5.78 11.18c0 .16 0 .47.16.63.16.15.4.3.63.3h10.15c.47 0 .78-.3.78-.77 0-4.3 1.17-8.52 3.36-12.27l2.74-4.69c.23-.23.15-.54 0-.86z"
                  ></path>
                  <defs>
                    <linearGradient
                      id="slots"
                      x1="10.28"
                      x2="10.28"
                      y1=".56"
                      y2="22.44"
                      gradientTransform="translate(-.13 -.56)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#87C1F2"></stop>
                      <stop offset="1" stopColor="#3A8DDA"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <h4 className="mb-0">Slots</h4>
                <svg
                  viewBox="0 0 13.5 11.05"
                  xmlns="http://www.w3.org/2000/svg"
                  width={17}
                >
                  <path
                    d="M7.98 0a.75.75 0 0 0-.53 1.28l3.49 3.5H.75a.75.75 0 0 0 0 1.5h10.19l-3.5 3.49a.75.75 0 1 0 1.07 1.06l4.77-4.78c.3-.29.3-.76 0-1.06L8.51.22A.75.75 0 0 0 7.98 0z"
                    fill="url(#arrow)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="arrow"
                      x1="7"
                      x2="7"
                      y1="6.5"
                      y2="7.5"
                      gradientTransform="translate(-.25 -9.8)"
                      gradientUnits="userSpaceOnUse"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <stop stopColor="#87C1F2"></stop>
                      <stop offset="1" stopColor="#3A8DDA"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <h6 className="text-muted font-weight-normal">
                Choose from 2,500+ Premium Slots!
              </h6>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
              <Image
                src="/images/project/mini/mini.png" // Path relative to the public directory
                alt="Project Thumbnail"
                layout="responsive" // Ensures the image scales based on its container
                width={800} // Set the width based on aspect ratio
                height={450} // Set the height based on aspect ratio
                style={{ width: "90%" }} // Apply inline styles if needed
              />

              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  width={15}
                  viewBox="0 0 10.53 2.32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.15 2.32A1.13 1.13 0 0 1 0 1.16C0 .81.11.53.34.32.56.11.84 0 1.14 0A1.13 1.13 0 0 1 2.3 1.16a1.13 1.13 0 0 1-1.15 1.16Zm4.12 0a1.13 1.13 0 0 1-1.15-1.16c0-.35.11-.63.33-.84.23-.21.5-.32.82-.32A1.13 1.13 0 0 1 6.4 1.16c0 .34-.1.62-.33.84-.23.22-.5.32-.81.32zm4.11 0a1.13 1.13 0 0 1-1.14-1.16c0-.35.1-.63.33-.84.23-.21.5-.32.81-.32a1.13 1.13 0 0 1 1.15 1.16c0 .34-.11.62-.33.84-.23.22-.5.32-.82.32z"
                    fill="rgba(232, 229, 255, 0.5)"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="custom-card">
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              gap: "12px",
            }}
          >
            <div
              className="align-self-start flex items-center "
              style={{
                gap: "10px",
              }}
            >
              <svg
                viewBox="0 0 24.99 25"
                xmlns="http://www.w3.org/2000/svg"
                width={20}
              >
                <path
                  d="M12.27 0c-1.43.03-2.84.3-4.19.8 1.46.72 2.86 1.55 4.19 2.49a9 9 0 0 0 1.24-1.27c.28-.38.24-1.17.2-1.87v-.1C13.23.02 12.75 0 12.27 0zm2.7.24c.04.88.06 1.84-.46 2.53a9.8 9.8 0 0 1-1.22 1.28c.53.42 1.08.87 1.63 1.37 1.49-.95 2.77-1.6 3.6-1.85.71-.22 1.44-.38 2.17-.5A12.45 12.45 0 0 0 14.96.23zM6.56 1.5a12.55 12.55 0 0 0-5.49 5.92c1.47-.59 3.05-.88 4.6-1.17l1.54-.3c1.49-.3 2.9-1.06 4.01-1.85a26.68 26.68 0 0 0-4.67-2.6zM21.8 4.17c-.9.1-1.9.3-2.93.6-.68.2-1.75.75-3.02 1.55l.4.4c.48.52.92 1.08 1.33 1.67a8.73 8.73 0 0 1 2.11-.48c1.96-.22 3.7 1.33 5.2 3.04a12.45 12.45 0 0 0-3.09-6.78zm-9.52.7c-1.29.96-2.98 1.92-4.82 2.3l-1.55.3c-1.97.37-3.86.72-5.44 1.6a12.5 12.5 0 0 0 1.76 10.57c.92-3.62 4.05-7.15 6.74-9.62a44.6 44.6 0 0 1 4.86-3.89c-.52-.46-1.04-.88-1.55-1.27zm2.5 2.15c-4.62 3.14-10.94 8.91-11.52 13.91a12.47 12.47 0 0 0 7.5 3.95c1.08-2.14 2.1-6.5 2.7-9.1.29-1.24.54-2.31.74-3 .51-1.74 1.1-3 2.26-3.8a11.71 11.71 0 0 0-1.68-1.96zm5.39 2.12a8.27 8.27 0 0 0-1.91.32c2.12 3.71 2.95 8.4 3.15 11.8A12.46 12.46 0 0 0 24.99 13c-1.36-1.67-3.14-3.77-4.81-3.86zm-3.04.88c-.84.62-1.28 1.6-1.73 3.1-.2.66-.44 1.72-.72 2.95-.85 3.62-1.65 6.85-2.59 8.92l.4.01c2.91 0 5.6-1 7.72-2.67-.09-3.55-.94-8.58-3.08-12.3z"
                  fill="url(#sportsbook)"
                ></path>
                <defs>
                  <linearGradient
                    id="sportsbook"
                    x1="26.69"
                    x2="26.69"
                    y1="16.24"
                    y2="41"
                    gradientTransform="translate(-16.34 -16)"
                    gradientUnits="userSpaceOnUse"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <stop stopColor="#87C1F2"></stop>
                    <stop offset="1" stopColor="#3A8DDA"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <h4 className="mb-0">SportsBook</h4>
            </div>

            <h6 className="text-muted font-weight-normal">
              Place your wagers on more than 40+ sports competitions using our
              betting platform
            </h6>
          </div>
          <div className="item-center mt-8 flex flex flex-wrap gap-3">
            <div className="mini-card gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17 16"
                width={13}
              >
                <g clipPath="url(#sc2)">
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M7.08 0c-.11 0-.21.02-.32.05-1 .19-1.52 1.5-1.08 2.4l-.08.08-.08.07c-.2-.27-.54-.2-.81-.13-.58.2-.95.75-1.14 1.32-.24.67-.22 1.4-.14 2.09-.15.07-.3.08-.46.09-.13 0-.26 0-.39.05a12.36 12.36 0 0 1-.15 1.72c-.02.14-.04.3 0 .44.05 0 .1.02.14.03.2.05.4.1.6.12-.15.03-.3.09-.43.16l.02.25a11.46 11.46 0 0 1-.13-.16c-.04.4.01.8.06 1.19.05.32.1.64.08.96-.27-.06-.3.2-.34.42l-.01.12.07.07.06.06c-.04.08-.08.15-.1.24l.02.2c.02.15.03.3.15.4l-.07.44c-.07.47-.15.94-.2 1.41 0 .1.01.18.03.27.02.11.04.23 0 .34-.03.1-.08.2-.13.3-.06.1-.13.21-.15.34a2.5 2.5 0 0 0-.43.66h1.78c.05-.13.1-.25.22-.32.16-.1.23-.28.3-.45.03-.09.1-.14.17-.18.06-.04.12-.08.15-.15.08-.13.1-.28.1-.43.02-.14.04-.28.1-.4a6 6 0 0 0 .12-.34c.11-.31.22-.63.46-.86.08-.07.12-.17.15-.27.03-.09.06-.17.12-.24l.06.12c.06.14.13.29.24.4.1.05.2.05.3.05h.1l.9 1.37c.02.05.05.1.09.14.13.23.45.28.68.18l.08.11a.7.7 0 0 1 .13.25 17.58 17.58 0 0 1-.06.65.6.6 0 0 0-.2.37h1.96c.07-.52.1-1.04.09-1.56l-.11-.16-.04-.36-.01-.01c-.1-.04-.19-.08-.2-.2-.21-.59-.45-1.17-.72-1.74-.26-.5-.6-.96-.97-1.38l-.09-.39a4.71 4.71 0 0 0-.04-.23l.11-.22c.05 0 .1.02.16.04.13.05.27.1.36-.01.16-.25.29-.53.27-.84 0-.2.03-.41.05-.62.03-.31.07-.62.02-.92a.56.56 0 0 0-.45-.46c.05-.16.1-.33.12-.5l.37.2c.47.27.94.53 1.48.58-.03.13.22.18.02.02.26.04.43-.12.6-.27.08-.07.16-.15.25-.2.23-.17.27-.45.32-.73.02-.15.05-.3.1-.44l.33-.1a4.64 4.64 0 0 0-.08-.39 2.44 2.44 0 0 1-.1-.73l.04-.02c.19-.15.4-.31.48-.54l.23-.12h1.69c.1 0 .1-.1.1-.18l.02-.1c.14.1.32.1.48.06.2-.07.39-.06.58-.06a3.72 3.72 0 0 0 .38 0c.15 0 .3 0 .42.1.23-.04.46-.04.69-.04h.02v-.13l.01-.16h-.55a13 13 0 0 0-.16-.06h-.01l-.06.04-.06.05c-.27.02-.54.02-.8.01h-.43v-.1c.02-.1.04-.2-.05-.28l-.05.06-.04.05a90 90 0 0 1-.13-.16v-.64h-.15v.82H13.96l.01-.2-2.43-.01H9.6v-.14a7.19 7.19 0 0 1-.27-.07c0-.14 0-.28-.07-.4l-.1.4-.04.17c-.16-.02-.3.03-.45.08-.16.05-.33.1-.5.08l-.02-.19c-.02-.14-.03-.27-.03-.41l.11-.04c.13-.03.27-.07.35-.18.17-.41.06-.88-.11-1.28l.02-.04L8.5.7a13 13 0 0 0-.08-.14A3.45 3.45 0 0 1 7.77.2L7.76.19C7.55.08 7.31 0 7.08 0Zm3.1 4.24c-.12-.13 0-.22.11-.29h.26c.05.12.08.24.1.37-.04.02-.09.08-.11.1-.13.29-.31.55-.55.74-.07-.19-.16-.37-.27-.55-.02-.1.09-.16.18-.2l.1-.06.18-.1Z"
                    clipRule="evenodd"
                  ></path>
                </g>
                <defs>
                  <clipPath id="cs2">
                    <path fill="#fff" d="M.33 0h16v16h-16z"></path>
                  </clipPath>
                </defs>
              </svg>
              <div>
                <span style={{ fontSize: "13px" }}>CS2</span>
              </div>
            </div>
            <div className="mini-card gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17 16"
                width={13}
              >
                <g clipPath="url(#basketball)">
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M1.54 7.02a6.92 6.92 0 0 0 1.8 5.67c.84-3.2 2.87-5.93 5.62-7.75-.29-.3-.6-.58-.92-.85a5.68 5.68 0 0 1-2.83.77C3.72 5 2.4 5.8 1.54 7.02Zm.29-1.2a5.7 5.7 0 0 1 3.91-1.57 5.11 5.11 0 0 0 1.8-.54c-.85-.64-1.8-1.16-2.8-1.55a6.88 6.88 0 0 0-2.91 3.66Zm8.02-4.51a6.88 6.88 0 0 0-4.47.5c.97.41 1.87.95 2.7 1.59A5.16 5.16 0 0 0 9.85 1.3Zm.56.15a5.72 5.72 0 0 1-1.87 2.3c.32.28.63.56.92.86 1.12-.67 2.34-1.2 3.64-1.55a6.85 6.85 0 0 0-2.69-1.6Zm-2.4 13.39c.35-.69.6-2.24.6-4v-.62a4.85 4.85 0 0 1 1.73-3.66c-.3-.42-.63-.83-.98-1.21a12.88 12.88 0 0 0-5.55 7.79c1.13 1 2.59 1.62 4.2 1.7Zm.62 0a6.83 6.83 0 0 0 4.2-1.67c-.25-2.25-1.01-4.35-2.17-6.13a4.28 4.28 0 0 0-1.47 3.23v.58c0 1.64-.21 3.12-.56 3.99Zm6.34-8.58a4.28 4.28 0 0 0-3.85.43 14.62 14.62 0 0 1 2.22 5.98 6.83 6.83 0 0 0 1.63-6.41Zm-.21-.67a6.85 6.85 0 0 0-1.21-2.05c-1.32.32-2.56.83-3.7 1.5.34.37.66.77.95 1.18a4.83 4.83 0 0 1 3.96-.63ZM8.33 16a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                    clipRule="evenodd"
                  ></path>
                </g>
                <defs>
                  <clipPath id="basketball">
                    <path fill="#fff" d="M.33 0h16v16h-16z"></path>
                  </clipPath>
                </defs>
              </svg>
              <div>
                <span style={{ fontSize: "13px" }}>Basketball</span>
              </div>
            </div>
            <div className="mini-card gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17 16"
                width={13}
              >
                <g clipPath="url(#soccer)">
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M5.03 11.59c.88.43 1.86.67 2.86.7l1.7-1.94a6.87 6.87 0 0 0-.77-3.27L5.48 6.3c-.7.7-1.24 1.54-1.58 2.46l1.13 2.83Zm-.18.55-1.13.94a6.83 6.83 0 0 0 5.62 1.7l-1.45-1.92a7.4 7.4 0 0 1-3.04-.72ZM1.5 8.44H3.4c.39-.99.98-1.88 1.73-2.61V3.75a6.84 6.84 0 0 0-2.04-.18 6.83 6.83 0 0 0-1.61 4.86Zm11.45 1.8c.6-.61 1.07-1.33 1.41-2.1l-.91-3.11a6.81 6.81 0 0 0-2.49-.72L9.4 6.97c.47.95.72 2 .75 3.05l2.8.21Zm.33.47v2.05a6.83 6.83 0 0 0 1.9-4.28l-.32-.06a7.44 7.44 0 0 1-1.58 2.29Zm.4-7.02a6.85 6.85 0 0 0-4.09-2.43 6.8 6.8 0 0 0-.62.85l1.87 1.62c.93.06 1.82.3 2.65.68l.19-.72ZM8.39 1.95c.16-.27.34-.53.53-.78a6.95 6.95 0 0 0-5.27 1.82c.54 0 1.08.07 1.6.2a.29.29 0 0 1 .08-.05l3.06-1.19ZM8.33 16a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                    clipRule="evenodd"
                  ></path>
                </g>
                <defs>
                  <clipPath id="soccer">
                    <path fill="#fff" d="M.33 0h16v16h-16z"></path>
                  </clipPath>
                </defs>
              </svg>
              <div>
                <span style={{ fontSize: "13px" }}>Soccer</span>
              </div>
            </div>
            <div className=" item-center flex">
              <svg
                viewBox="0 0 10.53 2.32"
                xmlns="http://www.w3.org/2000/svg"
                width={15}
              >
                <path
                  d="M1.15 2.32A1.13 1.13 0 0 1 0 1.16C0 .81.11.53.34.32.56.11.84 0 1.14 0A1.13 1.13 0 0 1 2.3 1.16a1.13 1.13 0 0 1-1.15 1.16Zm4.12 0a1.13 1.13 0 0 1-1.15-1.16c0-.35.11-.63.33-.84.23-.21.5-.32.82-.32A1.13 1.13 0 0 1 6.4 1.16c0 .34-.1.62-.33.84-.23.22-.5.32-.81.32zm4.11 0a1.13 1.13 0 0 1-1.14-1.16c0-.35.1-.63.33-.84.23-.21.5-.32.81-.32a1.13 1.13 0 0 1 1.15 1.16c0 .34-.11.62-.33.84-.23.22-.5.32-.82.32z"
                  fill="rgba(232, 229, 255, 0.5)"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="custom-card">
          <div className="">
            <div
              style={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "12px",
              }}
            >
              <div
                className="align-self-start flex items-center "
                style={{
                  gap: "10px",
                }}
              >
                <svg
                  viewBox="0 0 23.44 23.44"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                >
                  <path
                    d="M.69 0A.69.69 0 0 0 0 .69v5.69a.68.68 0 0 0 .25.53l5.43 4.44L7.8 8.76 3.3 4.28a.69.69 0 1 1 .98-.98l4.39 4.4 2.16-2.65L6.91.25A.68.68 0 0 0 6.38 0H.68zm16.37 0a.7.7 0 0 0-.53.25L5.57 13.66l-.81-.8a.69.69 0 0 0-.94.02.69.69 0 0 0-.03.94l5.83 5.83a.67.67 0 0 0 .48.2.69.69 0 0 0 .48-1.17l-.8-.8L23.18 6.9a.68.68 0 0 0 .26-.53V.68a.68.68 0 0 0-.69-.68h-5.7zm2.58 3.13a.7.7 0 0 1 .67.67c0 .17-.06.34-.18.48L8.16 16.25l-.97-.97L19.16 3.3c.13-.11.3-.18.48-.17zm-.47 9.52a.69.69 0 0 0-.49.2l-.8.81-.32-.38-1.82 1.49.51.5-.97.98-.6-.6-1.88 1.52.86.7-.8.81a.69.69 0 0 0 .96.97l5.83-5.83a.69.69 0 0 0 .2-.48.68.68 0 0 0-.68-.69zM3.95 15.93l-3.21 3.2A2.52 2.52 0 0 0 4.3 22.7l3.21-3.21-3.56-3.56zm15.54 0-3.56 3.56 3.2 3.2a2.53 2.53 0 0 0 4.3-1.77 2.51 2.51 0 0 0-.73-1.78l-3.21-3.21z"
                    fill="url(#caseBattles)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="caseBattles"
                      x1="26.37"
                      x2="26.37"
                      y1="16.78"
                      y2="36.6"
                      gradientTransform="translate(-16.45 -16.78)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#87C1F2"></stop>
                      <stop offset="1" stopColor="#3A8DDA"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <h4 className="mb-0">Case Battles</h4>
                <svg
                  viewBox="0 0 13.5 11.05"
                  xmlns="http://www.w3.org/2000/svg"
                  width={17}
                >
                  <path
                    d="M7.98 0a.75.75 0 0 0-.53 1.28l3.49 3.5H.75a.75.75 0 0 0 0 1.5h10.19l-3.5 3.49a.75.75 0 1 0 1.07 1.06l4.77-4.78c.3-.29.3-.76 0-1.06L8.51.22A.75.75 0 0 0 7.98 0z"
                    fill="url(#arrow)"
                  ></path>
                  <defs>
                    <linearGradient
                      id="arrow"
                      x1="7"
                      x2="7"
                      y1="6.5"
                      y2="7.5"
                      gradientTransform="translate(-.25 -9.8)"
                      gradientUnits="userSpaceOnUse"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <stop stopColor="#87C1F2"></stop>
                      <stop offset="1" stopColor="#3A8DDA"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <h6 className="text-muted font-weight-normal">
                Try our new case battles and challenge others across multiple
                modalities with various cases.
              </h6>
            </div>
            <div className="item-center mt-8 flex flex flex-wrap gap-3">
              <div className="mini-card gap-2">
                <svg
                  viewBox="0 0 23.44 23.44"
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                >
                  <path
                    d="M.69 0A.69.69 0 0 0 0 .69v5.69a.68.68 0 0 0 .25.53l5.43 4.44L7.8 8.76 3.3 4.28a.69.69 0 1 1 .98-.98l4.39 4.4 2.16-2.65L6.91.25A.68.68 0 0 0 6.38 0H.68zm16.37 0a.7.7 0 0 0-.53.25L5.57 13.66l-.81-.8a.69.69 0 0 0-.94.02.69.69 0 0 0-.03.94l5.83 5.83a.67.67 0 0 0 .48.2.69.69 0 0 0 .48-1.17l-.8-.8L23.18 6.9a.68.68 0 0 0 .26-.53V.68a.68.68 0 0 0-.69-.68h-5.7zm2.58 3.13a.7.7 0 0 1 .67.67c0 .17-.06.34-.18.48L8.16 16.25l-.97-.97L19.16 3.3c.13-.11.3-.18.48-.17zm-.47 9.52a.69.69 0 0 0-.49.2l-.8.81-.32-.38-1.82 1.49.51.5-.97.98-.6-.6-1.88 1.52.86.7-.8.81a.69.69 0 0 0 .96.97l5.83-5.83a.69.69 0 0 0 .2-.48.68.68 0 0 0-.68-.69zM3.95 15.93l-3.21 3.2A2.52 2.52 0 0 0 4.3 22.7l3.21-3.21-3.56-3.56zm15.54 0-3.56 3.56 3.2 3.2a2.53 2.53 0 0 0 4.3-1.77 2.51 2.51 0 0 0-.73-1.78l-3.21-3.21z"
                    fill="#ED2B4E"
                  ></path>
                </svg>
                <div>
                  <span style={{ fontSize: "13px" }}>Regular</span>
                </div>
              </div>
              <div className="mini-card gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 16"
                  width={15}
                >
                  <g clipPath="url(#group)">
                    <path
                      fill="#85F074"
                      d="M.67 11.67h1.7c.47 0 .85-.41.85-.92V4.36H.67v7.3Zm1.27-1.83c.23 0 .43.2.43.46 0 .25-.2.46-.43.46-.23 0-.42-.21-.42-.46s.19-.46.42-.46Zm8-7.32a.82.82 0 0 0-.58.24L6.75 5.33l-.01.01a1.2 1.2 0 0 0-.06 1.6c.34.38 1.05.5 1.5.08l2.13-2.1a.4.4 0 0 1 .6.04.48.48 0 0 1-.03.64l-.7.68 3.87 3.38c.08.07.15.14.21.22V4.33a5.6 5.6 0 0 0-4.1-1.83l-.23.02Zm-.39 4.39-.8.78c-.78.78-2 .7-2.7-.12a2.17 2.17 0 0 1 .12-2.9l2.17-2.15h-.17c-1.54 0-3.01.66-4.1 1.83v6.4h.48l2.4 2.34c.73.64 1.8.52 2.4-.27l.48.44a.96.96 0 0 0 1.39-.15l.83-1.1.14.12c.37.32.9.26 1.2-.13l.25-.34a.96.96 0 0 0-.12-1.29L9.55 6.92Zm5.57-2.55v6.4c0 .5.38.91.82.91h1.73V4.36h-2.55Zm1.27 6.4c-.23 0-.42-.21-.42-.46 0-.26.19-.46.42-.46.23 0 .43.2.43.46 0 .25-.2.46-.43.46Z"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="group">
                      <path fill="#fff" d="M.67 0h17v16h-17z"></path>
                    </clipPath>
                  </defs>
                </svg>
                <div>
                  <span style={{ fontSize: "13px" }}>Team</span>
                </div>
              </div>
              <div className="mini-card gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 16"
                  width={13}
                >
                  <g clipPath="url(#team)">
                    <path
                      fill="#A586E3"
                      d="M2.1 9.08H10c.62 0 1.13.47 1.19 1.08V11.85c0 2.78-2.94 3.57-5.14 3.57-2.16 0-5.02-.76-5.15-3.38v-1.77c0-.62.47-1.12 1.07-1.18h.12Zm9.49 0h3.97c.61 0 1.12.47 1.18 1.08v1.3c0 2.42-2.26 3.16-3.96 3.16-.57 0-1.14-.08-1.69-.25.52-.6.85-1.35.9-2.3v-1.8c0-.4-.12-.75-.31-1.06l-.1-.13ZM6.06.38a3.56 3.56 0 1 1 0 7.12 3.56 3.56 0 0 1 0-7.13Zm7.12 1.58a2.77 2.77 0 1 1 0 5.54 2.77 2.77 0 0 1 0-5.54Z"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="team">
                      <path fill="#fff" d="M.67 0h17v16h-17z"></path>
                    </clipPath>
                  </defs>
                </svg>
                <div>
                  <span style={{ fontSize: "13px" }}>Group</span>
                </div>
              </div>
              <div className=" item-center flex">
                <svg
                  viewBox="0 0 10.53 2.32"
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                >
                  <path
                    d="M1.15 2.32A1.13 1.13 0 0 1 0 1.16C0 .81.11.53.34.32.56.11.84 0 1.14 0A1.13 1.13 0 0 1 2.3 1.16a1.13 1.13 0 0 1-1.15 1.16Zm4.12 0a1.13 1.13 0 0 1-1.15-1.16c0-.35.11-.63.33-.84.23-.21.5-.32.82-.32A1.13 1.13 0 0 1 6.4 1.16c0 .34-.1.62-.33.84-.23.22-.5.32-.81.32zm4.11 0a1.13 1.13 0 0 1-1.14-1.16c0-.35.1-.63.33-.84.23-.21.5-.32.81-.32a1.13 1.13 0 0 1 1.15 1.16c0 .34-.11.62-.33.84-.23.22-.5.32-.82.32z"
                    fill="rgba(232, 229, 255, 0.5)"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-card grod-cols-1 mt-4 mt-5 grid gap-4 md:grid-cols-2 md:gap-4">
        <div className="">
          <div className="flex gap-2  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 25"
              fill="none"
              width={24}
            >
              <g clipPath="url(#clip0_7900_32186)">
                <mask
                  id="mask0_7900_32186"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="25"
                  height="25"
                >
                  <path
                    d="M24.2499 24.25V0.750072H0.75V24.25H24.2499Z"
                    fill="white"
                  ></path>
                  <path
                    d="M24.2499 24.25V0.750072H0.75V24.25H24.2499Z"
                    stroke="white"
                    strokeWidth="1.5"
                  ></path>
                </mask>
                <g mask="url(#mask0_7900_32186)">
                  <path
                    d="M12.5 0.976629L2.92969 4.95011V9.78041C2.92969 16.0316 6.71234 21.6611 12.5 24.0234C18.2876 21.6611 22.0703 16.0316 22.0703 9.78041V4.95011L12.5 0.976629Z"
                    fill="url(#paint0_linear_7900_32186)"
                    fillOpacity="0.1"
                  ></path>
                  <path
                    d="M12.5 0.976629L2.92969 4.95011V9.78041C2.92969 16.0316 6.71234 21.6611 12.5 24.0234C18.2876 21.6611 22.0703 16.0316 22.0703 9.78041V4.95011L12.5 0.976629Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12.5 0.976629L2.92969 4.95011V9.78041C2.92969 16.0316 6.71234 21.6611 12.5 24.0234C18.2876 21.6611 22.0703 16.0316 22.0703 9.78041V4.95011L12.5 0.976629Z"
                    stroke="url(#paint1_linear_7900_32186)"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M8.69141 11.7239L11.4206 14.4531L16.3086 9.5652"
                    fill="url(#paint2_linear_7900_32186)"
                    fillOpacity="0.1"
                  ></path>
                  <path
                    d="M8.69141 11.7239L11.4206 14.4531L16.3086 9.5652"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M8.69141 11.7239L11.4206 14.4531L16.3086 9.5652"
                    stroke="url(#paint3_linear_7900_32186)"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_7900_32186"
                  x1="12.5"
                  y1="24.0234"
                  x2="12.5"
                  y2="0.976629"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#87C1F2"></stop>
                  <stop offset="1" stopColor="#3A8DDA"></stop>
                </linearGradient>
                <linearGradient
                  id="paint1_linear_7900_32186"
                  x1="12.5"
                  y1="24.0234"
                  x2="12.5"
                  y2="0.976629"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#87C1F2"></stop>
                  <stop offset="1" stopColor="#3A8DDA"></stop>
                </linearGradient>
                <linearGradient
                  id="paint2_linear_7900_32186"
                  x1="12.5"
                  y1="14.4531"
                  x2="12.5"
                  y2="9.5652"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#87C1F2"></stop>
                  <stop offset="1" stopColor="#3A8DDA"></stop>
                </linearGradient>
                <linearGradient
                  id="paint3_linear_7900_32186"
                  x1="12.5"
                  y1="14.4531"
                  x2="12.5"
                  y2="9.5652"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#87C1F2"></stop>
                  <stop offset="1" stopColor="#3A8DDA"></stop>
                </linearGradient>
                <clipPath id="clip0_7900_32186">
                  <rect width="25" height="25" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <h5>Preferred Payment Methods</h5>
          </div>

          <div className="row">
            <div className="col-8 col-sm-12 col-xl-8 my-2">
              <h6 className="text-muted font-weight-normal">
                We offer a wide range of payment methods. Crypto is faster, but
                you can also choose Bank Transfers, Gift cards, and many more
                options.
              </h6>
            </div>
          </div>

          <div className="col-4 col-sm-12 col-xl-4 text-xl-right text-center">
            <i className="icon-lg mdi mdi-codepen ml-auto text-primary"></i>
          </div>
        </div>
        <div className="item-center flex md:ml-10 xl:ml-30">
          <div className="flex gap-2" style={{ alignItems: "center" }}>
            <div className="item-center flex">
              <Image
                src="/images/project/pay1.png"
                alt="payment"
                layout="responsive"
                width={30}
                height={20}
                style={{ width: "100%", maxHeight: "30px" }}
              ></Image>
            </div>
            <div>
              <span style={{ display: "block" }}>&amp;&nbsp;more</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="payment-gap"></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 43 43"
                width={30}
                height={30}
              >
                <g fill="#32BCAD" filter="url(#pix)">
                  <path d="M29.207 28.523a3.869 3.869 0 0 1-2.752-1.14l-3.974-3.974a.756.756 0 0 0-1.045 0l-3.988 3.989a3.869 3.869 0 0 1-2.753 1.14h-.783l5.034 5.033a4.025 4.025 0 0 0 5.692 0l5.048-5.048h-.479ZM14.695 14.462c1.04 0 2.017.405 2.753 1.14l3.988 3.99a.739.739 0 0 0 1.045 0l3.974-3.975a3.868 3.868 0 0 1 2.752-1.14h.479l-5.048-5.048a4.025 4.025 0 0 0-5.693 0l-5.033 5.033h.783Z"></path>
                  <path d="m33.859 18.654-3.05-3.05a.581.581 0 0 1-.217.044h-1.387c-.717 0-1.419.29-1.926.797l-3.974 3.975c-.372.372-.86.558-1.349.558-.488 0-.977-.186-1.348-.558l-3.99-3.989a2.74 2.74 0 0 0-1.925-.798h-1.705a.578.578 0 0 1-.205-.041L9.72 18.654a4.025 4.025 0 0 0 0 5.693l3.063 3.063a.579.579 0 0 1 .205-.042h1.705a2.74 2.74 0 0 0 1.926-.797l3.988-3.99c.721-.72 1.978-.72 2.698.001l3.974 3.974a2.741 2.741 0 0 0 1.926.798h1.387a.58.58 0 0 1 .217.044l3.05-3.05a4.025 4.025 0 0 0 0-5.694Z"></path>
                </g>
                <defs>
                  <filter
                    id="pix"
                    width="41.64"
                    height="41.642"
                    x=".97"
                    y=".679"
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                  >
                    <feFlood
                      floodOpacity="0"
                      result="BackgroundImageFix"
                    ></feFlood>
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    ></feColorMatrix>
                    <feOffset></feOffset>
                    <feGaussianBlur stdDeviation="3.786"></feGaussianBlur>
                    <feComposite in2="hardAlpha" operator="out"></feComposite>
                    <feColorMatrix values="0 0 0 0 0.196078 0 0 0 0 0.737255 0 0 0 0 0.678431 0 0 0 0.5 0"></feColorMatrix>
                    <feBlend
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_7900_32207"
                    ></feBlend>
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_7900_32207"
                      result="shape"
                    ></feBlend>
                  </filter>
                </defs>
              </svg>
            </div>{" "}
            <Image
              src="/images/project/pay2.png"
              alt="payment"
              layout="responsive"
              width={30}
              height={30}
              style={{ width: "100%", maxHeight: "30px" }}
            ></Image>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="payment-gap"></div>
          </div>
          <div
            className="gap-3"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 43 23"
                width={30}
                height={30}
              >
                <rect
                  width="41.35"
                  height="21"
                  x="1.04"
                  y="1"
                  stroke="#fff"
                  strokeOpacity=".2"
                  rx="4.5"
                ></rect>
                <rect
                  width="40.35"
                  height="20"
                  x="1.54"
                  y="1.5"
                  fill="#00579F"
                  rx="2.51"
                ></rect>
                <g fill="#fff" clipPath="url(#visa)">
                  <path d="M20.28 14.74h-1.73l1.08-6.46h1.74l-1.09 6.46ZM26.57 8.44A4.42 4.42 0 0 0 25 8.17c-1.7 0-2.91.87-2.92 2.13-.02.93.86 1.44 1.52 1.75.67.32.9.52.9.8-.01.44-.54.64-1.04.64-.7 0-1.07-.1-1.63-.35l-.23-.1-.24 1.45c.4.18 1.15.34 1.93.34 1.82 0 3-.86 3.02-2.2 0-.74-.46-1.3-1.46-1.76-.6-.3-.97-.5-.97-.8 0-.27.31-.55 1-.55.56-.02.97.12 1.29.25l.15.06.24-1.39ZM28.87 12.45l.7-1.8.22-.62.12.55.4 1.87h-1.44Zm2.14-4.17h-1.34c-.41 0-.73.12-.9.54l-2.58 5.92h1.82l.36-.97h2.23l.2.97h1.61l-1.4-6.46ZM17.1 8.28l-1.7 4.4-.18-.89a5 5 0 0 0-2.4-2.7l1.56 5.64h1.83l2.73-6.45H17.1Z"></path>
                  <path d="M13.83 8.28h-2.8l-.02.13c2.17.54 3.62 1.83 4.2 3.38l-.6-2.96c-.1-.42-.4-.53-.78-.55Z"></path>
                </g>
                <defs>
                  <clipPath id="visa">
                    <path fill="#fff" d="M11.01 8.17h21.4v6.67h-21.4z"></path>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 43 23"
                width={30}
                height={30}
              >
                <rect
                  width="41.35"
                  height="21"
                  x=".74"
                  y="1"
                  stroke="#fff"
                  strokeOpacity=".2"
                  rx="4.5"
                ></rect>
                <rect
                  width="40.35"
                  height="20"
                  x="1.24"
                  y="1.5"
                  fill="#fff"
                  rx="2.51"
                ></rect>
                <g clipPath="url(#master)">
                  <path
                    fill="#FF5A00"
                    d="M24.05 6.9h-4.93v8.76h4.93V6.9Z"
                  ></path>
                  <path
                    fill="#EB001B"
                    d="M19.44 11.28c0-1.78.85-3.36 2.15-4.38a5.66 5.66 0 0 0-9.12 4.38 5.66 5.66 0 0 0 9.12 4.38c-1.3-1-2.15-2.6-2.15-4.38Z"
                  ></path>
                  <path
                    fill="#F79E1B"
                    d="M30.71 11.28a5.66 5.66 0 0 1-9.12 4.38 5.52 5.52 0 0 0 0-8.76 5.65 5.65 0 0 1 9.12 4.38Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="master">
                    <path fill="#fff" d="M12.47 5.71h18.25v11.23H12.47z"></path>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex gap-3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 43 23"
                  width={30}
                  height={30}
                >
                  <rect
                    width="41.35"
                    height="20.65"
                    x="1.15"
                    y="1"
                    stroke="#fff"
                    strokeOpacity=".2"
                    rx="4.5"
                  ></rect>
                  <rect
                    width="40.35"
                    height="19.65"
                    x="1.65"
                    y="1.5"
                    fill="#0F0F0F"
                    rx="2.51"
                  ></rect>
                  <path
                    fill="#fff"
                    d="M20.65 7.64c1.3 0 2.22.9 2.22 2.22 0 1.32-.93 2.23-2.26 2.23h-1.45v2.31h-1.05V7.64h2.54Zm-1.49 3.57h1.2c.92 0 1.44-.49 1.44-1.34 0-.85-.52-1.34-1.43-1.34h-1.2v2.68Zm3.99 1.8c0-.87.66-1.4 1.83-1.46l1.35-.08v-.38c0-.55-.37-.88-1-.88-.58 0-.94.28-1.03.72h-.96c.06-.89.82-1.54 2.04-1.54 1.2 0 1.95.63 1.95 1.62v3.4h-.97v-.82h-.02c-.28.55-.9.9-1.55.9-.97 0-1.64-.6-1.64-1.49Zm3.18-.45v-.4l-1.22.08c-.6.05-.94.31-.94.73 0 .44.35.72.9.72.7 0 1.26-.5 1.26-1.13Zm1.92 3.66v-.82l.33.01c.47 0 .72-.2.88-.7l.08-.3-1.78-4.94h1.1l1.25 4.01h.02l1.24-4h1.07l-1.85 5.18c-.42 1.2-.9 1.58-1.93 1.58l-.4-.02ZM15.02 8.3c.25-.31.42-.74.38-1.17a1.63 1.63 0 0 0-1.48 1.69c.42.03.83-.21 1.1-.52Zm.37.6c-.6-.04-1.12.34-1.4.34-.3 0-.73-.32-1.21-.31-.62 0-1.2.36-1.51.91-.65 1.12-.18 2.78.45 3.69.31.45.68.95 1.17.93.46-.02.64-.3 1.2-.3.55 0 .72.3 1.2.29.5 0 .82-.45 1.13-.9.35-.51.5-1.01.5-1.04 0 0-.97-.38-.98-1.49 0-.92.76-1.36.8-1.4a1.73 1.73 0 0 0-1.35-.72Z"
                  ></path>
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 44 23"
                  width={30}
                  height={30}
                >
                  <rect
                    width="41.35"
                    height="20.65"
                    x="1.45"
                    y="1"
                    stroke="#fff"
                    strokeOpacity=".2"
                    rx="4.5"
                  ></rect>
                  <rect
                    width="40.35"
                    height="19.65"
                    x="1.95"
                    y="1.5"
                    fill="#F7F7F7"
                    rx="2.51"
                  ></rect>
                  <path
                    fill="#5C6065"
                    d="M22.14 11.48V14h-.8V7.76h2.13c.54 0 1 .18 1.38.54.39.36.58.8.58 1.31 0 .54-.2.97-.58 1.33-.37.36-.83.53-1.38.53h-1.33Zm0-2.95v2.18h1.35c.32 0 .59-.11.8-.33a1.05 1.05 0 0 0 0-1.52 1.05 1.05 0 0 0-.8-.33h-1.35Zm5.4 1.06a2 2 0 0 1 1.4.48c.35.31.52.75.52 1.3v2.64h-.76v-.6h-.04c-.33.5-.77.74-1.33.74-.47 0-.87-.14-1.19-.42a1.33 1.33 0 0 1-.47-1.05c0-.44.16-.8.5-1.05.34-.27.78-.4 1.34-.4.48 0 .88.1 1.18.27v-.19c0-.28-.1-.51-.33-.7-.22-.2-.48-.3-.78-.3-.45 0-.8.19-1.07.57l-.7-.45c.39-.56.96-.84 1.73-.84Zm-1.04 3.1c0 .21.09.39.27.53.17.14.38.2.62.2.34 0 .64-.12.9-.37.27-.25.4-.54.4-.88-.25-.2-.6-.3-1.04-.3-.33 0-.6.08-.82.23-.22.17-.33.36-.33.6Zm7.34-2.96-2.68 6.16h-.83l1-2.16-1.77-4h.87l1.28 3.07h.02l1.24-3.07h.87Z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M18.47 10.89c0-.32-.03-.62-.08-.9h-4.03v1.65h2.32c-.1.55-.4 1.01-.86 1.33v1.07h1.38a4.2 4.2 0 0 0 1.27-3.15Z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M15.82 12.97c-.39.26-.88.4-1.46.4a2.56 2.56 0 0 1-2.4-1.76h-1.43v1.1a4.29 4.29 0 0 0 3.83 2.36c1.16 0 2.13-.38 2.84-1.03l-1.38-1.07Z"
                  ></path>
                  <path
                    fill="#FABB05"
                    d="M11.82 10.79c0-.29.05-.56.13-.82v-1.1h-1.42a4.26 4.26 0 0 0 0 3.84l1.42-1.1a2.58 2.58 0 0 1-.13-.82Z"
                  ></path>
                  <path
                    fill="#E94235"
                    d="M14.36 8.2c.63 0 1.2.22 1.64.64l1.23-1.22a4.29 4.29 0 0 0-6.7 1.24l1.42 1.11a2.56 2.56 0 0 1 2.4-1.77Z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div> */}
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
          Recommended
        </h3>

        <div className="mt-3 flex grid grid-cols-2 gap-2  md:grid-cols-4 xl:grid-cols-7  2xl:grid-cols-8 ">
          <div
            style={{
              position: "relative",
              height: "100%",
              width: "150px",
            }}
          >
            <Link href={`/casino?gameurl= ${encodeURIComponent(gameurl)}`}>
              <Image
                src="/images/project/mini/1.png"
                alt="Project Thumbnail"
                layout="responsive"
                width={800}
                height={450}
                style={{ width: "100%" }}
              />
            </Link>
          </div>

          <a>
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "150px",
              }}
            >
              <Image
                src="/images/project/mini/2.png"
                alt="Project Thumbnail"
                layout="responsive"
                width={800}
                height={450}
                style={{ width: "90%" }}
              />
            </div>
          </a>
          <a>
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "150px",
              }}
            >
              <Image
                src="/images/project/mini/3.png"
                alt="Project Thumbnail"
                layout="responsive"
                width={800}
                height={450}
                style={{ width: "90%" }}
              />
            </div>
          </a>
          <a>
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "150px",
              }}
            >
              <Image
                src="/images/project/mini/4.png"
                alt="Project Thumbnail"
                layout="responsive"
                width={800}
                height={450}
                style={{ width: "90%" }}
              />
            </div>
          </a>
          <a>
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "150px",
              }}
            >
              <Image
                src="/images/project/mini/1.png"
                alt="Project Thumbnail"
                layout="responsive"
                width={800}
                height={450}
                style={{ width: "90%" }}
              />
            </div>
          </a>
          <a>
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "150px",
              }}
            >
              <Image
                src="/images/project/mini/1.png" // Path relative to the public directory
                alt="Project Thumbnail"
                layout="responsive" // Ensures the image scales based on its container
                width={800} // Set the width based on aspect ratio
                height={450} // Set the height based on aspect ratio
                style={{ width: "90%" }} // Apply inline styles if needed
              />
            </div>
          </a>
          <a>
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "150px",
              }}
            >
              <Image
                src="/images/project/mini/2.png"
                alt="Project Thumbnail"
                layout="responsive"
                width={800}
                height={450}
                style={{ width: "90%" }}
              />
            </div>
          </a>
          <a>
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "150px",
              }}
            >
              <Image
                src="/images/project/mini/3.png"
                alt="Project Thumbnail"
                layout="responsive"
                width={800}
                height={450}
                style={{ width: "90%" }}
              />
            </div>
          </a>
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
          Original
        </h3>

        <div className="mt-3 flex grid grid-cols-3 gap-3 gap-4 md:grid-cols-5 md:gap-6 xl:grid-cols-6 xl:gap-4 2xl:grid-cols-8 2xl:gap-7.5">
          <a>
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "150px",
              }}
            >
              <Image
                src="/images/project/mini/1.png"
                alt="Project Thumbnail"
                layout="responsive"
                width={800}
                height={450}
                style={{ width: "90%" }}
              />
            </div>
          </a>
          <a>
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "150px",
              }}
            >
              <Image
                src="/images/project/mini/2.png"
                alt="Project Thumbnail"
                layout="responsive"
                width={800}
                height={450}
                style={{ width: "90%" }}
              />
            </div>
          </a>
          <a>
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "150px",
              }}
            >
              <Image
                src="/images/project/mini/3.png"
                alt="Project Thumbnail"
                layout="responsive"
                width={800}
                height={450}
                style={{ width: "90%" }}
              />
            </div>
          </a>
          <a>
            <div
              style={{
                position: "relative",
                height: "100%",
                width: "150px",
              }}
            >
              <Image
                src="/images/project/mini/4.png"
                alt="Project Thumbnail"
                layout="responsive"
                width={800}
                height={450}
                style={{ width: "90%" }}
              />
            </div>
          </a>
        </div>
      </div>
      <div className="mt-10">
        <h4 style={{ marginBottom: "15px", color: "white", fontSize: "20px" }}>
          Provider
        </h4>
        <div className="mt-3 flex grid grid-cols-3 gap-3 gap-4 md:grid-cols-5 md:gap-6 xl:grid-cols-6 xl:gap-4 2xl:grid-cols-8 2xl:gap-7.5">
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
