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

  return (
    <div className="flex justify-center bg-black">
      <div className="footer mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <div className="footer-container">
          <div className="flex w-full flex-col">
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
                {/* <TableOne></TableOne> */}
              </Tab>
            </Tabs>
          </div>

          <div className="mt-10 block ">
            <div className="mt-10 flex justify-center">
              <p className="" style={{ fontSize: "25px" }}>
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
                        src={`/images/join/${platform.toLowerCase()}.png`}
                        alt="telegram"
                        priority
                      />
                    </a>
                  </div>
                ))}
            </div>
          </div>
          <p className="flex justify-center">{`Copyright © 2024 ${siteInfo.mark}. All rights reserved.`}</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
