// @/components/Layout/Sidebar.js
import React from "react";
import Link from "next/link";
import { useAppContext } from "@/hooks/AppContext";
import Image from "next/image"; // Use Image component from Next.js for optimized images

// import logo from "@/img/logo.svg";

export default function Chatbar() {
  // Define our base class
  const { chatbarOpen, setChatbarOpen } = useAppContext();
  const className =
    "bg-black w-[360px] transition-[margin-right] ease-in-out p-5 mt-15 duration-500 fixed top-0 bottom-0 right-0 z-40 md:w-[360px] ";
  // Append class based on state of sidebar visibility
  const appendClass = chatbarOpen ? " mr-0" : " mr-[-360px] ";
  const messages = [
    {
      id: 1,
      user: "test0",
      amount: 7.5,
      currency: "USD",
      recipient: "juicybuicey",
    },
    { id: 2, user: "Ryxn", amount: 33.07, currency: "USD", recipient: "che" },
    {
      id: 3,
      user: "Ryxn",
      amount: 44.11,
      currency: "USD",
      recipient: "38abdul",
    },
    { id: 4, user: "krjdijr", message: "yooo conway" },
    { id: 5, user: "risktje", message: "u running t up tonight" },
    { id: 6, user: "wewewe", message: "@ryxn W mans" },
  ];
  // Clickable menu items

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-30 flex bg-black/50 md:hidden`}
      // onClick={() => setChatbarOpen((oldVal) => !oldVal)}
    />
  );

  return (
    <div className="">
      <div className={`${className}${appendClass}`}>
        {/* <div className="flex p-2">
          <Link href="/">
            <h1>THIS</h1>
          </Link>
        </div> */}
        <div className="flex flex-col">
          <div className="flex flex-col space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-lg p-3 ${msg.amount ? "flex items-center justify-between border border-yellow-500 bg-yellow-500/10" : "bg-gray-800"}`}
              >
                {msg.amount ? (
                  <div className="flex w-full justify-between">
                    <div className="flex space-x-2">
                      <span className="font-semibold ">{msg.user}</span>
                      <span>sent</span>
                      <span className="font-semibold text-yellow-500">
                        {msg.currency} {msg.amount.toFixed(2)}
                      </span>
                      <span>to {msg.recipient}</span>
                    </div>
                    <div>
                      <img
                        src="path/to/icon.png"
                        alt="icon"
                        className="h-5 w-5"
                      />
                    </div>
                  </div>
                ) : (
                  <p>
                    <span className="font-semibold">{msg.user} : </span>
                    {msg.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Add your menu items here */}
          {/* <MenuItem icon={<SlHome />} name="Home" route="/" /> */}
          {/* Example usage of MenuItem */}
        </div>
        <div className="fixed bottom-5 mt-4 flex min-w-[300px] items-center">
          <input
            type="text"
            placeholder="Send a message..."
            className="bg-gray-800 flex-grow rounded-md p-2 text-white outline-none"
          />
          <button className="ml-2 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clip-path="url(#clip0_12315_44210)">
                <path
                  d="M18.4162 8.80248L2.29287 0.936641C2.13792 0.861136 1.96631 0.826297 1.79419 0.835403C1.62207 0.84451 1.4551 0.897263 1.30899 0.988697C1.16288 1.08013 1.04243 1.20724 0.958995 1.35806C0.875556 1.50888 0.831864 1.67845 0.832032 1.85081V1.87997C0.832114 2.01623 0.848906 2.15197 0.882032 2.28414L2.4287 8.47081C2.44943 8.55322 2.49487 8.62733 2.55892 8.68319C2.62297 8.73904 2.70256 8.77398 2.78703 8.78331L9.58453 9.53914C9.69763 9.55274 9.80183 9.60732 9.87741 9.69254C9.953 9.77776 9.99474 9.88773 9.99474 10.0016C9.99474 10.1156 9.953 10.2255 9.87741 10.3107C9.80183 10.396 9.69763 10.4505 9.58453 10.4641L2.78703 11.22C2.70256 11.2293 2.62297 11.2642 2.55892 11.3201C2.49487 11.376 2.44943 11.4501 2.4287 11.5325L0.882032 17.7183C0.848906 17.8505 0.832114 17.9862 0.832032 18.1225V18.1516C0.832005 18.3239 0.8758 18.4934 0.959298 18.6441C1.0428 18.7948 1.16325 18.9218 1.30934 19.0131C1.45543 19.1045 1.62235 19.1572 1.7944 19.1662C1.96645 19.1753 2.13799 19.1405 2.29287 19.065L18.4154 11.1991C18.6399 11.0896 18.8291 10.9192 18.9615 10.7073C19.0939 10.4954 19.1641 10.2506 19.1641 10.0008C19.1641 9.75098 19.0939 9.50618 18.9615 9.29431C18.8291 9.08243 18.6407 8.91201 18.4162 8.80248Z"
                  fill="white"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_12315_44210">
                  <rect width="20" height="20" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      {chatbarOpen && <ModalOverlay />}
    </div>
  );
}
