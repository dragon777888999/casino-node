import { backendUrl } from "@/anchor/global";

export async function getUserInfoFromWalletAddress(address : string,   {
  userInfo,
  setUserInfo,
  siteInfo,
  setSiteInfo,
  accessToken,
  setAccessToken,
}: {
  userInfo: any;
  setUserInfo: (info: any) => void;
  siteInfo: any;
  setSiteInfo: (info: any) => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
}) {
  const domain = window.location.host;

  const updateUserInfo = async (newToken : string) => {
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
      if (result.status == 0) {
        setUserInfo(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  try {
    if (address == null || address == "")
      return;
    const response = await fetch(
      `${backendUrl}/Account/ConnectWallet?agentCode=${siteInfo?.agentCode}&userCode=${address}`,
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
    //wallet.disconnect();
  }
}
