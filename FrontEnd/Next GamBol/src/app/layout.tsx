"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import "@/css/custom.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import useColorMode from "@/hooks/useColorMode";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [colorMode, setColorMode] = useColorMode();
  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    setColorMode("dark");
  }, []);

  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        style={{ background: "rgb(26 34 44)" }}
      >
        <div className="dark dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
