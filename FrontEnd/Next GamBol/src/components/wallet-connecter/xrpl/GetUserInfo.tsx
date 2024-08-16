

import { useEffect, useState } from "react";

import { backendUrl } from "@/anchor/global";
import { useAppContext } from '../../../context/AppContext';

const GetUserInfo = () => {


  const {  userInfo,
        setUserInfo,
        siteInfo,
        setSiteInfo,
        accessToken,
        setAccessToken } = useAppContext();
  const domain = window.location.host;




  const updateUserInfo = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/Account/UserInfo?domain=${domain}`,
        {
          method: "GET",
          headers: {
            "X-Access-Token": accessToken,
          },
        },
      );
      const result = await response.json();
      //        console.log(result);
      if (result.status == 0) {
        setUserInfo(result);
        setNickName(userInfo.nickName);
        setSelectedKey(userInfo.selectedCoinType);
      }
    } catch (err) {
      console.log(err);
    }
  };
 useEffect(() => {

    const handleWalletConnect = async () => {
      if (userInfo?.userCode) {
        try {
          console.log("############  Connect wallet   ##############");
          if (siteInfo.agentCode == "") {
            const response1 = await fetch(
              `${backendUrl}/Account/SiteInfo?domain=${domain}`,
            );
            const result1 = await response1.json();
            setSiteInfo(result1);
          }

          const response = await fetch(
            `${backendUrl}/Account/ConnectWallet?agentCode=${siteInfo.agentCode}&userCode=${userInfo.userCode}`,
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const responseBody = await response.json();
          const token = responseBody.token;
          if (token) {
            setAccessToken(token);
            await updateUserInfo();
          }
        } catch (err) {
          //wallet.disconnect();
        }
        console.log("Wallet connected");
      } else {
        setAccessToken("");
        console.log("Wallet disconnected");
      }
    };

    handleWalletConnect();
  }, [userInfo?.userCode]);

    useEffect(() => {
    const timer = setInterval(async () => {
      await updateUserInfo();
    }, 1000 * 10);
    return () => clearInterval(timer);
  }, []);
}

 


  export default GetUserInfo;