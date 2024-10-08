"use client";

import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

import { Tabs, Tab } from "@nextui-org/react";
import Image from "next/image";
const Bets = () => {
  let currencyDir = "/default/images/currency/USD.png";
  return (
    <>
      {" "}
      <div className="mx-auto">
        {" "}
        <div className="grid gap-8">
          <div className="rounded-sm border border-stroke  dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Bets</h3>
              <Link href="/">
                <div className="close-button">
                  <svg width={16} height={16}>
                    <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                  </svg>
                </div>
              </Link>
            </div>
            <div className="px-7 py-5">
             
              <Tabs
                aria-label="Options"
                color={"primary"}
                variant={"bordered"}
                style={{ borderColor: "white" }}
                classNames={{
                  tabList: "border-custom",
                }}
              >
                <Tab
                  key="All Bets"
                  title="Casino"
                  style={{
                    width: "80px",
                  }}
                >
                  <div className="input-content mt-2">
                    <label>Deposit Amount</label>
                    <div className="input-inline-btn-container my-1 items-center px-2">
                      <Image
                        src={currencyDir} // Adjust path and naming if needed
                        width={20}
                        height={20}
                        alt={"currencyCode"}
                      />
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-10 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="affiliateCode"
                        id="affiliateCode"
                        placeholder=""
                        defaultValue=""
                        // value={}
                        onChange={(e) => {
                          // setAffiliateCode(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-8 flex">
                      <button
                        type="button"
                        className="custom-modal-button w-full"
                      >
                        Deposit
                      </button>
                    </div>
                  </div>
                </Tab>
                <Tab
                  key="MyBets"
                  title="Sports"
                  style={{
                    width: "80px",
                    backgroundColor: "rgb(36 48 63 / var(--tw-bg-opacity))",
                  }}
                >
                  <div className="flex justify-between">
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        viewBox="0 0 27 27"
                        fill="none"
                      >
                        <path
                          d="M22.7812 3.79688H4.21875C3.65931 3.79688 3.12278 4.01911 2.7272 4.4147C2.33161 4.81028 2.10938 5.34681 2.10938 5.90625V20.25C2.10938 20.8094 2.33161 21.346 2.7272 21.7416C3.12278 22.1371 3.65931 22.3594 4.21875 22.3594H5.48438V23.625C5.48438 23.9607 5.61772 24.2826 5.85507 24.5199C6.09242 24.7573 6.41434 24.8906 6.75 24.8906C7.08566 24.8906 7.40758 24.7573 7.64493 24.5199C7.88228 24.2826 8.01562 23.9607 8.01562 23.625V22.3594H18.9844V23.625C18.9844 23.9607 19.1177 24.2826 19.3551 24.5199C19.5924 24.7573 19.9143 24.8906 20.25 24.8906C20.5857 24.8906 20.9076 24.7573 21.1449 24.5199C21.3823 24.2826 21.5156 23.9607 21.5156 23.625V22.3594H22.7812C23.3407 22.3594 23.8772 22.1371 24.2728 21.7416C24.6684 21.346 24.8906 20.8094 24.8906 20.25V5.90625C24.8906 5.34681 24.6684 4.81028 24.2728 4.4147C23.8772 4.01911 23.3407 3.79688 22.7812 3.79688ZM4.64062 19.8281V6.32812H22.3594V12.2344H20.0728C19.7673 11.1567 19.0824 10.226 18.1444 9.61379C17.2064 9.00162 16.0786 8.74936 14.9692 8.90357C13.8598 9.05777 12.8436 9.60804 12.1081 10.4528C11.3726 11.2976 10.9675 12.3799 10.9675 13.5C10.9675 14.6201 11.3726 15.7024 12.1081 16.5472C12.8436 17.392 13.8598 17.9422 14.9692 18.0964C16.0786 18.2506 17.2064 17.9984 18.1444 17.3862C19.0824 16.774 19.7673 15.8433 20.0728 14.7656H22.3594V19.8281H4.64062ZM17.7188 13.5C17.7188 13.9172 17.595 14.325 17.3633 14.6719C17.1315 15.0188 16.802 15.2892 16.4166 15.4488C16.0312 15.6085 15.607 15.6502 15.1979 15.5688C14.7887 15.4875 14.4128 15.2866 14.1178 14.9916C13.8228 14.6966 13.6219 14.3207 13.5405 13.9115C13.4591 13.5023 13.5009 13.0782 13.6606 12.6928C13.8202 12.3073 14.0906 11.9779 14.4375 11.7461C14.7844 11.5143 15.1922 11.3906 15.6094 11.3906C16.1688 11.3906 16.7053 11.6129 17.1009 12.0084C17.4965 12.404 17.7188 12.9406 17.7188 13.5Z"
                          fill="#7179A5"
                        ></path>
                      </svg>
                      <label>Vault Balance</label>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src={currencyDir} // Adjust path and naming if needed
                        width={20}
                        height={20}
                        alt={"currencyCode"}
                      />
                      <span>0.00</span>
                    </div>
                  </div>
                  <div className="input-content mt-2">
                    <label>Withdraw Amount</label>
                    <div className="input-inline-btn-container my-1 items-center px-2">
                      <Image
                        src={currencyDir} // Adjust path and naming if needed
                        width={20}
                        height={20}
                        alt={"currencyCode"}
                      />
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-10 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="affiliateCode"
                        id="affiliateCode"
                        placeholder=""
                        defaultValue=""
                        // value={}
                        onChange={(e) => {
                          // setAffiliateCode(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mt-8 flex">
                      <button
                        type="button"
                        className="custom-modal-button w-full"
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bets;
