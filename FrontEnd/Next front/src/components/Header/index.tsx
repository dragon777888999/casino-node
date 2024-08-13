import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import DropdownWallet from "./DropdownWallet";
import Image from "next/image";
import { useState } from "react";
const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <header
        className="max-w-screen sticky top-0  z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none"
        style={{ borderBottom: "1px solid #49577b" }}
      >
        <div className="mx-auto flex w-full max-w-screen-2xl flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
          <div className="flex items-center gap-2 sm:gap-4 ">
            {/* <!-- Hamburger Toggle BTN --> */}
            <div className="flex hidden md:block">
              <Link href="/">
                <Image
                  width={176}
                  height={32}
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  priority
                />
              </Link>
            </div>

            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(props.sidebarOpen ? false : true);
              }}
              className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark "
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-300"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "delay-400 !w-full"
                    }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!w-full delay-500"
                    }`}
                  ></span>
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                      !props.sidebarOpen && "!h-0 !delay-200"
                    }`}
                  ></span>
                </span>
              </span>
            </button>
          </div>

          <div
            className="sm:block"
            style={{
              marginLeft: "10%",
            }}
          >
            <ul className="flex items-center gap-2 2xsm:gap-4">
              <li>
                <DropdownWallet />
              </li>
              <li>
                <button
                  className="inline-flex items-center justify-center rounded-md border border-meta-3 px-6 py-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={openModal}
                >
                  <p> Wallet</p>
                </button>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-3 2xsm:gap-7">
            <ul className="flex items-center gap-2 2xsm:gap-4"></ul>
            <ul className="flex items-center gap-2 2xsm:gap-4">
              {/* <li>
              <button
                href="#"
                className="inline-flex items-center justify-center rounded-md border border-meta-3 px-10 py-4 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                <p>Log in</p>
              </button>
            </li>
            <li>
              <button
                href="#"
                className="inline-flex items-center justify-center rounded-md border border-meta-3 px-10 py-4 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                <p> Register</p>
              </button>
            </li> */}
              <li>
                <button
                  onClick={() => setShowModal2(true)}
                  className="inline-flex items-center justify-center rounded-md border border-meta-3 px-6 py-2 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <p> Connect</p>
                </button>
              </li>
            </ul>
            {/* <!-- User Area --> */}
            {/* <DropdownUser /> */}
            {/* <!-- User Area --> */}
          </div>
        </div>
      </header>

      {showModal && (
        <div
          className="wallet-adapter-modal wallet-adapter-modal-fade-in sm:mt-15"
          style={{ zIndex: "100" }}
        >
          <div className="wallet-adapter-modal-container">
            <div
              className="wallet-adapter-modal-wrapper"
              style={{ maxWidth: "800px" }}
            >
              <div
                className="border-blueGray-200 items-start justify-between rounded-t  pb-2 pt-4"
                style={{ marginBottom: "10px" }}
              >
                <div className="row">
                  <h3 style={{ fontSize: "20px", fontWeight: "700" }}>
                    wallet
                  </h3>
                  <button
                    className="wallet-adapter-modal-button-close"
                    onClick={closeModal}
                  >
                    <svg width={14} height={14}>
                      <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className=" block gap-5 pb-4 md:flex md:gap-5">
                <div
                  className="custom-card rgb(20 28 39) gap-7"
                  style={{ backgroundColor: "rgb(20 28 39) " }}
                >
                  <div className="flex items-center gap-2">
                    <label>Balance :</label>
                    <input
                      type="text"
                      className="mb-2 mt-2 h-10  pl-2 text-black"
                      placeholder="Balance"
                      aria-label="Balance"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label>Amount :</label>
                    <input
                      type="text"
                      className="mb-5 ml-1 mt-2 h-10  pl-2 text-black"
                      placeholder="Withdraw amount"
                      aria-label="Withdraw amount"
                    />
                  </div>
                  <div className="mb-5 flex justify-center">
                    <button
                      type="button"
                      className="m-auto inline-flex items-center justify-center rounded-md bg-meta-3 px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
                <div
                  className="custom-card gap-5"
                  style={{ backgroundColor: "rgb(20 28 39)" }}
                >
                  <div className="flex items-center gap-2">
                    <label>Address :</label>
                    <input
                      type="text"
                      className="my-2 h-10 pl-2  text-black"
                      placeholder="Deposit address"
                      aria-label="Deposit address"
                    />
                  </div>
                  <div className=" mb-3 flex items-center gap-2">
                    <label>Amount :</label>
                    <input
                      type="text"
                      className="mb-2 ml-1 mt-2 h-10  pl-2 text-black"
                      placeholder="Deposit Amount"
                      aria-label="Deposit Amount"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="m-auto inline-flex items-center justify-center rounded-md bg-meta-3 px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                      Deposit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </div>
      )}
      {showModal2 && (
        <>
          <div className="wallet-adapter-modal wallet-adapter-modal-fade-in">
            <div className=" wallet-adapter-modal-container">
              {/*content*/}
              <div className="wallet-adapter-modal-wrapper ">
                {/*header*/}
                <div className="border-blueGray-200 items-start justify-between rounded-t border-b border-solid p-5">
                  <div className="row">
                    <button
                      className="wallet-adapter-modal-button-close"
                      onClick={() => setShowModal2(false)}
                    >
                      <svg width={14} height={14}>
                        <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                      </svg>
                      {/* <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span> */}
                    </button>
                  </div>
                  <div>
                    <h3
                      className="text-3xl font-semibold"
                      style={{ marginTop: "-40px" }}
                    >
                      <br></br>Select a wallet
                    </h3>
                  </div>
                </div>
                {/*body*/}
                <div className="flex w-full items-start  justify-end rounded-t">
                  <ul className="wallet-adapter-modal-list">
                    <li>
                      <button
                        className="wallet-adapter-button"
                        tabIndex={0}
                        type="button"
                      >
                        <i className="wallet-adapter-button-start-icon">
                          <img></img>
                        </i>
                        Open in Xaman
                        <span>Detected</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="wallet-adapter-button"
                        tabIndex={1}
                        type="button"
                      >
                        <i className="wallet-adapter-button-start-icon">
                          <img></img>
                        </i>
                        Connect with GEM
                        <span>Detected</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="wallet-adapter-button"
                        tabIndex={2}
                        type="button"
                      >
                        <i className="wallet-adapter-button-start-icon">
                          <img></img>
                        </i>
                        Connect with Crossmark
                        <span>Detected</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}
    </>
  );
};

export default Header;
