"use client";
import Image from "next/image";
import TableAll from "../table/TableAll";

import { Tabs, Tab } from "@nextui-org/react";
import { useAppContext } from "@/hooks/AppContext";

const Footer = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const { userInfo, siteInfo } = useAppContext();
  const isUserInfoEmpty = !userInfo || Object.keys(userInfo).length === 0;

  let communityEntries: [string, string][] = [];
  if (siteInfo.communityMap) {
    console.log(siteInfo.communityMap);
    communityEntries = Object.entries(siteInfo.communityMap);
  }
  const cardHeaderImg = `/RebelGames/images/gamePanel/card-header.png`;
  const cardfooterImg = `/RebelGames/images/gamePanel/card-footer.png`;
  const style = siteInfo.themeMap.style ? siteInfo.themeMap.style : "";
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
              disabledKeys={isUserInfoEmpty ? ["MyBets"] : []}
            >
              <Tab
                key="All Bets"
                title="All Bets"
                style={{
                  width: "150px",
                  backgroundColor: "rgb(36 48 63 / var(--tw-bg-opacity))",

                }}
              >
                <TableAll isAll={true}></TableAll>
              </Tab>
              <Tab
                key="MyBets"
                title="My Bets"
                style={{
                  width: "150px",
                  backgroundColor: "rgb(36 48 63 / var(--tw-bg-opacity))",
                }}
              >
                <TableAll isAll={false}></TableAll>
              </Tab>
            </Tabs>
          </div>
          <div className="style-card">
            <div className="RebelGames-card-header">
              <Image
                src={cardHeaderImg}
                alt="Project Thumbnail"
                layout="responsive"
                width={width}
                height={height}
                style={{ width: "100%" }}
              />
            </div>
            <div className={`${style}-card-body`}>
              <div className={`${style}-card-body-contain`}>
                <TableAll isAll={true}></TableAll>
              </div>
            </div>
            <div className="RebelGames-card-footer">
              <Image
                src={cardfooterImg}
                alt="Project Thumbnail"
                layout="responsive"
                width={width}
                height={height}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          {/* <TableAll isAll={true}></TableAll> */}
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
          >{`Copyright © 2024 ${style}. All rights reserved.`}</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
