import React from "react";

// Define the WalletModal component
interface WalletModalProps {
  showWalletModal: boolean;
  onRequestClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({
  showWalletModal,
  onRequestClose,
}) => {
  if (!showWalletModal) return null;

  return (
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
            className="border-blueGray-200 items-start justify-between rounded-t pb-2 pt-4"
            style={{ marginBottom: "10px" }}
          >
            <div className="row">
              <h3 style={{ fontSize: "20px", fontWeight: "700" }}>wallet</h3>
              <button
                className="wallet-adapter-modal-button-close"
                onClick={onRequestClose}
              >
                <svg width={14} height={14}>
                  <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="block gap-5 pb-4 md:flex md:gap-5">
            <div
              className="custom-card"
              style={{ backgroundColor: "rgb(20 28 39)" }}
            >
              <div className="flex items-center gap-2">
                <label>Balance :</label>
                <input
                  type="text"
                  className="mb-2 mt-2 h-10 pl-2 text-black"
                  placeholder="Balance"
                  aria-label="Balance"
                />
              </div>
              <div className="flex items-center gap-2">
                <label>Amount :</label>
                <input
                  type="text"
                  className="mb-5 ml-1 mt-2 h-10 pl-2 text-black"
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
              className="custom-card"
              style={{ backgroundColor: "rgb(20 28 39)" }}
            >
              <div className="flex items-center gap-2">
                <label>Address :</label>
                <input
                  type="text"
                  className="my-2 h-10 pl-2 text-black"
                  placeholder="Deposit address"
                  aria-label="Deposit address"
                />
              </div>
              <div className="mb-3 flex items-center gap-2">
                <label>Amount :</label>
                <input
                  type="text"
                  className="mb-2 ml-1 mt-2 h-10 pl-2 text-black"
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
  );
};

export default WalletModal;
