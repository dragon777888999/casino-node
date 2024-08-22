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

  let logoWidth = 45;
  let logoHeight = 45;

  return (
    <>
      <div className="mx-auto flex w-full max-w-screen-2xl flex-grow items-center justify-between px-4 py-2 shadow-2 md:px-6 2xl:px-11">
        <div>
          <Image
            src={bannerImgSrc}
            alt="Project Thumbnail"
            layout="responsive"
            width={width}
            height={height}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </>
  );
}
