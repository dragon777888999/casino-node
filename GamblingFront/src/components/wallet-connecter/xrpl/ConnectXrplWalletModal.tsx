import React from "react";
import { isInstalled, getPublicKey, signMessage } from "@gemwallet/api";
import sdk from "@crossmarkio/sdk";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import Image from "next/image";
import { useAppContext, WalletType } from "../../../hooks/AppContext";

interface ConnectXrpltWalletModalProps {
  showConnectModal: boolean;
  onRequestClose: () => void;
}
const ConnectXrplWalletModal: React.FC<ConnectXrpltWalletModalProps> = ({
  showConnectModal,
  onRequestClose,
}) => {
  const { setWalletAddress, setLoginStep, setWalletType } = useAppContext();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [qrcode, setQrcode] = useState("");
  const [enableJwt, setEnableJwt] = useState(true);
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
          console.log(data);
          if (data.hasOwnProperty("xrpAddress")) {
            setWalletAddress(data.xrpAddress);
            setLoginStep(2);
            console.log("--------setxrp-----");
          }
        });
    }
  }, []);
  const getQrCode = async () => {
    try {
      const payload = await fetch("/api/auth/xumm/createpayload");
      const data = await payload.json();

      setQrcode(data.payload.refs.qr_png);
      //setJumpLink(data.payload.next.always);
      if (isMobile) {
        //open in new tab
        window.open(data.payload.next.always, "_blank");
      }

      const ws = new WebSocket(data.payload.refs.websocket_status);
      // alert(data.payload.refs.websocket_status);
      ws.onmessage = async (e) => {
        let responseObj = JSON.parse(e.data);
        if (responseObj.signed !== null && responseObj.signed !== undefined) {
          const payload = await fetch(
            `/api/auth/xumm/getpayload?payloadId=${responseObj.payload_uuidv4}`,
          );
          const payloadJson = await payload.json();

          const hex = payloadJson.payload.response.hex;
          const checkSign = await fetch(`/api/auth/xumm/checksign?hex=${hex}`);
          const checkSignJson = await checkSign.json();
          // setXrpAddress(checkSignJson.xrpAddress);
          const address = checkSignJson.xrpAddress;

          if (enableJwt) {
            setCookie("jwt", checkSignJson.token, { path: "/" });
          }

          setWalletAddress(address);
          setLoginStep(2);
          setWalletType(WalletType.Xumm);
          onRequestClose();
        } else {
          console.log(responseObj);
        }
      };
    } catch (err) {
      console.log(err);
    }
  };

  const handleConnectGem = () => {
    isInstalled().then((response) => {
      if (response.result.isInstalled) {
        getPublicKey().then((response) => {
          // console.log(`${response.result?.address} - ${response.result?.publicKey}`);
          const pubkey = response.result?.publicKey;
          //fetch nonce from /api/gem/nonce?pubkey=pubkey
          fetch(
            `/api/auth/gem/nonce?pubkey=${pubkey}&address=${response.result?.address}`,
          )
            .then((response) => response.json())
            .then((data) => {
              const nonceToken = data.token;
              const opts = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${nonceToken}`,
                },
              };
              signMessage(nonceToken).then((response) => {
                const signedMessage = response.result?.signedMessage;
                if (signedMessage !== undefined) {
                  //post at /api/gem/checksign?signature=signature
                  fetch(
                    `/api/auth/gem/checksign?signature=${signedMessage}`,
                    opts,
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      const { token, address } = data;
                      if (token === undefined) {
                        console.log("error");
                        return;
                      }
                      // updateSiteLogin(true);
                      setWalletAddress(address);
                      setLoginStep(2);
                      onRequestClose();
                      setWalletType(WalletType.Gem);
                      if (enableJwt) {
                        setCookie("jwt", token, { path: "/" });
                      }
                    });
                }
              });
            });
        });
      }
    });
  };
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
      `../api/auth/crossmark/checksign?signature=${signature}`,
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
      },
    );

    const checkSignJson = await checkSign.json();
    if (checkSignJson.hasOwnProperty("token")) {
      setWalletAddress(address);
      setLoginStep(2);
      if (enableJwt) {
        setCookie("jwt", checkSignJson.token, { path: "/" });
      }
      onRequestClose();
      setWalletType(WalletType.Crossmark);
    }
  };
  if (!showConnectModal) return null;

  return (
    <>
      <Modal
        id="modal"
        className="modal"
        isOpen={showConnectModal}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
      >
        <div className="wallet-adapter-modal wallet-adapter-modal-fade-in">
          <div className=" wallet-adapter-modal-container">
            {/*content*/}
            <div className="wallet-adapter-modal-wrapper ">
              {/*header*/}
              <div className="border-blueGray-200 items-start justify-between rounded-t border-b border-solid p-5">
                <div className="row">
                  <button
                    className="wallet-adapter-modal-button-close"
                    onClick={() => {
                      onRequestClose();
                      setQrcode("");
                    }}
                  >
                    <svg width={14} height={14}>
                      <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                    </svg>
                  </button>
                </div>
                <div>
                  <h3
                    className="text-3xl font-semibold"
                    style={{ marginTop: "-40px", color: "white" }}
                  >
                    <br></br>Select a wallet
                  </h3>
                </div>
              </div>
              {/*body*/}
              <div className="mt-5 flex w-full  items-start justify-end rounded-t">
                <ul
                  className="wallet-adapter-modal-list"
                  style={{ color: "white" }}
                >
                  <li>
                    <button
                      className="wallet-modal-button"
                      tabIndex={0}
                      type="button"
                      onClick={getQrCode}
                    >
                      <i className="wallet-adapter-button-start-icon"></i>
                      Open in Xaman
                      <span>Detected</span>
                    </button>
                    {qrcode && (
                      <div style={{ display: "block" }}>
                        <div className="m-2 flex justify-center">
                          <div className="qrcode">
                            <Image
                              src={qrcode} // URL of the image
                              alt="QR code" // Accessibility text
                              width={300} // Width of the image
                              height={200} // Height of the image
                              style={{ width: "30%" }} // Inline styles, if needed
                              layout="responsive" // Optional: adjust layout as needed
                            />
                          </div>
                        </div>

                        <button
                          className="wallet-adapter-button"
                          tabIndex={0}
                          type="button"
                          onClick={() => setQrcode("")}
                          style={{
                            background: "rgb(16 20 31)",
                            display: "block",
                            justifyContent: "center",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </li>
                  <li>
                    <button
                      className="wallet-modal-button"
                      tabIndex={1}
                      type="button"
                      onClick={handleConnectGem}
                    >
                      <i className="wallet-adapter-button-start-icon"></i>
                      Connect with GEM
                      <span>Detected</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="wallet-modal-button"
                      tabIndex={2}
                      type="button"
                      onClick={handleConnectCrossmark}
                    >
                      <i className="wallet-adapter-button-start-icon"></i>
                      Connect with Crossmark
                      <span>Detected</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40  opacity-25"></div>
      </Modal>
    </>
  );
};
export default ConnectXrplWalletModal;
