import { useEffect } from "react";
import { useAppContext } from "@/hooks/AppContext";
import { backendUrl } from "@/anchor/global";

const useFetchUserInfo = () => {
  const { walletAddress, userInfo, setUserInfo, siteInfo, setAccessToken, socket } = useAppContext();
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (walletAddress == "") return;
      const domain = window.location.host;
      const updateUserInfo = async (newToken: string) => {
        try {
          const response = await fetch(
            `${backendUrl}/Account/UserInfo?domain=${domain}`,
            {
              method: "GET",
              headers: {
                "X-Access-Token": newToken,
              },
            },
          );
          const result = await response.json();
          if (result.status === 0) {
            setUserInfo(result);
            const authMessage = {
              type: "auth",
              token: newToken
            };
            socket?.send(JSON.stringify(authMessage));
          }
        } catch (err) {
          console.error(err);
        }
      };
      console.log("here is get userinfo");

      try {
        const response = await fetch(
          `${backendUrl}/Account/ConnectWallet?agentCode=${siteInfo?.agentCode}&userCode=${walletAddress}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseBody = await response.json();
        const token = responseBody.token;
        if (token) {
          setAccessToken(token);
          document.cookie = "X-Access-Token=" + token + "; path=" + backendUrl;
          await updateUserInfo(token);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserInfo();
    console.log(userInfo);
  }, [walletAddress]);
};

export default useFetchUserInfo;
