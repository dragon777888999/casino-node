import Main from "@/components/Dashboard/Main";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: " Gambol ",
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
