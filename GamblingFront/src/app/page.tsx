"use client";
import Main from "@/components/main/page";

import DefaultLayout from "@/components/layouts/DefaultLayout";

import { NextUIProvider } from "@nextui-org/react";

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
