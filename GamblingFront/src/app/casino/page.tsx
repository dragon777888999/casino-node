import Casino from "@/components/casino";
import { Metadata } from "next";
import DefaultLayout from "@/components/layouts/DefaultLayout";

import { metadata as MainPageMetadata } from "@/components/metadata/MainPageMetaData";
export const metadata = MainPageMetadata;


const CasinoPage = () => {
  return (
      <Casino />
  );
};

export default CasinoPage;
