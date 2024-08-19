import Image from "next/image";
import { InfoList } from "@/types/gameListInfo";
import { useEffect, useState } from "react";

const gameData: InfoList[] = [
  {
    name: "Apple Watch Series 7",
    user: "Electronics",
    amount: 296,
    multiplier: 22,
    payout: 45,
    imgUrl: "/images/project/original.png",
  },
  {
    name: "Macbook Pro M1",
    user: "Electronics",
    amount: 546,
    multiplier: 12,
    payout: 125,
    imgUrl: "/images/project/original.png",
  },
  {
    name: "Dell Inspiron 15",
    user: "Electronics",
    amount: 443,
    multiplier: 64,
    payout: 247,
    imgUrl: "/images/project/original.png",
  },
];

const TableAll = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Game Name</p>
        </div>
        <div className="col-span-1  hidden items-center md:flex">
          <p className="font-medium">User</p>
        </div>
        <div className="col-span-2 flex hidden items-center justify-center md:flex">
          <p className="font-medium">Bet Amount</p>
        </div>
        <div className="col-span-1 flex hidden items-center justify-center md:flex">
          <p className="font-medium">Multiplier</p>
        </div>
        <div className="col-span-2 flex items-center justify-end">
          <p className="font-medium">Payout</p>
        </div>
      </div>

      {gameData.map((product, key) => (
        <div
          className="flex grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 sm:justify-between md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center md:flex">
            <p className="text-sm text-black dark:text-white">{product.user}</p>
          </div>
          <div className="col-span-2 flex  hidden items-center justify-center gap-2 md:flex">
            <div className="">
              <Image
                src={"/images/project/aud.png"}
                width={20}
                height={20}
                alt="Product"
              />
            </div>
            <p className="text-sm text-black dark:text-white">
              {product.amount}
            </p>
          </div>
          <div className="col-span-1 flex flex hidden items-center justify-center md:flex">
            <p className=" text-sm text-black dark:text-white">
              {product.multiplier} X
            </p>
          </div>
          <div className="col-span-2 flex items-center justify-end">
            <div className="flex items-center justify-center gap-2">
              <div className="">
                <Image
                  src={"/images/project/aud.png"}
                  width={20}
                  height={20}
                  alt="Product"
                />
              </div>
              <div>
                <p className="text-sm " style={{ color: "#7DD934" }}>
                  {product.payout}
                </p>
              </div>

              {/* --------Add field up or down----------  */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="#7DD934"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#7DD934"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="27"
                  height="27"
                  rx="8.5"
                  fill="rgb(26 34 44)"
                  stroke="rgb(54 68 63)"
                ></rect>
                <path
                  d="M14.6667 18.6667V11.22L17.92 14.4733C18.18 14.7333 18.6067 14.7333 18.8667 14.4733C18.9285 14.4117 18.9775 14.3384 19.011 14.2578C19.0444 14.1771 19.0616 14.0906 19.0616 14.0033C19.0616 13.916 19.0444 13.8296 19.011 13.7489C18.9775 13.6683 18.9285 13.595 18.8667 13.5333L14.4733 9.14C14.4117 9.0782 14.3384 9.02917 14.2578 8.99571C14.1771 8.96226 14.0907 8.94504 14.0033 8.94504C13.916 8.94504 13.8296 8.96226 13.7489 8.99571C13.6683 9.02917 13.595 9.0782 13.5333 9.14L9.13334 13.5267C9.07162 13.5884 9.02266 13.6617 8.98926 13.7423C8.95585 13.8229 8.93866 13.9094 8.93866 13.9967C8.93866 14.084 8.95585 14.1704 8.98926 14.251C9.02266 14.3317 9.07162 14.4049 9.13334 14.4667C9.19506 14.5284 9.26833 14.5773 9.34898 14.6108C9.42962 14.6442 9.51605 14.6613 9.60334 14.6613C9.69063 14.6613 9.77706 14.6442 9.8577 14.6108C9.93835 14.5773 10.0116 14.5284 10.0733 14.4667L13.3333 11.22V18.6667C13.3333 19.0333 13.6333 19.3333 14 19.3333C14.3667 19.3333 14.6667 19.0333 14.6667 18.6667Z"
                  fill="#7DD934"
                ></path>
              </svg>
              {/* <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="#7179A5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="27"
                  height="27"
                  rx="8.5"
                  fill="rgb(26 34 44)"
                  stroke="rgb(54 68 63)"
                ></rect>
                <path
                  d="M14.6667 9.33333V16.78L17.92 13.5267C18.18 13.2667 18.6067 13.2667 18.8667 13.5267C18.9285 13.5883 18.9775 13.6616 19.011 13.7422C19.0444 13.8229 19.0616 13.9094 19.0616 13.9967C19.0616 14.084 19.0444 14.1704 19.011 14.2511C18.9775 14.3317 18.9285 14.405 18.8667 14.4667L14.4733 18.86C14.4117 18.9218 14.3384 18.9708 14.2578 19.0043C14.1771 19.0377 14.0907 19.055 14.0033 19.055C13.916 19.055 13.8296 19.0377 13.7489 19.0043C13.6683 18.9708 13.595 18.9218 13.5333 18.86L9.13334 14.4733C9.07162 14.4116 9.02266 14.3383 8.98926 14.2577C8.95585 14.1771 8.93866 14.0906 8.93866 14.0033C8.93866 13.916 8.95585 13.8296 8.98926 13.749C9.02266 13.6683 9.07162 13.5951 9.13334 13.5333C9.19506 13.4716 9.26833 13.4227 9.34898 13.3892C9.42962 13.3558 9.51605 13.3387 9.60334 13.3387C9.69063 13.3387 9.77706 13.3558 9.8577 13.3892C9.93835 13.4227 10.0116 13.4716 10.0733 13.5333L13.3333 16.78V9.33333C13.3333 8.96667 13.6333 8.66667 14 8.66667C14.3667 8.66667 14.6667 8.96667 14.6667 9.33333Z"
                  fill="#7179A5"
                ></path>
              </svg> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableAll;
