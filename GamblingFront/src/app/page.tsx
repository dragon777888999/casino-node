//"use client";
import Main from "@/components/main/page";
import DefaultLayout from "@/components/layouts/DefaultLayout";

import { metadata as MainPageMetadata } from "@/components/metadata/MainPageMetaData";
export const metadata = MainPageMetadata;

export default function Home() {
  return (
    <Main />
  );
}
