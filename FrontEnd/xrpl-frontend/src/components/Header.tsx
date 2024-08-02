import React from "react";

import UserInfo from "./UserInfo";
import sdk from "@crossmarkio/sdk";
import { useCookies } from "react-cookie";

import { useEffect, useState } from "react";

import Home from "../pages/index";

const Header = () => {
  // const wallet = useWallet();

  const [showModal, setShowModal] = React.useState(false);
  const [connected, setConnected] = useState(false);

  const [qrcode, setQrcode] = useState("");
  const [jumpLink, setJumpLink] = useState("");
  const [xrpAddress, setXrpAddress] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [enableJwt, setEnableJwt] = useState(false);
  const [retrieved, setRetrieved] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }

    if (cookies.jwt !== undefined && cookies.jwt !== null) {
      const url = "/api/auth";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: cookies.jwt }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.hasOwnProperty("xrpAddress")) {
            setXrpAddress(data.xrpAddress);
            setRetrieved(true);
          }
        });
    }
  }, []);
  const handleConnectCrossmark = async () => {
    //sign in first, then generate nonce
    const hashUrl = "/api/auth/crossmark/hash";
    const hashR = await fetch(hashUrl);
    const hashJson = await hashR.json();
    const hash = hashJson.hash;
    const id = await sdk.methods.signInAndWait(hash);
    // console.log(id);
    const address = id.response.data.address;
    const pubkey = id.response.data.publicKey;
    const signature = id.response.data.signature;
    const checkSign = await fetch(
      `/api/auth/crossmark/checksign?signature=${signature}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${hash}`,
        },
        body: JSON.stringify({
          pubkey: pubkey,
          address: address,
        }),
      }
    );

    const checkSignJson = await checkSign.json();
    if (checkSignJson.hasOwnProperty("token")) {
      setXrpAddress(address);
      if (enableJwt) {
        setCookie("jwt", checkSignJson.token, { path: "/" });
      }
      setShowModal(false);
      setConnected(true);
      // console.log(xrpAddress);
    }
  };
  return (
    <>
      <header>
        <img
          src="/enTheme2/images/logo.png"
          alt="GAMBOL LOGO"
          style={{ height: "100px", width: "100px" }}
        />
        <img src="/enTheme2/images/title.png" alt="GAMBOL" className="title" />

        {connected ? (
          <UserInfo xrpAddress={xrpAddress} />
        ) : (
          <button
            className="select-wallet-btn"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Connect wallet
          </button>
        )}
      </header>

      {showModal ? (
        <>
          <div className="wallet-adapter-modal wallet-adapter-modal-fade-in">
            <div className=" wallet-adapter-modal-container">
              {/*content*/}
              <div className="wallet-adapter-modal-wrapper ">
                {/*header*/}
                <div className="items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <div className="row">
                    <button
                      className="wallet-adapter-modal-button-close"
                      onClick={() => setShowModal(false)}
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
                    <h3 className="text-3xl font-semibold">
                      <br></br>Select a wallet
                    </h3>
                  </div>
                </div>
                {/*body*/}
                <div className="flex items-start justify-end  rounded-t w-full">
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
                        onClick={handleConnectCrossmark}
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
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Header;
