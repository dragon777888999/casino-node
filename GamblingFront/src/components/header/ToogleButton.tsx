import useLocalStorage from "@/hooks/useLocalStorage";
import { Switch } from "@nextui-org/react";

import Image from "next/image";
import { useAppContext } from "../../hooks/AppContext";
import { useState, useEffect } from "react";

export default function ToogleButton() {
  const [chain, setChain] = useLocalStorage("chain", "");
  const [isSelected, setIsSelected] = useState(true);
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
  return (
    <>
      {" "}
      <div className="toggle-btn">
        <div className="flex  gap-2">
          <div style={{ width: "30px", padding: "5px" }} className="">
            <Image
              src={imageSolanaSrc}
              alt={"chain"} // Provide fallback alt text
              layout="responsive"
              width={30}
              height={30}
              onClick={() => {
                setIsSelected(true);
                onSetChain();
              }}
            />
          </div>

          <Switch
            isSelected={isSelected}
            onValueChange={() => {
              setIsSelected;
              onSetChain();
            }}
          ></Switch>
          <div
            className="active-chain"
            style={{ width: "30px", padding: "5px" }}
          >
            <Image
              src={imageXrplSrc}
              alt={"chain"} // Provide fallback alt text
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
      </div>
    </>
  );
}
