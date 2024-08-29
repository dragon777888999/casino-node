import useLocalStorage from "@/hooks/useLocalStorage";
import { Switch } from "@nextui-org/react";

import Image from "next/image";
import { useAppContext } from "../../hooks/AppContext";
import { useState, useEffect } from "react";

export default function ToogleButton() {
  const [chain, setChain] = useLocalStorage("chain", "");
  const [isSelected, setIsSelected] = useState(true);
  const { siteInfoList } = useAppContext();
  const Length = Object.keys(siteInfoList).length;
  // const Length = siteInfoList.length();

  const onSetChain = () => {
    if (isSelected) setChain("Solana");
    else setChain("Xrpl");
    window.location.reload();
  };
  useEffect(() => {
    if (chain === "Solana") setIsSelected(false);
  }, []);

  let imageSolanaSrc = "/default/images/chain/Solana.png";
  let imageXrplSrc = "/default/images/chain/Xrpl.png";
  // alert(siteInfoList);
  return (
    <>
      {Length == 2 && (
        <div className="toggle-btn ml-1">
          <div className="flex  items-center gap-2">
            <div
              className="flex h-8.5 w-8.5 items-center rounded-full border-[0.5px] border-stroke bg-gray p-2 hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
              // style={{ width: "35px", height: "35px", padding: "8px" }}
            >
              <Image
                src={imageSolanaSrc}
                alt={"chain"} // Provide fallback alt text
                layout="responsive"
                width={18}
                height={18}
                onClick={() => {
                  setIsSelected(true);
                  onSetChain();
                }}
              />
            </div>

            <Switch
              className="switch"
              isSelected={isSelected}
              onValueChange={() => {
                setIsSelected;
                onSetChain();
              }}
            ></Switch>
            {/* <div
              className="active-chain"
              style={{ width: "30px", padding: "5px" }}
            > */}

            <div
              className="flex w-8.5 items-center rounded-full border-[0.5px] border-stroke bg-gray p-2 hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
              // style={{ width: "35px", height: "35px", padding: "8px" }}
            >
              <Image
                src={imageXrplSrc}
                alt={"chain"} // Provide fallback alt text
                layout="responsive"
                width={15}
                height={15}
                onClick={() => {
                  setIsSelected(false);
                  onSetChain();
                }}
              />
            </div>
          </div>
        </div>
      )}
      {Length > 2 && (
        <div className="site-info-list">
          {Object.entries(siteInfoList).map(([key, value]) => (
            <div key={key} className="site-info-item">
              {/* Render properties of value here */}
              <p>{value.title}</p> {/* Example rendering */}
              <div
                className="active-chain"
                style={{ width: "25px", height: "25px", padding: "5px" }}
              >
                <Image
                  src={`/default/images/${value.title}.png`}
                  alt={value.title} // Provide fallback alt text
                  layout="responsive"
                  width={30}
                  height={30}
                  onClick={() => {
                    setIsSelected(false);
                    onSetChain();
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
