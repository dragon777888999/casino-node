import Image from "next/image";
import { InfoList } from "@/types/gameListInfo";

const gameData: InfoList[] = [
  {
    name: "Apple Watch Series 7",
    user: "Electronics",
    amount: 296,
    multiplier: 22,
    payout: 45,
    imgUrl: "/images/project/recommend.png",
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
    imgUrl: "/images/project/recommend.png",
  },
  {
    name: "HP Probook 450",
    user: "Electronics",
    amount: 499,
    multiplier: 72,
    payout: 103,
    imgUrl: "/images/project/original.png",
  },
];

const TableAll = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
      <div className="flex grid grid-cols-6 justify-around border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
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
        <div className="col-span-3 flex items-center justify-end md:col-span-2 ">
          <p className="font-medium">Payout</p>
        </div>
      </div>

      {gameData.map((product, key) => (
        <div
          className="sm:justify-betwween flex grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={product.image}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div> */}
              <Image
                src={product.imgUrl}
                alt="Project Thumbnail"
                width={28}
                height={18}
              />
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
          <div className="col-span-3 flex items-center justify-end md:col-span-2">
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
