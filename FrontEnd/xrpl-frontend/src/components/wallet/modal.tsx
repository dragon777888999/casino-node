import React from "react";

const WalletModal = () => {
  const [showModal, setShowModal] = React.useState(false);
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
                <br></br>Connect a wallet
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
          {/*footer*/}
          {/* <div className="flex items-center justify-end border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div> */}
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>;
};

export default WalletModal;
