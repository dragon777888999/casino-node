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
              <h3 className="font-medium text-black dark:text-white">Events</h3>
              <Link href="/">
                <div className="close-button">
                  <svg width={16} height={16}>
                    <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                  </svg>
                </div>
              </Link>
            </div>
            <div className="px-7">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bets;
