import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ClickOutside from "@/components/ClickOutside";
const DropdownBonus = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <div className="relative">
        <div className="relative flex items-center">
          <div>
            <Link
              onClick={() => {
                setNotifying(false);
                setDropdownOpen(!dropdownOpen);
              }}
              className="relative flex  items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
              href="#"
            >
              <span
                className={`absolute -right-0.5 -top-0.5 z-1 h-2 w-2 rounded-full bg-meta-1 ${
                  notifying === false ? "hidden" : "inline"
                }`}
              >
                <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
              </span>

              {/* <i className="fa-sharp fa-regular fa-gift"></i> */}
              <div className="itmes-center flex">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="-6 -5 40 40"
                  fill="none"
                >
                  <path
                    fill="url(#:R1dakcr6:)"
                    fillOpacity="0.05"
                    d="M10.577 12.348h-7.67a.438.438 0 0 1-.438-.438V7.07c0-.241.196-.437.437-.437h22.19c.241 0 .437.196.437.437v4.84a.438.438 0 0 1-.437.438h-7.671"
                  ></path>
                  <path
                    fill="url(#:R1dakcr6H1:)"
                    fillOpacity="0.05"
                    d="M16.822 15.84a.438.438 0 0 0 .603-.404v-2.648c0-.242.196-.438.438-.438h5.95c.242 0 .438.196.438.438v12.925a.438.438 0 0 1-.438.438H4.19a.438.438 0 0 1-.437-.438V12.788c0-.242.196-.438.437-.438h5.951c.242 0 .438.196.438.438v2.647"
                  ></path>
                  <path
                    stroke="url(#:R1dakcr6H2:)"
                    strokeMiterlimit="10"
                    strokeWidth="1.75"
                    d="M10.577 12.348h-7.67a.438.438 0 0 1-.438-.438V7.07c0-.241.196-.437.437-.437h22.19c.241 0 .437.196.437.437v4.84a.438.438 0 0 1-.437.438h-7.671m-1.378 3.219V26.15h-4.096V15.567m5.474-2.779v2.648c0 .31-.315.522-.603.405l-2.656-1.086a.438.438 0 0 0-.331 0L11.18 15.84a.438.438 0 0 1-.603-.405v-2.647a.438.438 0 0 0-.438-.438H4.19a.438.438 0 0 0-.438.438v12.925c0 .242.196.438.437.438h19.624a.438.438 0 0 0 .438-.438V12.788a.438.438 0 0 0-.438-.438h-5.95a.437.437 0 0 0-.438.438Z"
                  ></path>
                  <path
                    stroke="url(#:R1dakcr6H3:)"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                    d="M14.001 6.634h-3.853a1.83 1.83 0 0 1 0-3.66h.193a3.66 3.66 0 0 1 3.66 3.66Zm0 0h3.853a1.83 1.83 0 1 0 0-3.66h-.193A3.66 3.66 0 0 0 14 6.635Zm3.423 9.508L14 14.707l-3.424 1.435V6.634h6.848v9.508Z"
                  ></path>
                  <defs>
                    <linearGradient
                      id=":R1dakcr6:"
                      x1="14.001"
                      x2="14.001"
                      y1="6.633"
                      y2="26.15"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#E8E5FF" stopOpacity="0"></stop>
                      <stop offset="1" stopColor="#E8E5FF"></stop>
                    </linearGradient>
                    <linearGradient
                      id=":R1dakcr6H1:"
                      x1="14.001"
                      x2="14.001"
                      y1="6.633"
                      y2="26.15"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#E8E5FF" stopOpacity="0"></stop>
                      <stop offset="1" stopColor="#E8E5FF"></stop>
                    </linearGradient>
                    <linearGradient
                      id=":R1dakcr6H2:"
                      x1="14.001"
                      x2="14.001"
                      y1="6.633"
                      y2="26.151"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff"></stop>
                      <stop offset="1" stopColor="#E8E5FF"></stop>
                    </linearGradient>
                    <linearGradient
                      id=":R1dakcr6H3:"
                      x1="14.001"
                      x2="14.001"
                      y1="16.142"
                      y2="2.975"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#33A9FF"></stop>
                      <stop offset="1" stopColor="#6FFA8E"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </Link>
          </div>
          {/* <span className="Header_counter">1</span> */}
        </div>

        {/* <!-- Dropdown Start --> */}
        {dropdownOpen && (
          <div
            className={`RewardsDropDown_rewards-drop-down-container absolute -right-16 mt-2.5 flex w-75 flex-col rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
          >
            {/* <ul className="RewardsDropDown_claim-area flex h-auto flex-col overflow-y-auto"> */}
            <ul className="RewardsDropDown_claim-area flex  flex-col ">
              <li className="RewardsDropDown_rewards-content-row">
                <div className="RewardsDropDown_left-side">
                  <div className="RewardsDropDown_rewards-content-image">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="42"
                      fill="none"
                      viewBox="0 0 35 34"
                    >
                      <path
                        fill="url(#paint0_linear_12853_100545)"
                        d="M35 20.951c0-3.469-4.546-6.141-10.77-6.48V6.52C24.23 2.015 18.145 0 12.116 0S.002 2.015 0 6.52v19.21c0 4.502 6.085 6.519 12.115 6.519.623 0 1.257-.056 1.898-.117a19.396 19.396 0 008.872 1.86c6.029 0 12.115-2.017 12.115-6.52v-6.521zm-2.692 0c0 1.845-4.03 3.907-9.423 3.907-5.394 0-9.424-2.063-9.424-3.907.07-.425.242-.83.504-1.177a2.78 2.78 0 011-.826.97.97 0 00.089-.06 15.38 15.38 0 017.83-1.84c5.394 0 9.424 2.063 9.424 3.907v-.004zm-10.77-8.264c-.065.4-.224.778-.464 1.108-.241.33-.557.602-.923.794a16.09 16.09 0 00-6.271 1.917c-.573.047-1.153.082-1.765.082-5.076 0-9.423-2.148-9.423-3.905v-1.826a18.415 18.415 0 009.423 2.184 18.415 18.415 0 009.423-2.184v1.83zM2.692 16.733a17.629 17.629 0 008.506 2.452 4.022 4.022 0 00-.429 1.766v2.106c-4.473-.333-8.077-2.249-8.077-3.849v-2.475zm9.423-14.118c4.633 0 9.423 1.46 9.423 3.906 0 2.537-4.846 3.905-9.423 3.905S2.692 9.058 2.692 6.52c0-2.445 4.79-3.906 9.423-3.906zM2.692 25.729v-2.477a17.385 17.385 0 008.077 2.427v1.794a4.465 4.465 0 00.539 2.145c-4.364-.158-8.616-1.586-8.616-3.889zm20.193 5.648a16.742 16.742 0 01-7.68-1.607 2.907 2.907 0 01-1.19-.92 2.79 2.79 0 01-.552-1.378v-2.325a17.564 17.564 0 009.422 2.329 17.564 17.564 0 009.423-2.329v2.326c0 2.443-4.79 3.904-9.423 3.904z"
                      ></path>
                      <defs>
                        <linearGradient
                          id="paint0_linear_12853_100545"
                          x1="17.5"
                          x2="17.5"
                          y1="34"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#33A9FF"></stop>
                          <stop offset="1" stopColor="#6FFA8E"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="RewardsDropDown_rewards-content-text-container">
                    <span className="RewardsDropDown_rewards-content-text">
                      Daily Calendar
                    </span>
                    <div className="ValueDisplay_value-display">
                      <div className="alueDisplay_currency-icon">
                        <Image
                          src={`/default/images/currency/USD.png`} // Adjust path and naming if needed
                          width={15}
                          height={15}
                          alt={"currency"}
                        />
                      </div>
                      <span>0.00</span>
                    </div>
                  </div>
                </div>
                <button className="Button_standard-button" disabled>
                  <div className="Button_inner-content">
                    <span>Claim</span>
                  </div>
                </button>
              </li>
              <li className="RewardsDropDown_rewards-content-row">
                <div className="RewardsDropDown_left-side">
                  <div className="RewardsDropDown_rewards-content-image">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="42"
                      fill="none"
                      viewBox="0 0 40 40"
                    >
                      <path
                        fill="url(#paint0_linear_12853_100502)"
                        d="M6.678 9.968a18.424 18.424 0 012.457-2.6c.226-.193.455-.382.685-.566.16-.127-.234.176-.029.024a29.553 29.553 0 01.545-.398 18.164 18.164 0 011.535-.967 18.954 18.954 0 011.833-.899l-.295.123a18.188 18.188 0 014.614-1.255c-.11.017-.217.029-.328.045a18.304 18.304 0 014.852.009c-.11-.017-.217-.03-.328-.045 1.575.217 3.113.635 4.582 1.255l-.296-.123a18.398 18.398 0 013.536 1.99c.086.06.172.126.258.192.045.032.086.065.127.098.177.131-.25-.197-.078-.062a18.052 18.052 0 012.457 2.326c.144.16.28.324.419.492.07.082.135.168.2.25.058.07.185.247-.06-.077l.13.172a18.237 18.237 0 012.182 3.794l-.123-.296a18.294 18.294 0 011.255 4.582c-.016-.11-.028-.218-.045-.328a18.499 18.499 0 010 4.901c.017-.11.029-.217.045-.328a18.163 18.163 0 01-1.255 4.581l.123-.295a18.405 18.405 0 01-1.99 3.536c-.06.086-.126.172-.192.258-.032.045-.065.086-.098.127-.131.177.197-.25.061-.078a18.046 18.046 0 01-2.326 2.457c-.16.144-.323.279-.491.419-.082.07-.169.135-.25.2-.07.058-.247.185.077-.061-.057.045-.114.086-.172.131a18.227 18.227 0 01-3.794 2.182l.296-.123a18.294 18.294 0 01-4.582 1.255l.328-.045a18.499 18.499 0 01-4.901 0c.11.017.217.029.328.045a18.167 18.167 0 01-4.581-1.255l.295.123a18.357 18.357 0 01-3.536-1.99c-.086-.06-.172-.126-.258-.192a3.337 3.337 0 01-.127-.098c-.177-.132.25.197.078.061a18.05 18.05 0 01-2.457-2.326c-.144-.16-.28-.323-.419-.492-.07-.081-.135-.168-.2-.25-.058-.07-.185-.246.061.078-.045-.057-.086-.115-.131-.172a18.228 18.228 0 01-2.182-3.794l.123.295a18.29 18.29 0 01-1.255-4.581c.016.11.028.217.045.328a18.16 18.16 0 01-.164-2.453c0-.644-.566-1.259-1.23-1.23-.665.029-1.231.541-1.231 1.23.004 3.495.96 6.977 2.772 9.971a19.456 19.456 0 007.256 6.956 19.334 19.334 0 0010.131 2.346c3.47-.163 6.895-1.25 9.786-3.186 2.818-1.883 5.156-4.492 6.645-7.543 1.55-3.17 2.243-6.743 1.911-10.262-.324-3.45-1.534-6.797-3.593-9.594-2.001-2.74-4.684-4.975-7.81-6.333-1.595-.693-3.244-1.193-4.966-1.435a20.211 20.211 0 00-6.009.049c-3.83.607-7.44 2.461-10.23 5.147a18.576 18.576 0 00-1.759 1.961c-.209.27-.36.513-.36.87 0 .303.135.66.36.87.234.212.542.372.87.36.307-.012.68-.107.873-.357z"
                      ></path>
                      <path
                        fill="url(#paint1_linear_12853_100502)"
                        d="M21.317 29.717V26.83c0-.644-.566-1.26-1.23-1.23-.67.028-1.231.54-1.231 1.23v2.887c0 .644.566 1.26 1.23 1.23.665-.028 1.23-.54 1.23-1.23zm0-16.32v-2.826c0-.644-.566-1.259-1.23-1.23-.67.028-1.231.541-1.231 1.23v2.826c0 .644.566 1.26 1.23 1.23.665-.028 1.23-.54 1.23-1.23z"
                      ></path>
                      <path
                        fill="url(#paint2_linear_12853_100502)"
                        d="M14.434 23.733a4.354 4.354 0 001.243 3.002c.788.8 1.85 1.239 2.965 1.317.46.033.923.008 1.383.008.422 0 .849.004 1.271 0 2.141-.016 4.245-1.53 4.619-3.708.209-1.218-.009-2.49-.755-3.498-.833-1.116-2.01-1.78-3.392-1.944-1.112-.132-2.248.073-3.355-.062.11.017.217.029.328.045a3.758 3.758 0 01-.919-.246l.296.123a3.55 3.55 0 01-.579-.308c-.045-.028-.09-.061-.135-.09-.156-.106.205.173.098.078-.078-.074-.164-.14-.242-.213-.07-.07-.135-.14-.2-.213-.066-.074-.156-.234.057.082-.029-.045-.062-.086-.095-.132a3.245 3.245 0 01-.307-.561l.123.295a3.68 3.68 0 01-.234-.837l.045.328a3.408 3.408 0 01.004-.914c-.016.11-.028.217-.045.328.045-.28.12-.55.226-.812l-.123.295c.086-.197.184-.386.307-.562.025-.037.05-.07.074-.103-.176.284-.115.148-.053.074.07-.082.14-.16.217-.234.066-.065.14-.127.21-.188.172-.152-.19.135-.075.057.046-.028.087-.061.128-.09.176-.119.365-.217.558-.304l-.296.124c.304-.128.615-.214.944-.259-.111.017-.218.029-.329.045.558-.07 1.14-.028 1.703-.028.545 0 1.107-.037 1.648.032-.11-.016-.217-.028-.328-.045.275.041.542.111.804.218l-.295-.123c.184.077.36.168.525.274l.131.09c.156.107-.21-.172-.102-.077.073.065.147.127.217.197.061.061.123.127.18.192.066.078.148.23-.061-.082.029.045.061.086.09.132.11.164.201.332.279.512l-.123-.295c.102.25.172.509.213.78-.016-.111-.028-.218-.045-.329.017.131.025.259.025.39.004.644.562 1.259 1.23 1.23.66-.029 1.239-.541 1.23-1.23a4.354 4.354 0 00-1.242-3.003c-.788-.8-1.854-1.238-2.966-1.316-.442-.029-.894-.008-1.34-.008-.44 0-.874-.005-1.313 0-1.255.008-2.486.496-3.376 1.39-.873.874-1.394 2.129-1.329 3.367a4.64 4.64 0 001.28 2.982c.787.825 1.842 1.28 2.961 1.411 1.112.131 2.248-.074 3.355.062-.11-.017-.217-.029-.328-.045.324.045.64.13.944.258l-.296-.123c.193.086.382.184.558.303.037.025.07.05.103.07.188.132-.177-.147-.074-.057.078.07.16.135.234.209.07.066.135.135.196.21.025.028.16.2.025.024-.131-.168-.012-.013.016.028.12.177.222.366.308.562l-.123-.295c.11.263.185.53.226.812-.017-.11-.029-.217-.045-.328.04.304.04.607.004.915.016-.111.028-.218.045-.328a3.347 3.347 0 01-.234.836l.123-.295a3.541 3.541 0 01-.308.562c-.016.024-.073.127-.094.131.008 0 .226-.266.074-.102-.074.078-.144.16-.217.233-.07.07-.144.132-.218.197-.16.144.258-.18.078-.061-.045.029-.086.061-.135.09a3.903 3.903 0 01-.579.308l.296-.123c-.296.118-.603.2-.919.246.11-.017.217-.03.328-.046-.55.066-1.12.03-1.673.03-.55 0-1.12.04-1.67-.034.111.017.218.03.328.046a3.487 3.487 0 01-.803-.218l.295.123a3.344 3.344 0 01-.525-.275c-.045-.028-.09-.061-.131-.09-.156-.107.209.172.102.078-.074-.066-.148-.127-.217-.197a3.961 3.961 0 01-.18-.193c-.066-.078-.148-.23.06.082-.028-.045-.06-.086-.09-.13a3.094 3.094 0 01-.278-.514l.123.296a3.379 3.379 0 01-.214-.78c.017.111.03.218.046.329a3.09 3.09 0 01-.025-.39c-.004-.644-.562-1.26-1.23-1.23-.649.028-1.223.541-1.219 1.23zm-3.44-15.27H5.098l1.23 1.23V3.8c0-.643-.565-1.259-1.23-1.23-.668.029-1.23.541-1.23 1.23v5.894c0 .665.562 1.23 1.23 1.23h5.894c.644 0 1.26-.565 1.23-1.23-.028-.664-.54-1.23-1.23-1.23z"
                      ></path>
                      <defs>
                        <linearGradient
                          id="paint0_linear_12853_100502"
                          x1="20.092"
                          x2="20.092"
                          y1="39.443"
                          y2="0.867"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#33A9FF"></stop>
                          <stop offset="1" stopColor="#6FFA8E"></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_12853_100502"
                          x1="20.092"
                          x2="20.092"
                          y1="39.443"
                          y2="0.867"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#33A9FF"></stop>
                          <stop offset="1" stopColor="#6FFA8E"></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_12853_100502"
                          x1="20.092"
                          x2="20.092"
                          y1="39.443"
                          y2="0.867"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#33A9FF"></stop>
                          <stop offset="1" stopColor="#6FFA8E"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="RewardsDropDown_rewards-content-text-container">
                    <span className="RewardsDropDown_rewards-content-text">
                      10% Rakeback
                    </span>
                    <div className="ValueDisplay_value-display">
                      <div className="alueDisplay_currency-icon">
                        <Image
                          src={`/default/images/currency/USD.png`} // Adjust path and naming if needed
                          width={15}
                          height={15}
                          alt={"currency"}
                        />
                      </div>
                      <span>0.00</span>
                    </div>
                  </div>
                </div>
                <button className="Button_standard-button Button_standard-button-active">
                  <div className="Button_inner-content">
                    <span>Claim</span>
                  </div>
                </button>
              </li>
              <li className="RewardsDropDown_rewards-content-row">
                <div className="RewardsDropDown_left-side">
                  <div className="RewardsDropDown_rewards-content-image">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="42"
                      height="42"
                      fill="none"
                      viewBox="0 0 40 41"
                    >
                      <path
                        fill="url(#paint0_linear_11873_61937)"
                        d="M35.408 3.416h-2.111V2.109a1.158 1.158 0 00-2.315 0v1.307h-2.275V2.109a1.158 1.158 0 00-2.315 0v1.307H13.611V2.109a1.158 1.158 0 00-2.315 0v1.307H9.02V2.109a1.158 1.158 0 00-2.315 0v1.307H4.595A3.748 3.748 0 00.852 7.159v29.249a3.748 3.748 0 003.743 3.743h30.813a3.747 3.747 0 003.743-3.743V7.159a3.748 3.748 0 00-3.743-3.743zm1.428 32.992a1.43 1.43 0 01-1.428 1.428H4.595a1.43 1.43 0 01-1.429-1.428V13.04h33.67v23.368zM3.166 7.159c0-.788.641-1.428 1.429-1.428h2.111v1.307a1.158 1.158 0 002.315 0V5.731h2.275v1.307a1.158 1.158 0 002.315 0V5.731h12.781v1.307a1.158 1.158 0 002.315 0V5.731h2.275v1.307a1.158 1.158 0 002.315 0V5.731h2.11c.788 0 1.429.64 1.429 1.428v3.566H3.166V7.16z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M18.509 27.983a1.073 1.073 0 001.516 0l3.827-3.827a1.072 1.072 0 10-1.516-1.517l-3.07 3.07-1.399-1.4a1.073 1.073 0 00-1.516 1.517l2.158 2.157z"
                      ></path>
                      <path
                        fill="url(#paint1_linear_11873_61937)"
                        d="M18.509 27.983a1.073 1.073 0 001.516 0l3.827-3.827a1.072 1.072 0 10-1.516-1.517l-3.07 3.07-1.399-1.4a1.073 1.073 0 00-1.516 1.517l2.158 2.157z"
                      ></path>
                      <path
                        fill="url(#paint2_linear_11873_61937)"
                        d="M18.509 27.983a1.073 1.073 0 001.516 0l3.827-3.827a1.072 1.072 0 10-1.516-1.517l-3.07 3.07-1.399-1.4a1.073 1.073 0 00-1.516 1.517l2.158 2.157z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M20.101 33.82c4.693 0 8.51-3.817 8.51-8.51s-3.817-8.511-8.51-8.511-8.511 3.818-8.511 8.51c0 4.694 3.818 8.512 8.511 8.512zm0-14.877a6.374 6.374 0 016.367 6.367 6.374 6.374 0 01-6.367 6.367 6.374 6.374 0 01-6.367-6.367 6.374 6.374 0 016.367-6.367z"
                      ></path>
                      <path
                        fill="url(#paint3_linear_11873_61937)"
                        d="M20.101 33.82c4.693 0 8.51-3.817 8.51-8.51s-3.817-8.511-8.51-8.511-8.511 3.818-8.511 8.51c0 4.694 3.818 8.512 8.511 8.512zm0-14.877a6.374 6.374 0 016.367 6.367 6.374 6.374 0 01-6.367 6.367 6.374 6.374 0 01-6.367-6.367 6.374 6.374 0 016.367-6.367z"
                      ></path>
                      <path
                        fill="url(#paint4_linear_11873_61937)"
                        d="M20.101 33.82c4.693 0 8.51-3.817 8.51-8.51s-3.817-8.511-8.51-8.511-8.511 3.818-8.511 8.51c0 4.694 3.818 8.512 8.511 8.512zm0-14.877a6.374 6.374 0 016.367 6.367 6.374 6.374 0 01-6.367 6.367 6.374 6.374 0 01-6.367-6.367 6.374 6.374 0 016.367-6.367z"
                      ></path>
                      <defs>
                        <linearGradient
                          id="paint0_linear_11873_61937"
                          x1="20.001"
                          x2="20.001"
                          y1="40.151"
                          y2="0.951"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#33A9FF"></stop>
                          <stop offset="1" stopColor="#6FFA8E"></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_11873_61937"
                          x1="20.101"
                          x2="20.101"
                          y1="33.821"
                          y2="16.799"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#42A9FF"></stop>
                          <stop offset="1" stopColor="#83D1FC"></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint2_linear_11873_61937"
                          x1="20.101"
                          x2="20.101"
                          y1="33.821"
                          y2="16.799"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#33A9FF"></stop>
                          <stop offset="1" stopColor="#A9FBCA"></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint3_linear_11873_61937"
                          x1="20.101"
                          x2="20.101"
                          y1="33.821"
                          y2="16.799"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#42A9FF"></stop>
                          <stop offset="1" stopColor="#83D1FC"></stop>
                        </linearGradient>
                        <linearGradient
                          id="paint4_linear_11873_61937"
                          x1="20.101"
                          x2="20.101"
                          y1="33.821"
                          y2="16.799"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#33A9FF"></stop>
                          <stop offset="1" stopColor="#A9FBCA"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="RewardsDropDown_rewards-content-text-container">
                    <span className="RewardsDropDown_rewards-content-text">
                      Daily Bonus
                    </span>
                    <div className="ValueDisplay_value-display">
                      <div className="alueDisplay_currency-icon">
                        <Image
                          src={`/default/images/currency/USD.png`} // Adjust path and naming if needed
                          width={15}
                          height={15}
                          alt={"currency"}
                        />
                      </div>
                      <span>0.00</span>
                    </div>
                  </div>
                </div>
                <button className=" Button_standard-button" disabled>
                  <div className="Button_inner-content">
                    <span>Claim</span>
                  </div>
                </button>
              </li>
              <li className="RewardsDropDown_rewards-content-row">
                <div className="RewardsDropDown_left-side">
                  <div className="RewardsDropDown_rewards-content-image">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 38.3 39.2"
                      width="42"
                      height="42"
                    >
                      <defs>
                        <linearGradient
                          id="linear-gradient"
                          x1="19.15"
                          x2="19.15"
                          y1="0.89"
                          y2="40.09"
                          gradientTransform="matrix(1 0 0 -1 0 40.09)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#33a9ff"></stop>
                          <stop offset="1" stopColor="#6ffa8e"></stop>
                        </linearGradient>
                        <linearGradient
                          id="linear-gradient-2"
                          x1="18.75"
                          x2="18.75"
                          y1="5.36"
                          y2="26.36"
                          gradientTransform="matrix(1 0 0 -1 0 40.09)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#42a9ff"></stop>
                          <stop offset="1" stopColor="#83d1fc"></stop>
                        </linearGradient>
                        <linearGradient
                          id="linear-gradient-3"
                          x1="18.75"
                          x2="18.75"
                          y1="5.36"
                          y2="26.36"
                          gradientTransform="matrix(1 0 0 -1 0 40.09)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#33a9ff"></stop>
                          <stop offset="1" stopColor="#a9fbca"></stop>
                        </linearGradient>
                        <mask
                          id="mask"
                          width="11"
                          height="14"
                          x="13.32"
                          y="17.73"
                          maskUnits="userSpaceOnUse"
                        >
                          <g strokeWidth="0">
                            <path
                              fill="#fff"
                              d="M13.32 17.73H24.32V31.73H13.32z"
                            ></path>
                            <path d="M16.39 30.73l4.92-11.03.58.99h-6.76l1.06-1.07v3.1h-2.06v-3.9h9.26v1.48l-4.63 10.43h-2.37z"></path>
                          </g>
                        </mask>
                        <linearGradient
                          id="linear-gradient-4"
                          x1="18.75"
                          x2="18.75"
                        ></linearGradient>
                      </defs>
                      <path
                        fill="url(#linear-gradient)"
                        strokeWidth="0"
                        d="M34.56 2.46h-2.11V1.15a1.16 1.16 0 00-2.32 0v1.31h-2.27V1.15a1.16 1.16 0 00-2.32 0v1.31H12.76V1.15a1.16 1.16 0 00-2.32 0v1.31H8.17V1.15a1.16 1.16 0 00-2.32 0v1.31H3.74C1.68 2.46 0 4.14 0 6.2v29.25c0 2.06 1.68 3.74 3.74 3.74h30.81c2.06 0 3.74-1.68 3.74-3.74V6.21c0-2.06-1.68-3.74-3.74-3.74zm1.42 33c0 .79-.64 1.43-1.43 1.43H3.74c-.79 0-1.43-.64-1.43-1.43V12.09h33.67v23.37zM2.31 6.21c0-.79.64-1.43 1.43-1.43h2.11v1.31a1.16 1.16 0 002.32 0V4.78h2.27v1.31a1.16 1.16 0 002.32 0V4.78h12.78v1.31a1.16 1.16 0 002.32 0V4.78h2.27v1.31a1.16 1.16 0 002.32 0V4.78h2.11c.79 0 1.43.64 1.43 1.43v3.57H2.31V6.21z"
                      ></path>
                      <path
                        fill="#fff"
                        strokeWidth="0"
                        d="M16.39 30.73l4.92-11.03.58.99h-6.76l1.06-1.07v3.1h-2.06v-3.9h9.26v1.48l-4.63 10.43h-2.37z"
                      ></path>
                      <path
                        fill="url(#linear-gradient-2)"
                        strokeWidth="0"
                        d="M16.39 30.73l4.92-11.03.58.99h-6.76l1.06-1.07v3.1h-2.06v-3.9h9.26v1.48l-4.63 10.43h-2.37z"
                      ></path>
                      <path
                        fill="url(#linear-gradient-3)"
                        strokeWidth="0"
                        d="M16.39 30.73l4.92-11.03.58.99h-6.76l1.06-1.07v3.1h-2.06v-3.9h9.26v1.48l-4.63 10.43h-2.37z"
                      ></path>
                      <g mask="url(#mask)">
                        <path
                          fill="url(#linear-gradient-4)"
                          strokeWidth="0"
                          d="M16.39 30.73l-.23-.1-.16.36h.39v-.26zm4.92-11.03l.22-.13-.25-.43-.2.45.23.1zm.57.99v.26h.45l-.23-.38-.22.13zm-6.75 0l-.18-.18-.43.43h.61v-.26zm1.05-1.07h.26V19l-.44.44.18.18zm0 3.09v.26h.26v-.26h-.26zm-2.06 0h-.26v.26h.26v-.26zm0-3.89v-.26h-.26v.26h.26zm9.26 0h.26v-.26h-.26v.26zm0 1.48l.23.1.02-.05v-.05h-.26zm-4.63 10.43v.26h.17l.07-.15-.23-.1zm-2.13.11l4.92-11.03-.47-.21-4.92 11.03.47.21zm4.47-11.01l.58.99.44-.26-.58-.99-.44.26zm.79.6h-6.76v.51h6.76v-.51zm-6.57.44l1.06-1.07-.36-.36-1.06 1.07.36.36zm.62-1.25v3.1h.51v-3.1h-.51zm.25 2.84h-2.06v.51h2.06v-.51zm-1.8.25v-3.9h-.51v3.9h.51zm-.26-3.64h9.26v-.51h-9.26v.51zm9.01-.25v1.48h.51v-1.48h-.51zm.02 1.37l-4.63 10.43.47.21 4.63-10.43-.47-.21zm-4.4 10.29h-2.37v.51h2.37v-.51z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="RewardsDropDown_rewards-content-text-container">
                    <span className="RewardsDropDown_rewards-content-text">
                      Weekly Bonus
                    </span>
                    <div className="ValueDisplay_value-display">
                      <div className="alueDisplay_currency-icon">
                        <Image
                          src={`/default/images/currency/USD.png`} // Adjust path and naming if needed
                          width={15}
                          height={15}
                          alt={"currency"}
                        />
                      </div>
                      <span>0.00</span>
                    </div>
                  </div>
                </div>
                <button className=" Button_standard-button" disabled>
                  <div className="Button_inner-content">
                    <span>Claim</span>
                  </div>
                </button>
              </li>
              <li className="RewardsDropDown_rewards-content-row">
                <div className="RewardsDropDown_left-side">
                  <div className="RewardsDropDown_rewards-content-image">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      href="http://www.w3.org/1999/xlink"
                      viewBox="0 0 38.3 39.2"
                      width="42"
                      height="42"
                    >
                      <defs>
                        <linearGradient
                          id="linear-gradient"
                          x1="19.15"
                          x2="19.15"
                          y1="0.89"
                          y2="40.09"
                          gradientTransform="matrix(1 0 0 -1 0 40.09)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#33a9ff"></stop>
                          <stop offset="1" stopColor="#6ffa8e"></stop>
                        </linearGradient>
                        <linearGradient
                          id="linear-gradient-2"
                          x1="19.18"
                          x2="19.18"
                          y1="5.4"
                          y2="26.4"
                          gradientTransform="matrix(1 0 0 -1 0 40.09)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#42a9ff"></stop>
                          <stop offset="1" stopColor="#83d1fc"></stop>
                        </linearGradient>
                        <linearGradient
                          id="linear-gradient-3"
                          x1="19.18"
                          x2="19.18"
                          y1="5.4"
                          y2="26.4"
                          gradientTransform="matrix(1 0 0 -1 0 40.09)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#33a9ff"></stop>
                          <stop offset="1" stopColor="#a9fbca"></stop>
                        </linearGradient>
                        <mask
                          id="mask"
                          width="22"
                          height="14"
                          x="8.55"
                          y="17.7"
                          maskUnits="userSpaceOnUse"
                        >
                          <g strokeWidth="0">
                            <path
                              fill="#fff"
                              d="M8.55 17.7H30.55V31.7H8.55z"
                            ></path>
                            <path d="M13.36 30.87c-.84 0-1.66-.12-2.47-.36-.79-.25-1.46-.59-2.01-1.02l.95-1.72c.43.35.95.64 1.57.85.61.22 1.25.32 1.92.32.79 0 1.41-.16 1.86-.48.44-.33.66-.77.66-1.33s-.2-.98-.61-1.29c-.41-.32-1.07-.48-1.97-.48h-1.09v-1.51l3.4-4.05.29.83h-6.4v-1.86h8.12v1.48l-3.4 4.05-1.16-.68h.66c1.46 0 2.56.33 3.29.99.74.65 1.11 1.48 1.11 2.5 0 .67-.17 1.29-.51 1.86S16.71 30 16 30.35c-.69.34-1.57.51-2.64.51zm11.14 0c-.94 0-1.79-.24-2.55-.71-.75-.48-1.34-1.17-1.77-2.08-.43-.92-.65-2.03-.65-3.34s.22-2.41.65-3.32c.43-.92 1.02-1.62 1.77-2.09.76-.48 1.61-.71 2.55-.71s1.8.24 2.55.71c.75.48 1.34 1.17 1.77 2.09.44.91.66 2.01.66 3.32s-.22 2.42-.66 3.34c-.43.91-1.02 1.6-1.77 2.08s-1.6.71-2.55.71zm0-1.93c.56 0 1.04-.15 1.45-.44.41-.31.73-.77.95-1.4.24-.62.36-1.41.36-2.37s-.12-1.75-.36-2.37c-.23-.62-.54-1.08-.95-1.38-.41-.31-.89-.46-1.45-.46s-1.01.15-1.43.46c-.41.3-.73.75-.97 1.38-.23.61-.34 1.4-.34 2.37s.11 1.74.34 2.37c.24.62.56 1.09.97 1.4.42.3.9.44 1.43.44z"></path>
                          </g>
                        </mask>
                        <linearGradient
                          id="linear-gradient-4"
                          x1="19.15"
                          x2="19.15"
                          href="#linear-gradient-2"
                        ></linearGradient>
                      </defs>
                      <path
                        fill="url(#linear-gradient)"
                        strokeWidth="0"
                        d="M34.56 2.46h-2.11V1.15a1.16 1.16 0 00-2.32 0v1.31h-2.27V1.15a1.16 1.16 0 00-2.32 0v1.31H12.76V1.15a1.16 1.16 0 00-2.32 0v1.31H8.17V1.15a1.16 1.16 0 00-2.32 0v1.31H3.74C1.68 2.46 0 4.14 0 6.2v29.25c0 2.06 1.68 3.74 3.74 3.74h30.81c2.06 0 3.74-1.68 3.74-3.74V6.21c0-2.06-1.68-3.74-3.74-3.74zm1.42 33c0 .79-.64 1.43-1.43 1.43H3.74c-.79 0-1.43-.64-1.43-1.43V12.09h33.67v23.37zM2.31 6.21c0-.79.64-1.43 1.43-1.43h2.11v1.31a1.16 1.16 0 002.32 0V4.78h2.27v1.31a1.16 1.16 0 002.32 0V4.78h12.78v1.31a1.16 1.16 0 002.32 0V4.78h2.27v1.31a1.16 1.16 0 002.32 0V4.78h2.11c.79 0 1.43.64 1.43 1.43v3.57H2.31V6.21z"
                      ></path>
                      <path
                        fill="#fff"
                        strokeWidth="0"
                        d="M13.36 30.87c-.84 0-1.66-.12-2.47-.36-.79-.25-1.46-.59-2.01-1.02l.95-1.72c.43.35.95.64 1.57.85.61.22 1.25.32 1.92.32.79 0 1.41-.16 1.86-.48.44-.33.66-.77.66-1.33s-.2-.98-.61-1.29c-.41-.32-1.07-.48-1.97-.48h-1.09v-1.51l3.4-4.05.29.83h-6.4v-1.86h8.12v1.48l-3.4 4.05-1.16-.68h.66c1.46 0 2.56.33 3.29.99.74.65 1.11 1.48 1.11 2.5 0 .67-.17 1.29-.51 1.86S16.71 30 16 30.35c-.69.34-1.57.51-2.64.51zm11.14 0c-.94 0-1.79-.24-2.55-.71-.75-.48-1.34-1.17-1.77-2.08-.43-.92-.65-2.03-.65-3.34s.22-2.41.65-3.32c.43-.92 1.02-1.62 1.77-2.09.76-.48 1.61-.71 2.55-.71s1.8.24 2.55.71c.75.48 1.34 1.17 1.77 2.09.44.91.66 2.01.66 3.32s-.22 2.42-.66 3.34c-.43.91-1.02 1.6-1.77 2.08s-1.6.71-2.55.71zm0-1.93c.56 0 1.04-.15 1.45-.44.41-.31.73-.77.95-1.4.24-.62.36-1.41.36-2.37s-.12-1.75-.36-2.37c-.23-.62-.54-1.08-.95-1.38-.41-.31-.89-.46-1.45-.46s-1.01.15-1.43.46c-.41.3-.73.75-.97 1.38-.23.61-.34 1.4-.34 2.37s.11 1.74.34 2.37c.24.62.56 1.09.97 1.4.42.3.9.44 1.43.44z"
                      ></path>
                      <path
                        fill="url(#linear-gradient-2)"
                        strokeWidth="0"
                        d="M13.36 30.87c-.84 0-1.66-.12-2.47-.36-.79-.25-1.46-.59-2.01-1.02l.95-1.72c.43.35.95.64 1.57.85.61.22 1.25.32 1.92.32.79 0 1.41-.16 1.86-.48.44-.33.66-.77.66-1.33s-.2-.98-.61-1.29c-.41-.32-1.07-.48-1.97-.48h-1.09v-1.51l3.4-4.05.29.83h-6.4v-1.86h8.12v1.48l-3.4 4.05-1.16-.68h.66c1.46 0 2.56.33 3.29.99.74.65 1.11 1.48 1.11 2.5 0 .67-.17 1.29-.51 1.86S16.71 30 16 30.35c-.69.34-1.57.51-2.64.51zm11.14 0c-.94 0-1.79-.24-2.55-.71-.75-.48-1.34-1.17-1.77-2.08-.43-.92-.65-2.03-.65-3.34s.22-2.41.65-3.32c.43-.92 1.02-1.62 1.77-2.09.76-.48 1.61-.71 2.55-.71s1.8.24 2.55.71c.75.48 1.34 1.17 1.77 2.09.44.91.66 2.01.66 3.32s-.22 2.42-.66 3.34c-.43.91-1.02 1.6-1.77 2.08s-1.6.71-2.55.71zm0-1.93c.56 0 1.04-.15 1.45-.44.41-.31.73-.77.95-1.4.24-.62.36-1.41.36-2.37s-.12-1.75-.36-2.37c-.23-.62-.54-1.08-.95-1.38-.41-.31-.89-.46-1.45-.46s-1.01.15-1.43.46c-.41.3-.73.75-.97 1.38-.23.61-.34 1.4-.34 2.37s.11 1.74.34 2.37c.24.62.56 1.09.97 1.4.42.3.9.44 1.43.44z"
                      ></path>
                      <path
                        fill="url(#linear-gradient-3)"
                        strokeWidth="0"
                        d="M13.36 30.87c-.84 0-1.66-.12-2.47-.36-.79-.25-1.46-.59-2.01-1.02l.95-1.72c.43.35.95.64 1.57.85.61.22 1.25.32 1.92.32.79 0 1.41-.16 1.86-.48.44-.33.66-.77.66-1.33s-.2-.98-.61-1.29c-.41-.32-1.07-.48-1.97-.48h-1.09v-1.51l3.4-4.05.29.83h-6.4v-1.86h8.12v1.48l-3.4 4.05-1.16-.68h.66c1.46 0 2.56.33 3.29.99.74.65 1.11 1.48 1.11 2.5 0 .67-.17 1.29-.51 1.86S16.71 30 16 30.35c-.69.34-1.57.51-2.64.51zm11.14 0c-.94 0-1.79-.24-2.55-.71-.75-.48-1.34-1.17-1.77-2.08-.43-.92-.65-2.03-.65-3.34s.22-2.41.65-3.32c.43-.92 1.02-1.62 1.77-2.09.76-.48 1.61-.71 2.55-.71s1.8.24 2.55.71c.75.48 1.34 1.17 1.77 2.09.44.91.66 2.01.66 3.32s-.22 2.42-.66 3.34c-.43.91-1.02 1.6-1.77 2.08s-1.6.71-2.55.71zm0-1.93c.56 0 1.04-.15 1.45-.44.41-.31.73-.77.95-1.4.24-.62.36-1.41.36-2.37s-.12-1.75-.36-2.37c-.23-.62-.54-1.08-.95-1.38-.41-.31-.89-.46-1.45-.46s-1.01.15-1.43.46c-.41.3-.73.75-.97 1.38-.23.61-.34 1.4-.34 2.37s.11 1.74.34 2.37c.24.62.56 1.09.97 1.4.42.3.9.44 1.43.44z"
                      ></path>
                      <g mask="url(#mask)">
                        <path
                          fill="url(#linear-gradient-4)"
                          strokeWidth="0"
                          d="M10.9 30.51l-.08.24.07-.24zm-2.01-1.02l-.22-.12-.11.19.17.13.16-.2zm.95-1.72l.16-.2-.24-.19-.15.27.22.12zm1.57.85l.08-.24-.08.24zm3.77-.15l.15.21-.15-.21zm.06-2.62l.16-.2-.16.2zm-3.07-.48h-.26v.26h.26v-.26zm0-1.52l-.2-.16-.06.07v.09h.26zm3.41-4.05l.24-.08-.15-.42-.29.34.2.16zm.29.84v.26h.36l-.12-.34-.24.08zm-6.4 0h-.26v.26h.26v-.26zm0-1.86v-.26h-.26v.26h.26zm8.11 0h.26v-.26h-.26v.26zm0 1.48l.2.16.06-.07v-.09h-.26zm-3.4 4.05l-.13.22.19.11.14-.17-.2-.16zm-1.16-.68v-.26h-.94l.81.48.13-.22zm3.95.99l-.17.19.17-.19zm.6 4.36l.22.13-.22-.13zM16 30.36l.11.23-.11-.23zm-2.64.25c-.82 0-1.61-.12-2.4-.35l-.14.49c.83.25 1.68.37 2.54.37v-.51zm-2.39-.34c-.77-.24-1.41-.57-1.93-.98l-.32.4c.57.45 1.27.81 2.09 1.06l.15-.49zm-1.86-.66l.95-1.72-.45-.25-.95 1.72.45.25zm.57-1.64c.46.37 1.01.67 1.64.89l.17-.48c-.59-.21-1.08-.48-1.49-.81l-.32.4zm1.64.89c.64.23 1.31.34 2.01.34v-.51c-.64 0-1.25-.1-1.84-.31l-.17.48zm2.01.34c.82 0 1.5-.16 2-.52l-.3-.41c-.38.28-.94.43-1.71.43v.51zm2.01-.53c.51-.38.77-.9.77-1.53h-.51c0 .48-.18.84-.56 1.12l.3.41zm.76-1.53c0-.62-.24-1.13-.71-1.5l-.31.4c.34.27.51.62.51 1.09h.51zm-.71-1.5c-.48-.37-1.2-.53-2.13-.53v.51c.89 0 1.48.16 1.82.42l.31-.4zm-2.13-.53h-1.09v.51h1.09v-.51zm-.83.26v-1.51h-.51v1.51h.51zm-.06-1.35l3.4-4.05-.39-.33-3.4 4.05.39.33zm2.96-4.13l.29.83.48-.17-.29-.83-.48.17zm.54.49h-6.4v.51h6.4v-.51zm-6.15.26v-1.86h-.51v1.86h.51zm-.25-1.6h8.12v-.51H9.47v.51zm7.86-.26v1.48h.51v-1.48h-.51zm.06 1.32l-3.4 4.05.39.33 3.4-4.05-.39-.33zm-3.08 3.99l-1.16-.68-.26.44 1.16.68.26-.44zm-1.29-.2h.66v-.51h-.66v.51zm.67 0c1.43 0 2.45.32 3.11.92l.34-.38c-.79-.72-1.96-1.05-3.46-1.05v.51zm3.11.92c.68.6 1.02 1.36 1.02 2.31h.51c0-1.09-.4-2-1.19-2.69l-.34.38zm1.02 2.31c0 .62-.16 1.2-.47 1.72l.44.26c.36-.61.55-1.27.55-1.99h-.51zm-.47 1.73c-.31.52-.79.95-1.46 1.28l.23.46c.74-.37 1.3-.86 1.67-1.48l-.44-.26zm-1.46 1.28c-.65.32-1.48.48-2.53.48v.51c1.09 0 2.01-.17 2.75-.54l-.23-.46zm6.05.02l-.14.22.14-.22zm-1.77-2.07l-.23.11.23-.11zm0-6.66l.23.11-.23-.11zm1.77-2.09l-.14-.22.14.22zm5.11 0l.14-.22-.14.22zm1.77 2.09l-.23.11.23-.11zm0 6.66l-.23-.11.23.11zm-1.77 2.07l-.14-.22.14.22zm-1.11-1.65l.15.21-.15-.21zm.96-1.4l-.24-.09.24.09zm0-4.73l-.24.09.24-.09zm-.96-1.38l-.15.2.15-.2zm-2.87 0l.15.21-.15-.21zm-.97 1.38l-.24-.09.24.09zm0 4.73l-.24.09.24-.09zm.97 1.4l-.15.2.15-.2zm1.43 2.11c-.9 0-1.7-.23-2.42-.68l-.27.43c.8.5 1.7.75 2.69.75v-.51zm-2.42-.67c-.7-.45-1.26-1.1-1.68-1.97l-.46.22c.45.95 1.07 1.68 1.86 2.18l.27-.43zm-1.68-1.97c-.41-.88-.62-1.95-.62-3.23h-.51c0 1.33.22 2.48.67 3.44l.46-.22zm-.62-3.23c0-1.28.21-2.34.62-3.21l-.46-.22c-.45.95-.67 2.1-.67 3.43h.51zm.62-3.21c.41-.88.97-1.54 1.68-1.99l-.27-.43c-.8.51-1.42 1.24-1.86 2.2l.46.22zm1.68-1.99a4.46 4.46 0 012.42-.68v-.51c-.99 0-1.89.25-2.69.75l.27.43zm2.42-.67c.91 0 1.71.23 2.42.67l.27-.43c-.79-.5-1.69-.75-2.69-.75v.51zm2.41.67c.7.45 1.26 1.1 1.68 1.99l.46-.22c-.45-.96-1.07-1.69-1.86-2.2l-.27.43zm1.68 1.99c.42.86.64 1.93.64 3.21h.51c0-1.33-.23-2.48-.69-3.43l-.46.22zm.64 3.21c0 1.28-.22 2.35-.64 3.23l.46.22c.46-.96.69-2.11.69-3.45h-.51zm-.64 3.23c-.41.87-.97 1.52-1.68 1.97l.27.43c.79-.51 1.41-1.24 1.86-2.18l-.46-.22zm-1.68 1.97c-.7.45-1.51.68-2.42.68v.51c1 0 1.9-.25 2.69-.75l-.27-.43zm-2.41-.74c.6 0 1.14-.16 1.6-.49l-.3-.41c-.36.26-.79.39-1.3.39v.51zm1.6-.5c.46-.34.8-.86 1.04-1.51l-.48-.17c-.22.59-.51 1.01-.87 1.28l.31.41zm1.03-1.5c.25-.66.37-1.48.37-2.46h-.51c0 .93-.12 1.69-.34 2.27l.48.18zm.38-2.46c0-.98-.12-1.81-.37-2.46l-.48.19c.22.57.34 1.33.34 2.27h.51zm-.37-2.45c-.24-.66-.58-1.17-1.04-1.5l-.3.41c.36.26.65.67.86 1.26l.48-.17zm-1.04-1.5c-.46-.34-.99-.51-1.6-.51v.51c.51 0 .93.14 1.29.41l.31-.41zm-1.6-.51c-.59 0-1.12.17-1.58.51l.3.41c.37-.27.8-.41 1.28-.41v-.51zm-1.58.51c-.46.33-.81.84-1.06 1.49l.48.18c.23-.59.52-1.01.88-1.26l-.3-.41zm-1.06 1.49c-.24.65-.36 1.47-.36 2.45h.51c0-.95.11-1.7.32-2.28l-.48-.18zm-.36 2.46c0 .97.12 1.79.36 2.45l.48-.17c-.21-.59-.33-1.34-.33-2.28h-.51zm.36 2.46c.25.66.6 1.17 1.06 1.51l.31-.41c-.36-.27-.66-.69-.88-1.28l-.48.18zm1.06 1.51c.46.33.99.49 1.58.49v-.51c-.48 0-.91-.13-1.28-.4l-.29.42z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="RewardsDropDown_rewards-content-text-container">
                    <span className="RewardsDropDown_rewards-content-text">
                      Monthly Bonus
                    </span>
                    <div className="ValueDisplay_value-display">
                      <div className="alueDisplay_currency-icon">
                        <Image
                          src={`/default/images/currency/USD.png`} // Adjust path and naming if needed
                          width={15}
                          height={15}
                          alt={"currency"}
                        />
                      </div>
                      <span>0.00</span>
                    </div>
                  </div>
                </div>
                <button className=" Button_standard-button" disabled>
                  <div className="Button_inner-content">
                    <span>Claim</span>
                  </div>
                </button>
              </li>
            </ul>
            <div className="RewardsDropDown_simple-line"></div>
            <div>
              <Link
                href="/"
                className="Button_all-rewards Button_standard-button"
              >
                <div className="Button_inner-content ">
                  <span>All Rewards</span>
                </div>
              </Link>
            </div>
          </div>
        )}
        {/* <!-- Dropdown End --> */}
      </div>
    </ClickOutside>
  );
};

export default DropdownBonus;
