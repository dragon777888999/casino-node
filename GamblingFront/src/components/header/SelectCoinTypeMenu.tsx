import React, { useRef, useEffect } from "react";

interface DropdownProps {
  items: { [key: string]: number };
  selectedKey: string;
  onSelect: (key: string) => void;
}

const SelectCoinTypeMenu: React.FC<DropdownProps> = ({
  items,
  selectedKey,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    //setIsOpen(false);
  };

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
  ) => {
    event.preventDefault();
    onSelect(key);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="dropdown-container">
      <div
        className="dropdown-button  gap-2  rounded-md border px-3 py-1 text-center font-medium"
        onClick={handleToggle}
      >
        <span>
          {items[selectedKey]} {selectedKey}
        </span>

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
          {Object.keys(items).map((key) => (
            <div key={key} className="block">
              {/* Added key here */}
              <a
                href="#"
                onClick={(event) => handleMenuItemClick(event, key)}
                className={selectedKey === key ? "selected" : ""}
              >
                {items[key]} {key}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectCoinTypeMenu;
