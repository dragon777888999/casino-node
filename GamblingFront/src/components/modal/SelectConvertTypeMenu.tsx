import React, { useRef, useEffect } from "react";

interface DropdownProps {
  convertType: string;
  selectedKey: string;
  selectedRate: string;
  onSelect: (key: string, rate: string) => void;
}

const SelectConvertTypeMenu: React.FC<DropdownProps> = ({
  convertType,
  selectedKey,
  selectedRate,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleToggle = () => {
    setIsOpen(!isOpen);
    //setIsOpen(false);
  };
  let selectConvertType: [string, string][] = [];
  if (convertType) {
    console.log(convertType);
    selectConvertType = Object.entries(convertType);
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    key: string,
    rate: string,
  ) => {
    event.preventDefault();
    onSelect(key, rate);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log("converttype", convertType);

  return (
    <>
      <div ref={dropdownRef} className="dropdown-container">
        <div
          className="dropdown-button  gap-2  rounded-md border px-3 py-1 text-center font-medium"
          onClick={handleToggle}
        >
          {/* <div className="ml-10 flex items-center justify-center">
            <span>Ratio</span>
          </div> */}
          <span style={{ lineHeight: "normal" }}>{selectedKey}</span>

          <svg
            className="hidden fill-current sm:block"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
              fill=""
            />
          </svg>
        </div>
        {isOpen && (
          <div className="dropdown-menu">
            {selectConvertType.length > 0 &&
              selectConvertType.map(([type, rate]) => (
                <div key={type} className="flex items-center">
                  <a
                    href="#"
                    onClick={(event) => handleMenuItemClick(event, type, rate)}
                    className={selectedKey === type ? "selected" : ""}
                  >
                    {" "}
                    {type}
                    {/* {rate} */}
                  </a>
                </div>
              ))}
          </div>
        )}
      </div>
      {/* <div
        className="flex items-center justify-center"
        style={{ marginLeft: "20%" }}
      >
        <span>{selectedKey}</span>
      </div> */}
    </>
  );
};

export default SelectConvertTypeMenu;
