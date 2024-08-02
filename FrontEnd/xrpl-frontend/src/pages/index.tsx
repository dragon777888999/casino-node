import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { isInstalled, getPublicKey, signMessage } from "@gemwallet/api";
import sdk from "@crossmarkio/sdk";
import { useCookies } from "react-cookie";

import { useEffect, useState } from "react";

//kevin
import APP from "../App";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [qrcode, setQrcode] = useState<string>("");
  const [jumpLink, setJumpLink] = useState<string>("");
  const [xrpAddress, setXrpAddress] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [enableJwt, setEnableJwt] = useState<boolean>(false);
  const [retrieved, setRetrieved] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  return <APP />;
}
