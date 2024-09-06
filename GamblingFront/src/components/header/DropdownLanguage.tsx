import { useState } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";

const DropdownLanguage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <div>
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          href="#"
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          <i className="fa-solid fa-globe"></i>
        </Link>

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-auto w-25 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-30`}
          >
            <ul className="flex h-auto flex-col overflow-y-auto">
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  href="#"
                >
                  <p className="px-2 text-sm">
                    <span className="text-black dark:text-white">English</span>{" "}
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  href="#"
                >
                  <p className="px-2 text-sm">
                    <span className="text-black dark:text-white">
                      Português
                    </span>{" "}
                  </p>
                </Link>
              </li>
              {/* <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  href="#"
                >
                  <p className="text-sm">
                    <span className="text-black dark:text-white">
                      There are many variations
                    </span>{" "}
                    of passages of Lorem Ipsum available, but the majority have
                    suffered
                  </p>

                  <p className="text-xs">04 Jan, 2025</p>
                </Link>
              </li>
              <li>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  href="#"
                >
                  <p className="text-sm">
                    <span className="text-black dark:text-white">
                      There are many variations
                    </span>{" "}
                    of passages of Lorem Ipsum available, but the majority have
                    suffered
                  </p>

                  <p className="text-xs">01 Dec, 2024</p>
                </Link>
              </li> */}
            </ul>
          </div>
        )}
      </div>
    </ClickOutside>
  );
};

export default DropdownLanguage;
