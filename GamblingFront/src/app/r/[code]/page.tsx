"use client";
import Main from "@/components/main/page";
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppContext } from "@/hooks/AppContext";
// import { metadata as MainPageMetadata } from "@/components/metadata/MainPageMetaData";
// export const metadata = MainPageMetadata;

export default function ReferralPage() {
  const { setAffiliaterCode } = useAppContext();
  const params = useParams();
  const code = params?.code as string | null;
  useEffect(() => {
    if (code) {
      setAffiliaterCode(code);
    }
  }, [code, setAffiliaterCode]);
  return (
    <Main />
  );
}