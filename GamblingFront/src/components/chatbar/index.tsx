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
    "bg-black w-[360px] transition-[margin-right] ease-in-out p-5 mt-13 duration-500 fixed top-0 bottom-0 right-0 z-40 md:w-[360px] height: calc(100vh - 60px)";
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
    { id: 7, user: "Ryxn", amount: 33.07, currency: "USD", recipient: "che" },
    {
      id: 8,
      user: "Ryxn",
      amount: 44.11,
      currency: "USD",
      recipient: "38abdul",
    },
    { id: 9, user: "krjdijr", message: "yooo conway" },
    { id: 10, user: "risktje", message: "u running t up tonight" },
    { id: 11, user: "wewewe", message: "@ryxn W mans" },
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
      {/* <div className={`${className}${appendClass}`}> */}
      <div
        className={`chat-container${appendClass} flex flex-col justify-between`}
      >
        {/* <div className="flex p-2">
          <Link href="/">
            <h1>THIS</h1>
          </Link>
        </div> */}

        <div className="chat-display flex flex-col">
          {/* <div className="flex flex-col space-y-4"> */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={` chat-message-row ${msg.amount ? "" : ""}`}
            >
              {msg.amount ? (
                <div className="chat-inform-container">
                  <div className="chat-inform-inner flex w-full justify-between">
                    <div className="chat-inform-icon">
                      <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 68.25 59.14"
                      >
                        <g>
                          <g stroke-width="0">
                            <path
                              fill="#fe9923"
                              fill-rule="evenodd"
                              d="M17.59 39.69c0-5.59 11.34-10.13 25.33-10.13s25.33 4.54 25.33 10.13V49c0 5.59-11.34 10.13-25.33 10.13S17.59 54.59 17.59 49v-9.31z"
                            ></path>
                            <path
                              fill="#fecd3d"
                              fill-rule="evenodd"
                              d="M42.92 29.56c13.99 0 25.33 4.54 25.33 10.13S56.91 49.82 42.92 49.82s-25.33-4.53-25.33-10.13c0-5.59 11.34-10.13 25.33-10.13z"
                            ></path>
                            <path
                              fill="#ffb300"
                              fill-rule="evenodd"
                              d="M42.92 34.3c11.13 0 20.15 2.42 20.15 5.4s-9.02 5.4-20.15 5.4-20.15-2.41-20.15-5.4 9.02-5.4 20.15-5.4z"
                            ></path>
                            <path
                              fill="#c85929"
                              d="M30.1 53.47h2.16v4.72c-.72-.13-1.45-.28-2.16-.45v-4.27zm31.3-2.5v4.96c.78-.34 1.5-.69 2.17-1.06v-3.9H61.4zm-23.48 7.96c.71.06 1.44.1 2.17.14v-4.51h-2.17v4.37zm-15.65-4.06c.66.37 1.39.72 2.17 1.06v-4.96h-2.17v3.9zm23.48 4.2c.72-.03 1.44-.08 2.16-.14v-4.37h-2.16v4.5zm7.82-.88c.72-.13 1.45-.28 2.16-.45v-4.26h-2.16v4.72z"
                            ></path>
                            <path
                              fill="#ffb300"
                              d="M7.44 50.95v3.02h2.68v2.15H7.44v3.02H5.52v-3.02H2.83v-2.15h2.69v-3.02h1.92zm49.11-33.04v3.02h2.69v2.15h-2.69v3.02h-1.92v-3.02h-2.68v-2.15h2.68v-3.02h1.92zM8.73 0v3.02h2.68v2.15H8.73v3.02H6.81V5.17H4.12V3.02h2.69V0h1.92z"
                            ></path>
                            <path
                              fill="#fe9923"
                              fill-rule="evenodd"
                              d="M.46 34.43c-2.49-4.85 5.31-15.14 17.42-22.99C30 3.59 41.84 1.16 44.34 6c1.38 2.69 2.76 5.37 4.15 8.06 2.49 4.85-5.31 15.14-17.42 22.99C18.95 44.9 7.11 47.34 4.62 42.49 3.24 39.8 1.85 37.12.47 34.43z"
                            ></path>
                            <path
                              fill="#fecd3d"
                              fill-rule="evenodd"
                              d="M17.89 11.44C30 3.59 41.84 1.16 44.34 6c2.49 4.85-5.31 15.14-17.42 22.99C14.8 36.84 2.96 39.27.46 34.43c-2.49-4.85 5.31-15.14 17.42-22.99z"
                            ></path>
                            <path
                              fill="#ffb300"
                              fill-rule="evenodd"
                              d="M20 15.54c9.64-6.24 18.53-9.21 19.86-6.63 1.33 2.58-5.41 9.73-15.05 15.98-9.64 6.24-18.53 9.21-19.85 6.63-1.33-2.58 5.41-9.73 15.04-15.98z"
                            ></path>
                            <path
                              fill="#c85929"
                              d="M26.58 34.68l2.01 3.9c-.64.38-1.29.75-1.94 1.1L24.7 35.9l1.88-1.22zM9.55 41.57l1.74 3.37c.74-.05 1.52-.15 2.35-.3l-2.21-4.29-1.88 1.22zm7.89-2.23l1.9 3.7c.7-.26 1.39-.53 2.07-.82l-2.1-4.09-1.88 1.21zm14.04-7.84l2.01 3.9c.61-.43 1.22-.87 1.81-1.33l-1.95-3.78-1.88 1.21zm13.83-13.1l-1.88 1.22 2.21 4.29c.52-.72.99-1.44 1.4-2.13L45.3 18.4zm-7.54 7.77l2.1 4.09c.57-.52 1.13-1.05 1.67-1.6l-1.9-3.69-1.87 1.21z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="flex space-x-2">
                      <span className="font-semibold ">{msg.user}</span>
                      <span>sent</span>
                      <span className="font-semibold text-yellow-500">
                        {msg.currency} {msg.amount.toFixed(2)}
                      </span>
                      <span>to {msg.recipient}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="chat-normal-container">
                  <p>
                    <span className="font-semibold">{msg.user} : </span>
                    {msg.message}
                  </p>
                </div>
              )}
            </div>
          ))}
          {/* </div> */}

          {/* Add your menu items here */}
          {/* <MenuItem icon={<SlHome />} name="Home" route="/" /> */}
          {/* Example usage of MenuItem */}
        </div>
        {/* <div className="fixed bottom-5 mt-4 flex min-w-[300px] items-center"> */}
        <div className="chat-input-container">
          <form className="chat-form">
            <input
              type="text"
              placeholder="Send a message..."
              // className="bg-gray-800 flex-grow rounded-md p-2 text-white outline-none"
              className="chat-input"
            />
          </form>
          <div className="chat-message-item">
            <div className="chat-submit-area">
              <button
                className="ml-2 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clipPath="url(#clip0_12315_44210)">
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
        </div>
      </div>
      {chatbarOpen && <ModalOverlay />}
    </div>
  );
}
