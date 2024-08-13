import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: " Gambol | Original",
  description: "This is  Original page ",
};

const Original = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5"></div>
    </DefaultLayout>
  );
};

export default Original;
