"use client";
import Image from "next/image";
import TableAll from "../table/TableAll";
import { useState, useEffect } from "react";

import { Tabs, Tab } from "@nextui-org/react";
import { useAppContext } from "@/hooks/AppContext";
import { WagerInfo } from "@/types/gameListInfo";

const displayLength = 10;

const Footer = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const { userInfo, siteInfo, socketData } = useAppContext();
  const [totalTableData, setTotalTableData] = useState<WagerInfo[]>([]);
  const [myTableData, setMyTableData] = useState<WagerInfo[]>([]);

  useEffect(() => {
    if (socketData) {
      try {
        const cmd = JSON.parse(socketData);
        if (cmd.type != "wager")
          return;
        const newData: WagerInfo = JSON.parse(socketData); // Parse the incoming JSON data
        if (newData.userCode === userInfo?.userCode) {
          let updatedMyTableData = [...myTableData];
          updatedMyTableData = [newData, ...updatedMyTableData];
          if (updatedMyTableData.length > displayLength)
            updatedMyTableData.pop();
          setMyTableData(updatedMyTableData);
        }

        // Create a new array based on the existing tableData
        let updatedTableData = [...totalTableData];
        updatedTableData = [newData, ...updatedTableData];

        if (updatedTableData.length > displayLength) {
          updatedTableData.pop();
        }
        setTotalTableData(updatedTableData); // Set the new array to state
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [socketData]);

  let communityEntries: [string, string][] = [];
  if (siteInfo.communityMap) {
    console.log(siteInfo.communityMap);
    communityEntries = Object.entries(siteInfo.communityMap);
  }
  const cardHeaderImg = `/RebelGames/images/gamePanel/card-header.png`;
  const cardfooterImg = `/RebelGames/images/gamePanel/card-footer.png`;
  const style = siteInfo.themeMap.mark ? siteInfo.themeMap.style : "";
  let width = 40;
  let height = 40;
  return (
    <div className="flex justify-center ">
      <div className="footer mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="footer-container">
          <div className="footer-wargerinfo-table flex w-full flex-col">
            <Tabs
              aria-label="Options"
              color={"primary"}
              variant={"light"}
            >
              <Tab
                key="All Bets"
                title="All Bets"
                style={{
                  width: "150px",
                  backgroundColor: "rgb(36 48 63 / var(--tw-bg-opacity))",

                }}
              >
                <TableAll key="AllBets" tableData={totalTableData}></TableAll>
              </Tab>
              <Tab
                key="MyBets"
                title="My Bets"
                style={{
                  width: "150px",
                  backgroundColor: "rgb(36 48 63 / var(--tw-bg-opacity))",
                }}
              >
                <TableAll key="MyBets" tableData={myTableData}></TableAll>
              </Tab>
            </Tabs>
          </div>
          <div className="mt-10 block ">
            <div className="mt-10 flex justify-center">
              <p className="" style={{ fontSize: "20px" }}>
                Join Our Community
              </p>
            </div>
            <div className="my-10 flex flex justify-center gap-4">
              {communityEntries.length > 0 &&
                communityEntries.map(([platform, url]) => (
                  <div key={platform} className="flex items-center">
                    <a
                      className="platform"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        width={40}
                        height={40}
                        src={`/default/images/join/${platform.toLowerCase()}.png`}
                        alt="telegram"
                        priority
                      />
                    </a>
                  </div>
                ))}
            </div>
          </div>
          <p
            className="flex justify-center"
            style={{ color: "#7b7f82", fontSize: "13px" }}
          >{`Copyright © 2024 ${siteInfo.mark}. All rights reserved.`}</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
