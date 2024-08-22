import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/hooks/AppContext";
import { backendUrl } from "@/anchor/global";
export default function RebelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const domain = window.location.host;
  const {
    loading,
    setLoading,
    loginStep,
    setLoginStep,
    siteInfo,
    setSiteInfo,
    userInfo,
    setUserInfo,
    socketData,
    walletAddress,
  } = useAppContext();
  const [logoImgSrc, setLogoImagSrc] = useState("");

  let logoWidth = 45;
  let logoHeight = 45;
  useEffect(() => {
    const fetchData = async () => {
      // if (loginStep != 0) return;
      try {
        const response = await fetch(
          `${backendUrl}/Account/SiteInfo?domain=${domain}`,
        );

        const result = await response.json();
        console.log("--------rebel------site info------------");
        console.log("rebel-result", result);
        if (result.themeMap.logo) {
          setLogoImagSrc(`/${siteInfo.themeMap.logo}/images/logo.png`);
        } else {
          setLogoImagSrc("/default/images/logo.png");
        }
        setSiteInfo(result);
        console.log(result);
        // alert(logoImgSrc);
        // updateSiteInfo();
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
        // setLoginStep(1);
      }
    };

    fetchData();
  }, [domain, loading, setLoading, setSiteInfo, setLoginStep]);
  return (
    <>
      <header
        className="max-w-screen sticky top-0  z-999 flex w-full"
        style={{ borderBottom: "1px solid #49577b" }}
      >
        <div className="mx-auto flex w-full max-w-screen-2xl flex-grow items-center justify-between px-4 py-2 shadow-2 md:px-6 2xl:px-11">
          <div className="flex hidden md:block">
            <Link href="/">
              <Image
                width={logoWidth}
                height={logoHeight}
                src={logoImgSrc}
                alt="Logo"
                priority
              />
            </Link>
          </div>
          <div className="flex">
            <button className="rebel-header-btn flex justify-end">
              Connect Wallet
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
