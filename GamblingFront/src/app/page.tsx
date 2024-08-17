"use client";
import Main from "@/components/main/page";

import DefaultLayout from "@/components/layouts/DefaultLayout";

import { NextUIProvider } from "@nextui-org/react";
import { AppProvider } from "../context/AppContext";

export default function Home() {
  return (
    <>
      <NextUIProvider>
        <DefaultLayout>
          <Main />
        </DefaultLayout>
      </NextUIProvider>
    </>
  );
}
