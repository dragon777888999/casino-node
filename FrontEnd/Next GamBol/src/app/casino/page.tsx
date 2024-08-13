import Casino from "@/components/casino";
import { Metadata } from "next";
import DefaultLayout from "@/components/layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Gambol | Casino",
  description: "This is  Casino page for Everyone",
};

const CasinoPage = () => {
  return (
    <DefaultLayout>
      <Casino />
    </DefaultLayout>
  );
};

export default CasinoPage;
