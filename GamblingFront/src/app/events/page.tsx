"use client";

import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import EventList from "./eventlist";
import { useState, useEffect } from "react";
import { EventsInfo } from "@/types/eventListInfo";
import { backendUrl } from "@/anchor/global";
import { useAppContext } from "@/hooks/AppContext";

const Events = () => {
  const { accessToken, userInfo, loginStep } = useAppContext();

  useEffect(() => {
    const fetchEventData = async () => {
      if (loginStep < 3)
        return;
      try {
        const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
          method: "POST",
          headers: {
            "X-Access-Token": accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method: "GetEventList",
            currencyCode: userInfo.selectedCoinType
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        setTotalTableData(result.data);

      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };
    fetchEventData(); // Fetch for original games
  }, []);
  const [totalTableData, setTotalTableData] = useState<EventsInfo[]>([]);


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
              <EventList tableData={totalTableData}></EventList>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
