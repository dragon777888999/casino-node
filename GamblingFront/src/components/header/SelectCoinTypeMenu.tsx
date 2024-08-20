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
        className="dropdown-button rounded-md border  px-3 py-1 text-center font-medium "
        onClick={handleToggle}
      >
        {items[selectedKey]} {selectedKey}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {Object.keys(items).map((key) => (
            <div key={key} className="block">
              <a
                key={key}
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
