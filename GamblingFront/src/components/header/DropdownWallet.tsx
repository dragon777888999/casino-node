import { useState } from "react";

import ClickOutside from "@/components/ClickOutside";

interface DropdownProps {
  items: {
    [key: string]: string | number; // or specific types if known
  };
  selectedKey: string;
  onSelect: (key: string) => void;
}

const DropdownWallet: React.FC<DropdownProps> = (items, selectedKey) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemValue = items[selectedKey as keyof typeof items];

  // Ensure itemValue is renderable by React
  const renderableValue =
    typeof itemValue === "string" || typeof itemValue === "number"
      ? itemValue
      : "Invalid value"; // or any fallback value you prefer
  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="inline-flex items-center justify-center rounded-md border border-meta-3 px-3 py-2 text-center font-medium  hover:bg-opacity-90 lg:px-5 xl:px-7 "
      >
        <span className=" block text-right">
          <span className="block text-sm font-medium text-black">
            {renderableValue}
          </span>
        </span>
      </button>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute left-0 mt-4 flex w-62.5 flex-col  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col  gap-5 border-b border-stroke px-6 py-3 dark:border-strokedark">
            <li style={{ borderBottom: "1px solid #434343", padding: "10px" }}>
              <button className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                ROOG
              </button>
            </li>
            <li style={{ borderBottom: "1px solid #434343", padding: "10px" }}>
              <button className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                XRPL
              </button>
            </li>
            <li style={{ padding: "10px" }}>
              <button className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                USD
              </button>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownWallet;
