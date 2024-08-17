import { useEffect } from "react";
import { useAppContext } from "@/hooks/AppContext";
import { backendUrl } from "@/anchor/global";

const useFetchUserInfo = () => {
  const { userInfo, setUserInfo, siteInfo, setAccessToken } = useAppContext();
  console.log("here is usefetch");
  useEffect(() => {
    const fetchUserInfo = async () => {
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
          }
        } catch (err) {
          console.error(err);
        }
      };

      try {
        if (!userInfo?.userCode) return;
        const response = await fetch(
          `${backendUrl}/Account/ConnectWallet?agentCode=${siteInfo?.agentCode}&userCode=${userInfo.userCode}`,
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseBody = await response.json();
        const token = responseBody.token;
        if (token) {
          setAccessToken(token);
          await updateUserInfo(token);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserInfo();
  }, []);
};

export default useFetchUserInfo;
