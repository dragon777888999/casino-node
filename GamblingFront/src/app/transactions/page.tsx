"use client";

import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

import { Tabs, Tab } from "@nextui-org/react";

const Transactions = () => {
  return (
    <>
      {" "}
      <div className="mx-auto max-w-270">
        {" "}
        <div className="grid gap-8">
          <div className="rounded-sm border border-stroke  dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Transactions
              </h3>
              <Link href="/">
                <div className="close-button">
                  <svg width={16} height={16}>
                    <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                  </svg>
                </div>
              </Link>
            </div>
            <div>
              <div className="p-7">
                <div
                  className="flex flex w-full items-center justify-center rounded py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none  dark:text-white dark:focus:border-primary"
                  style={{ height: "200px" }}
                >
                  <span>No data to display</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
