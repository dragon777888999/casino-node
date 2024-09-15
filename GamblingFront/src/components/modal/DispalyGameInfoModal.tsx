import React from "react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppContext } from "../../hooks/AppContext";
import { WagerInfo } from "@/types/gameListInfo";
// Define the WalletModal component

interface VendorName {
  en: string;
}

interface DispalyGameInfoModalProps {
  showModal: boolean;
  gameData: WagerInfo;
  onRequestClose: () => void;
}
const DispalyGameInfoModal: React.FC<DispalyGameInfoModalProps> = ({
  showModal,
  gameData,
  onRequestClose,
}) => {
  const {siteInfo, loginStep } = useAppContext();

  // Create a Date object
  const date = new Date(gameData.createdAt);

  // Extract and format date components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  // Format the date as DD/MM/YYYY
  const formattedDate = `${day}/${month}/${year}`;
  const currencyDir = siteInfo.themeMap.currency ? siteInfo.themeMap.currency : "default";

  if (!showModal) return null;
  console.log(formattedDate); // Example output: 27/08/2024
  return (
    <Modal
      id="modal"
      className="modal"
      isOpen={showModal}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "#141a2b",
          zIndex: 1000,
        },
      }}
    >
      <div
        className="custom-modal"
        style={{
          zIndex: "1000",

          // overlay: {
          //   zIndex: 1000, // Overlay should be on top of other content
          // },
        }}
      >
        <div className="wallet-adapter-modal-container">
          <div
            className="custom-modal-wrapper"
            style={{
              padding: "25px",
              backgroundColor: "#141a2b",
              maxWidth: "400px",
            }}
          >
            <div
              className="border-blueGray-200 items-start justify-between rounded-t pb-2 pt-4"
              style={{ marginBottom: "10px", width: "100%" }}
            >
              <div className="row">
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  Bet
                </h3>
                <button
                  className="wallet-adapter-modal-button-close"
                  style={{ backgroundColor: "#181f33" }}
                  onClick={() => {
                    onRequestClose();
                  }}
                >
                  <svg width={14} height={14}>
                    <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="BetResult-user-display">
              {/* <div className=" flex items-center gap-2 py-4"> */}
              <div className="BetResult-gamename m-0 p-0">
                <h2
                  style={{
                    fontSize: "18px",
                    lineHeight: "1",
                    color: "white",
                  }}
                >
                  <h2>{JSON.parse(gameData?.gameName).en}</h2>
                </h2>
              </div>
              <div className="BetResult-game-detail">
                <div
                  className="BetResult-gam-detail-content"
                  style={{ fontSize: "14px" }}
                >
                  <p>Bet ID: {(gameData?.wagerId)}</p>
                  <p>
                    Placed by{" "}
                    {gameData?.userCode.length > 5
                      ? gameData?.userCode.slice(0, 5) + `...`
                      : gameData?.userCode}{" "}
                    on {formattedDate}
                  </p>
                </div>
                {/* </div> */}

                {/* <div className=" mt-2 flex justify-center">
                  <button
                    type="button"
                    className="m-auto inline-flex items-center justify-center rounded-md bg-meta-3 px-5 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Withdraw
                  </button>
                </div> */}
              </div>
            </div>
            <div className="BetResult-detail-content">
              <div className="BetResult_item-content">
                <h3 style={{ fontSize: "16px", color: "white" }}>Bet Result</h3>
                <div
                  className="BetResult-detail-item-row"
                  style={{ fontSize: "14px" }}
                >
                  <div className="BetResult-detail-item">
                    <span>Bet</span>
                    <div className="custom-modal-small-card">
                      <Image
                        src={`/${currencyDir}/images/currency/${gameData.currencyCode}.png`}
                        width={20}
                        height={20}
                        alt={"info.currencyCode"}
                      />
                      <span>{gameData?.betAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="BetResult-detail-item">
                    <span>Multipier</span>
                    <div className="custom-modal-small-card">
                      {gameData?.betAmount !== 0
                        ? (
                          (gameData?.payoutAmount ?? 0) /
                          (gameData?.betAmount ?? 0)
                        ).toFixed(2)
                        : "0.00"}{" "}
                      x
                    </div>
                  </div>
                  <div className="BetResult-detail-item">
                    <span>Payout </span>
                    <div className="custom-modal-small-card">
                      <Image
                        src={`/${currencyDir}/images/currency/${gameData.currencyCode}.png`}
                        width={20}
                        height={20}
                        alt={"info.currencyCode"}
                      />
                      {gameData?.payoutAmount.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="WarningNotice">
              <p>
                This bet was originally placed as 0.40 (USD) but is showing the
                approximate value in your display currency.
              </p>
            </div> */}
            {loginStep > 2 && (
              <div className=" mt-2 flex justify-center">
                <button type="button" className="custom-modal-button"
                  onClick={() => {
                    if (loginStep > 2) {
                      const url = `/casino?vendorcode=${encodeURIComponent(gameData?.vendorCode)}&gameCode=${gameData?.gameCode}`;
                      window.location.href = url;
                    }
                  }}>
                  Play {JSON.parse(gameData?.gameName).en}
                </button>
              </div>)
            }
          </div>
        </div>
        <div className="fixed inset-0 z-40 opacity-25"></div>
      </div>
    </Modal>
  );
};

export default DispalyGameInfoModal;
