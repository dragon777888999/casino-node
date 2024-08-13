import Main from "@/components/main/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/layouts/DefaultLayout";

export const metadata: Metadata = {
  title: " GamBol ",
  description: "This is Main page",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Main />
      </DefaultLayout>
    </>
  );
}
