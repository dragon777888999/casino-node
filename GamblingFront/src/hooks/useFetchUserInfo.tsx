import { useEffect } from "react";
import { useAppContext } from "@/hooks/AppContext";
import { backendUrl } from "@/anchor/global";
import { useSearchParams } from "next/navigation";

const useFetchUserInfo = () => {
  const domain = window.location.host;
  const searchParams = useSearchParams();
  const affiliaterCode = searchParams?.get("r");

  const { siteInfo, loginStep, setLoginStep, walletAddress, setAccessToken, setUserInfo, socket } = useAppContext();
  useEffect(() => {
    const fetchData = async () => {
      if (loginStep != 2)
        return;

      try {
        const connectWalletResponse = await fetch(
          `${backendUrl}/Account/ConnectWallet?agentCode=${siteInfo?.agentCode}&userCode=${walletAddress}&affiliaterCode=${affiliaterCode ?? ""}`,
        );

        if (!connectWalletResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const connectWalletResult = await connectWalletResponse.json();
        const token = connectWalletResult.token;
        if (!token)
          return;
        setAccessToken(token);
        //          document.cookie = "X-Access-Token=" + token + "; path=" + backendUrl;
        const userInfoResponse = await fetch(
          `${backendUrl}/Account/UserInfo?domain=${domain}&chain=${siteInfo.chain}`,
          {
            method: "GET",
            headers: {
              "X-Access-Token": token,
            },
          },
        );
        const userInfoResult = await userInfoResponse.json();
        if (userInfoResult.status === 0) {
          setUserInfo(userInfoResult);
          setLoginStep(3);
          const authMessage = {
            type: "auth",
            agentCode: siteInfo?.agentCode,
            userCode: userInfoResult.userCode,
          };
          socket?.send(JSON.stringify(authMessage));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [loginStep]);
};

export default useFetchUserInfo;
