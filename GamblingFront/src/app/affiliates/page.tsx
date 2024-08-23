"use client";
// import { metadata } from "../page";
import { useState } from "react";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Image from "next/image";
import { useAppContext } from "@/hooks/AppContext";
import { backendUrl } from "@/anchor/global";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
const Affiliates = () => {
  const { accessToken } = useAppContext();
  const [referralLink, setReferralLink] = useState("");
  const [affiliateCode, setAffiliateCode] = useState("");
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(
      () => {
        toast.success("Copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy: ", err);
      },
    );
  };

  // const setCode = async () => {
  //   try {
  //     if (affiliateCode == "") alert("Invalid value: Please enter the code");
  //     alert(affiliateCode);
  //     if (accessToken == "") return;
  //     const params = new URLSearchParams({
  //       affiliatecode: affiliateCode,
  //     });
  //     const response = await fetch(
  //       `${backendUrl}/backend/authorizeapi/createAffiliater?{param.toString()}`,
  //     );
  //     console.log("setCodd", response);
  //     const result = await response.json();
  //     if (result.status == 0) {
  //     }
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   }
  // };
  const setCode = async () => {
    try {
      if (affiliateCode == "")
        toast.error("Invalid value: Please enter the code");

      if (accessToken == "") return;
      const response = await fetch(`${backendUrl}/backend/authorizeapi`, {
        method: "POST",

        headers: {
          "X-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "CreateAffiliater",
          affiliaterCode: affiliateCode,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.status === 0) {
        toast.success("success");
      } else {
        toast.warn("Operation failed");
        throw new Error("Unexpected status code");
      }
    } catch (error) {
      console.error("Error fetching game data:", error);
    } finally {
      console.log(Response);
    }
  };
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <div className="grid gap-8">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Affiliates
              </h3>
              <Link href="/">
                <div className="close-button">
                  <svg width={16} height={16}>
                    <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                  </svg>
                </div>
              </Link>
            </div>
            <div></div>
            <div className="p-7">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Set Code
                  </label>
                  <div className="input-inline-btn-container">
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-7.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="affiliateCode"
                      id="affiliateCode"
                      placeholder=""
                      defaultValue=""
                      value={affiliateCode}
                      onChange={(e) => {
                        setAffiliateCode(e.target.value);
                      }}
                    />
                    <div className="Input_btn-container">
                      <button className="input-btn" onClick={setCode}>
                        <div className="Button_inner-content">
                          <span style={{ fontSize: "13px" }}>Set Code</span>
                        </div>
                        <div className="Button_gradient-item"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Your Referral Link
                  </label>
                  <div className="input-inline-btn-container">
                    <div
                      className="Input_btn-container"
                      style={{ width: "100%" }}
                    >
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="linkurl"
                        id="linkurl"
                        defaultValue={referralLink}
                      />
                      <button onClick={handleCopy}>
                        <div className="">
                          <i className="fa-regular fa-copy" />
                        </div>
                        <div className="Button_gradient-item"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5.5 flex gap-5">
                <div className="affiliates-section">
                  <div className="affiliates-left">
                    <div>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.37109 12.4732C4.37109 10.9595 4.37148 9.85422 4.44268 8.98279C4.5134 8.11719 4.65149 7.52642 4.90258 7.03362C5.3701 6.11608 6.11608 5.3701 7.03362 4.90258C7.52642 4.65149 8.11719 4.5134 8.98279 4.44268C9.85422 4.37148 10.9595 4.37109 12.4732 4.37109H27.527C29.0408 4.37109 30.146 4.37148 31.0175 4.44268C31.8831 4.5134 32.4738 4.65149 32.9666 4.90258C33.8842 5.3701 34.6302 6.11608 35.0977 7.03362C35.3488 7.52642 35.4868 8.11719 35.5576 8.98279C35.6288 9.85422 35.6292 10.9595 35.6292 12.4732V27.527C35.6292 29.0408 35.6288 30.146 35.5576 31.0175C35.4868 31.8831 35.3488 32.4738 35.0977 32.9666C34.6302 33.8842 33.8842 34.6302 32.9666 35.0977C32.4738 35.3488 31.8831 35.4868 31.0175 35.5576C30.146 35.6288 29.0408 35.6292 27.527 35.6292H12.4732C10.9595 35.6292 9.85422 35.6288 8.98279 35.5576C8.11719 35.4868 7.52642 35.3488 7.03362 35.0977C6.11608 34.6302 5.3701 33.8842 4.90258 32.9666C4.65149 32.4738 4.5134 31.8831 4.44268 31.0175C4.37148 30.146 4.37109 29.0408 4.37109 27.527V12.4732ZM32.9273 9.97227C33.3276 8.77133 32.6786 7.47326 31.4776 7.07295C30.2767 6.67263 28.9786 7.32167 28.5783 8.52261L25.0359 19.1498C24.7322 20.0611 23.5756 20.3341 22.8964 19.6549L20.3454 17.1038C17.2564 14.0149 11.9968 15.2565 10.6154 19.4007L7.07295 30.028C6.67263 31.2289 7.32167 32.527 8.52261 32.9273C9.72355 33.3276 11.0216 32.6786 11.4219 31.4776L14.9643 20.8504C15.2681 19.9392 16.4246 19.6661 17.1038 20.3454L19.6549 22.8964C22.7438 25.9853 28.0035 24.7437 29.3849 20.5995L32.9273 9.97227Z"
                          fill="url(#paint0_linear_241_35835)"
                          stroke="url(#paint1_linear_241_35835)"
                        ></path>
                        <defs>
                          <linearGradient
                            id="paint0_linear_241_35835"
                            x1="20.0001"
                            y1="3.87109"
                            x2="20.0001"
                            y2="36.1292"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#3D4364"></stop>
                            <stop
                              offset="1"
                              stop-color="#3D4364"
                              stop-opacity="0"
                            ></stop>
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_241_35835"
                            x1="20.0001"
                            y1="3.87109"
                            x2="20.0001"
                            y2="27.5606"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#5C6391"></stop>
                            <stop
                              offset="1"
                              stop-color="#5C6390"
                              stop-opacity="0"
                            ></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="affiliates-text">
                      <h3>Total Referrals</h3>
                      <span>0</span>
                    </div>
                  </div>
                </div>
                <div className="affiliates-section">
                  <div className="affiliates-left">
                    <div>
                      <svg
                        width="41"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.35156 14.6665C4.35156 13.2581 4.35195 12.2319 4.41802 11.4232C4.48362 10.6204 4.61145 10.0761 4.84203 9.62355C5.27346 8.77682 5.96188 8.0884 6.80861 7.65697C7.26115 7.42639 7.80545 7.29856 8.60829 7.23296C9.41697 7.16689 10.4432 7.1665 11.8516 7.1665H29.1849C30.5933 7.1665 31.6195 7.16689 32.4282 7.23296C33.231 7.29856 33.7753 7.42639 34.2279 7.65697C35.0746 8.0884 35.763 8.77682 36.1944 9.62355C36.425 10.0761 36.5528 10.6204 36.6184 11.4232C36.6819 12.1997 36.6848 13.1766 36.6849 14.4998H28.8516C25.814 14.4998 23.3516 16.9623 23.3516 19.9998C23.3516 23.0374 25.814 25.4998 28.8516 25.4998H36.6849C36.6848 26.823 36.6819 27.8 36.6184 28.5764C36.5528 29.3793 36.425 29.9236 36.1944 30.3761C35.763 31.2229 35.0746 31.9113 34.2279 32.3427C33.7753 32.5733 33.231 32.7011 32.4282 32.7667C31.6195 32.8328 30.5933 32.8332 29.1849 32.8332H11.8516C10.4432 32.8332 9.41697 32.8328 8.60829 32.7667C7.80545 32.7011 7.26115 32.5733 6.80861 32.3427C5.96188 31.9113 5.27346 31.2229 4.84203 30.3761C4.61145 29.9236 4.48362 29.3793 4.41802 28.5764C4.35195 27.7678 4.35156 26.7416 4.35156 25.3332V14.6665Z"
                          fill="url(#paint0_linear_241_35993)"
                          stroke="url(#paint1_linear_241_35993)"
                        ></path>
                        <path
                          d="M30.0169 20.0002C30.0169 20.6445 29.4946 21.1668 28.8503 21.1668C28.2059 21.1668 27.6836 20.6445 27.6836 20.0002C27.6836 19.3558 28.2059 18.8335 28.8503 18.8335C29.4946 18.8335 30.0169 19.3558 30.0169 20.0002Z"
                          fill="url(#paint2_linear_241_35993)"
                          stroke="url(#paint3_linear_241_35993)"
                        ></path>
                        <defs>
                          <linearGradient
                            id="paint0_linear_241_35993"
                            x1="20.5182"
                            y1="6.6665"
                            x2="20.5182"
                            y2="33.3332"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#3D4364"></stop>
                            <stop
                              offset="1"
                              stop-color="#3D4364"
                              stop-opacity="0"
                            ></stop>
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_241_35993"
                            x1="20.5182"
                            y1="6.6665"
                            x2="20.5182"
                            y2="26.2498"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#5C6391"></stop>
                            <stop
                              offset="1"
                              stop-color="#5C6390"
                              stop-opacity="0"
                            ></stop>
                          </linearGradient>
                          <linearGradient
                            id="paint2_linear_241_35993"
                            x1="28.8503"
                            y1="18.3335"
                            x2="28.8503"
                            y2="21.6668"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#3D4364"></stop>
                            <stop
                              offset="1"
                              stop-color="#3D4364"
                              stop-opacity="0"
                            ></stop>
                          </linearGradient>
                          <linearGradient
                            id="paint3_linear_241_35993"
                            x1="28.8503"
                            y1="18.3335"
                            x2="28.8503"
                            y2="20.7814"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#5C6391"></stop>
                            <stop
                              offset="1"
                              stop-color="#5C6390"
                              stop-opacity="0"
                            ></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="affiliates-text">
                      <h3>Total Wagered</h3>
                      <div className="value-display">
                        <div className="display-icon">
                          <Image
                            src={"/images/project/aud.png"}
                            width={20}
                            height={20}
                            alt="Product"
                          />
                        </div>
                        <span>0.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="affiliates-section">
                  <div className="affiliates-left">
                    <div>
                      <svg
                        width="49"
                        height="49"
                        viewBox="0 0 49 49"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.2096 38.1988V37.7284L12.7401 37.6997C11.6091 37.6306 10.8697 37.4778 10.2603 37.1673C9.2451 36.65 8.41974 35.8247 7.90249 34.8095C7.62312 34.2612 7.4709 33.6064 7.39311 32.6543C7.31484 31.6963 7.31445 30.4821 7.31445 28.8231V16.2467C7.31445 14.5877 7.31484 13.3734 7.39311 12.4155C7.4709 11.4634 7.62312 10.8086 7.90249 10.2603C8.41974 9.2451 9.2451 8.41974 10.2603 7.90249C10.8086 7.62312 11.4634 7.4709 12.4155 7.39311C13.3734 7.31484 14.5877 7.31445 16.2467 7.31445H32.7532C34.4122 7.31445 35.6264 7.31484 36.5844 7.39311C37.5365 7.4709 38.1913 7.62312 38.7396 7.90249C39.7548 8.41974 40.5801 9.2451 41.0974 10.2603C41.3768 10.8086 41.529 11.4634 41.6068 12.4155C41.685 13.3734 41.6854 14.5877 41.6854 16.2467V28.8231C41.6854 30.4821 41.685 31.6963 41.6068 32.6543C41.529 33.6064 41.3768 34.2612 41.0974 34.8095C40.5801 35.8247 39.7548 36.65 38.7396 37.1673C38.1302 37.4778 37.3908 37.6306 36.2598 37.6997L35.7903 37.7284V38.1988V40.2204C35.7903 41.0295 35.1343 41.6854 34.3252 41.6854C33.5161 41.6854 32.8602 41.0295 32.8602 40.2204V38.2553V37.7553H32.3602H16.6397H16.1397V38.2553V40.2204C16.1397 41.0295 15.4838 41.6854 14.6747 41.6854C13.8655 41.6854 13.2096 41.0295 13.2096 40.2204V38.1988ZM25.965 22.5349C25.965 23.344 25.3091 23.9999 24.4999 23.9999C23.6908 23.9999 23.0349 23.344 23.0349 22.5349C23.0349 21.7258 23.6908 21.0698 24.4999 21.0698C25.3091 21.0698 25.965 21.7258 25.965 22.5349ZM16.6397 24.9999H18.5973C19.2452 26.5498 20.4851 27.7896 22.0349 28.4375V30.3951C22.0349 31.7565 23.1385 32.8602 24.4999 32.8602C25.8614 32.8602 26.965 31.7565 26.965 30.3951V28.4375C28.5148 27.7896 29.7547 26.5498 30.4026 24.9999H32.3602C33.7216 24.9999 34.8252 23.8963 34.8252 22.5349C34.8252 21.1735 33.7216 20.0698 32.3602 20.0698H30.4026C29.7547 18.52 28.5148 17.2802 26.965 16.6322V14.6747C26.965 13.3133 25.8614 12.2096 24.4999 12.2096C23.1385 12.2096 22.0349 13.3133 22.0349 14.6747V16.6322C20.4851 17.2802 19.2452 18.52 18.5973 20.0698H16.6397C15.2783 20.0698 14.1747 21.1735 14.1747 22.5349C14.1747 23.8963 15.2783 24.9999 16.6397 24.9999Z"
                          fill="url(#paint0_linear_241_35997)"
                          stroke="url(#paint1_linear_241_35997)"
                        ></path>
                        <defs>
                          <linearGradient
                            id="paint0_linear_241_35997"
                            x1="24.4999"
                            y1="6.81445"
                            x2="24.4999"
                            y2="42.1854"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#3D4364"></stop>
                            <stop
                              offset="1"
                              stop-color="#3D4364"
                              stop-opacity="0"
                            ></stop>
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_241_35997"
                            x1="24.4999"
                            y1="6.81445"
                            x2="24.4999"
                            y2="32.79"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#5C6391"></stop>
                            <stop
                              offset="1"
                              stop-color="#5C6390"
                              stop-opacity="0"
                            ></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="affiliates-text">
                      <h3>Total Earnings</h3>
                      <div className="value-display">
                        <div className="display-icon">
                          <Image
                            src={"/images/project/aud.png"}
                            width={20}
                            height={20}
                            alt="Product"
                          />
                        </div>
                        <span>0.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="affiliates-section"
                  style={{
                    borderColor: "#ffbe18",
                    backgroundColor: "rgba(255, 199, 56, 0.114)",
                  }}
                >
                  <div className="affiliates-left">
                    <div>
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M36.1673 20.0002C36.1673 28.9288 28.9293 36.1668 20.0007 36.1668C11.072 36.1668 3.83398 28.9288 3.83398 20.0002C3.83398 11.0716 11.072 3.8335 20.0007 3.8335C28.9293 3.8335 36.1673 11.0716 36.1673 20.0002ZM17.1673 15.0002C17.1673 14.3558 17.6897 13.8335 18.334 13.8335H21.6673C22.3116 13.8335 22.834 14.3558 22.834 15.0002C22.834 16.1968 23.804 17.1668 25.0007 17.1668C26.1973 17.1668 27.1673 16.1968 27.1673 15.0002C27.1673 12.5923 25.6203 10.547 23.4674 9.80163C22.7021 9.53667 22.1673 8.95386 22.1673 8.3335C22.1673 7.13688 21.1973 6.16683 20.0007 6.16683C18.804 6.16683 17.834 7.13688 17.834 8.3335C17.834 8.95386 17.2992 9.53667 16.5339 9.80163C14.381 10.547 12.834 12.5923 12.834 15.0002V15.931C12.834 18.2983 14.3489 20.4001 16.5947 21.1487L22.0362 22.9626C22.5126 23.1214 22.834 23.5672 22.834 24.0694V25.0002C22.834 25.6445 22.3116 26.1668 21.6673 26.1668H18.334C17.6897 26.1668 17.1673 25.6445 17.1673 25.0002C17.1673 23.8035 16.1973 22.8335 15.0007 22.8335C13.804 22.8335 12.834 23.8035 12.834 25.0002C12.834 27.4081 14.381 29.4533 16.5339 30.1987C17.2992 30.4637 17.834 31.0465 17.834 31.6668C17.834 32.8634 18.804 33.8335 20.0007 33.8335C21.1973 33.8335 22.1673 32.8634 22.1673 31.6668C22.1673 31.0465 22.7021 30.4637 23.4674 30.1987C25.6203 29.4533 27.1673 27.4081 27.1673 25.0002V24.0694C27.1673 21.702 25.6525 19.6002 23.4066 18.8516L17.9651 17.0378C17.4887 16.879 17.1673 16.4331 17.1673 15.931V15.0002Z"
                          fill="url(#paint0_linear_241_36000)"
                          stroke="url(#paint1_linear_241_36000)"
                        ></path>
                        <defs>
                          <linearGradient
                            id="paint0_linear_241_36000"
                            x1="25.9217"
                            y1="0.91414"
                            x2="40.8176"
                            y2="25.7176"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#F1BB1C"></stop>
                            <stop offset="1" stop-color="#FF8D01"></stop>
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_241_36000"
                            x1="20.0007"
                            y1="3.3335"
                            x2="20.0007"
                            y2="36.6668"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FFD076"></stop>
                            <stop offset="1" stop-color="#FFA333"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="affiliates-text">
                      <h3>income</h3>
                      <div className="value-display">
                        <div className="display-icon">
                          <Image
                            src={"/images/project/aud.png"}
                            width={20}
                            height={20}
                            alt="Product"
                          />
                        </div>
                        <span>0.00</span>
                      </div>
                    </div>
                  </div>
                  <button className="affiliates-small-button">
                    <div className="Button_inner-content">
                      <span>Take</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="Username"
                >
                  Referrals
                </label>

                <div className="">
                  <div
                    className="flex flex w-full items-center justify-center rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    style={{ height: "200px" }}
                  >
                    <span>No Referrals</span>
                  </div>
                </div>
              </div>

              {/* <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Affiliates;
