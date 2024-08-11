import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Slider from "react-slick";
import { TodoListComponent } from "../apps/TodoList";
import { VectorMap } from "react-jvectormap";

const mapData = {
  BZ: 75.0,
  US: 56.25,
  AU: 15.45,
  GB: 25.0,
  RO: 10.25,
  GE: 33.25,
};

export class Dashboard extends Component {
  transactionHistoryData = {
    labels: ["Paypal", "Stripe", "Cash"],
    datasets: [
      {
        data: [55, 25, 20],
        backgroundColor: ["#111111", "#00d25b", "#ffab00"],
      },
    ],
  };

  transactionHistoryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    cutoutPercentage: 70,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
    },
  };

  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }
  render() {
    return (
      <div className="body_contain">
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="banner"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column wrap",
                    gap: "12px",
                  }}
                >
                  <div
                    className="d-flex align-items-center align-self-start "
                    style={{
                      gap: "10px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20.3 21.88"
                      width={17}
                    >
                      <path
                        fill="url(#slots)"
                        d="M20.16 3.28 17.8.24a.83.83 0 0 0-.93-.16l-.94.47a9.96 9.96 0 0 1-7.19.63C7.73.86 6.65.78 5.62.78H.79C.31.78 0 1.1 0 1.57v9.06c0 .47.31.78.78.78h3.13c.46 0 .78-.31.78-.78a2.29 2.29 0 0 1 2.34-2.27H9.3l-1.18 1.4a28.83 28.83 0 0 0-5.78 11.18c0 .16 0 .47.16.63.16.15.4.3.63.3h10.15c.47 0 .78-.3.78-.77 0-4.3 1.17-8.52 3.36-12.27l2.74-4.69c.23-.23.15-.54 0-.86z"
                      ></path>
                      <defs>
                        <linearGradient
                          id="slots"
                          x1="10.28"
                          x2="10.28"
                          y1=".56"
                          y2="22.44"
                          gradientTransform="translate(-.13 -.56)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#87C1F2"></stop>
                          <stop offset="1" stopColor="#3A8DDA"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    <h4 className="mb-0">Slots</h4>
                    <svg
                      viewBox="0 0 13.5 11.05"
                      xmlns="http://www.w3.org/2000/svg"
                      width={17}
                    >
                      <path
                        d="M7.98 0a.75.75 0 0 0-.53 1.28l3.49 3.5H.75a.75.75 0 0 0 0 1.5h10.19l-3.5 3.49a.75.75 0 1 0 1.07 1.06l4.77-4.78c.3-.29.3-.76 0-1.06L8.51.22A.75.75 0 0 0 7.98 0z"
                        fill="url(#arrow)"
                      ></path>
                      <defs>
                        <linearGradient
                          id="arrow"
                          x1="7"
                          x2="7"
                          y1="6.5"
                          y2="7.5"
                          gradientTransform="translate(-.25 -9.8)"
                          gradientUnits="userSpaceOnUse"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <stop stopColor="#87C1F2"></stop>
                          <stop offset="1" stopColor="#3A8DDA"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <h6 className="text-muted font-weight-normal">
                    Choose from 2,500+ Premium Slots!
                  </h6>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <img
                    style={{ width: "90%" }}
                    src={require("../../assets/images/project/mini/mini.png")}
                  ></img>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <svg
                      width={15}
                      viewBox="0 0 10.53 2.32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.15 2.32A1.13 1.13 0 0 1 0 1.16C0 .81.11.53.34.32.56.11.84 0 1.14 0A1.13 1.13 0 0 1 2.3 1.16a1.13 1.13 0 0 1-1.15 1.16Zm4.12 0a1.13 1.13 0 0 1-1.15-1.16c0-.35.11-.63.33-.84.23-.21.5-.32.82-.32A1.13 1.13 0 0 1 6.4 1.16c0 .34-.1.62-.33.84-.23.22-.5.32-.81.32zm4.11 0a1.13 1.13 0 0 1-1.14-1.16c0-.35.1-.63.33-.84.23-.21.5-.32.81-.32a1.13 1.13 0 0 1 1.15 1.16c0 .34-.11.62-.33.84-.23.22-.5.32-.82.32z"
                        fill="rgba(232, 229, 255, 0.5)"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column wrap",
                    gap: "12px",
                  }}
                >
                  <div
                    className="d-flex align-items-center align-self-start "
                    style={{
                      gap: "10px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20.3 21.88"
                      width={17}
                    >
                      <path
                        fill="url(#slots)"
                        d="M20.16 3.28 17.8.24a.83.83 0 0 0-.93-.16l-.94.47a9.96 9.96 0 0 1-7.19.63C7.73.86 6.65.78 5.62.78H.79C.31.78 0 1.1 0 1.57v9.06c0 .47.31.78.78.78h3.13c.46 0 .78-.31.78-.78a2.29 2.29 0 0 1 2.34-2.27H9.3l-1.18 1.4a28.83 28.83 0 0 0-5.78 11.18c0 .16 0 .47.16.63.16.15.4.3.63.3h10.15c.47 0 .78-.3.78-.77 0-4.3 1.17-8.52 3.36-12.27l2.74-4.69c.23-.23.15-.54 0-.86z"
                      ></path>
                      <defs>
                        <linearGradient
                          id="slots"
                          x1="10.28"
                          x2="10.28"
                          y1=".56"
                          y2="22.44"
                          gradientTransform="translate(-.13 -.56)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#87C1F2"></stop>
                          <stop offset="1" stopColor="#3A8DDA"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    <h4 className="mb-0">Slots</h4>
                    <svg
                      viewBox="0 0 13.5 11.05"
                      xmlns="http://www.w3.org/2000/svg"
                      width={17}
                    >
                      <path
                        d="M7.98 0a.75.75 0 0 0-.53 1.28l3.49 3.5H.75a.75.75 0 0 0 0 1.5h10.19l-3.5 3.49a.75.75 0 1 0 1.07 1.06l4.77-4.78c.3-.29.3-.76 0-1.06L8.51.22A.75.75 0 0 0 7.98 0z"
                        fill="url(#arrow)"
                      ></path>
                      <defs>
                        <linearGradient
                          id="arrow"
                          x1="7"
                          x2="7"
                          y1="6.5"
                          y2="7.5"
                          gradientTransform="translate(-.25 -9.8)"
                          gradientUnits="userSpaceOnUse"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <stop stopColor="#87C1F2"></stop>
                          <stop offset="1" stopColor="#3A8DDA"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <h6 className="text-muted font-weight-normal">
                    Choose from 2,500+ Premium Slots!
                  </h6>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <img
                    style={{ width: "90%" }}
                    src={require("../../assets/images/project/mini/mini.png")}
                  ></img>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <svg
                      width={15}
                      viewBox="0 0 10.53 2.32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.15 2.32A1.13 1.13 0 0 1 0 1.16C0 .81.11.53.34.32.56.11.84 0 1.14 0A1.13 1.13 0 0 1 2.3 1.16a1.13 1.13 0 0 1-1.15 1.16Zm4.12 0a1.13 1.13 0 0 1-1.15-1.16c0-.35.11-.63.33-.84.23-.21.5-.32.82-.32A1.13 1.13 0 0 1 6.4 1.16c0 .34-.1.62-.33.84-.23.22-.5.32-.81.32zm4.11 0a1.13 1.13 0 0 1-1.14-1.16c0-.35.1-.63.33-.84.23-.21.5-.32.81-.32a1.13 1.13 0 0 1 1.15 1.16c0 .34-.11.62-.33.84-.23.22-.5.32-.82.32z"
                        fill="rgba(232, 229, 255, 0.5)"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div
                  style={{
                    display: "flex",
                    flexFlow: "column wrap",
                    gap: "12px",
                  }}
                >
                  <div
                    className="d-flex align-items-center align-self-start "
                    style={{
                      gap: "10px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20.3 21.88"
                      width={17}
                    >
                      <path
                        fill="url(#slots)"
                        d="M20.16 3.28 17.8.24a.83.83 0 0 0-.93-.16l-.94.47a9.96 9.96 0 0 1-7.19.63C7.73.86 6.65.78 5.62.78H.79C.31.78 0 1.1 0 1.57v9.06c0 .47.31.78.78.78h3.13c.46 0 .78-.31.78-.78a2.29 2.29 0 0 1 2.34-2.27H9.3l-1.18 1.4a28.83 28.83 0 0 0-5.78 11.18c0 .16 0 .47.16.63.16.15.4.3.63.3h10.15c.47 0 .78-.3.78-.77 0-4.3 1.17-8.52 3.36-12.27l2.74-4.69c.23-.23.15-.54 0-.86z"
                      ></path>
                      <defs>
                        <linearGradient
                          id="slots"
                          x1="10.28"
                          x2="10.28"
                          y1=".56"
                          y2="22.44"
                          gradientTransform="translate(-.13 -.56)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#87C1F2"></stop>
                          <stop offset="1" stopColor="#3A8DDA"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                    <h4 className="mb-0">Slots</h4>
                    <svg
                      viewBox="0 0 13.5 11.05"
                      xmlns="http://www.w3.org/2000/svg"
                      width={17}
                    >
                      <path
                        d="M7.98 0a.75.75 0 0 0-.53 1.28l3.49 3.5H.75a.75.75 0 0 0 0 1.5h10.19l-3.5 3.49a.75.75 0 1 0 1.07 1.06l4.77-4.78c.3-.29.3-.76 0-1.06L8.51.22A.75.75 0 0 0 7.98 0z"
                        fill="url(#arrow)"
                      ></path>
                      <defs>
                        <linearGradient
                          id="arrow"
                          x1="7"
                          x2="7"
                          y1="6.5"
                          y2="7.5"
                          gradientTransform="translate(-.25 -9.8)"
                          gradientUnits="userSpaceOnUse"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <stop stopColor="#87C1F2"></stop>
                          <stop offset="1" stopColor="#3A8DDA"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <h6 className="text-muted font-weight-normal">
                    Choose from 2,500+ Premium Slots!
                  </h6>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <img
                    style={{ width: "90%" }}
                    src={require("../../assets/images/project/mini/mini.png")}
                  ></img>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <svg
                      width={15}
                      viewBox="0 0 10.53 2.32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.15 2.32A1.13 1.13 0 0 1 0 1.16C0 .81.11.53.34.32.56.11.84 0 1.14 0A1.13 1.13 0 0 1 2.3 1.16a1.13 1.13 0 0 1-1.15 1.16Zm4.12 0a1.13 1.13 0 0 1-1.15-1.16c0-.35.11-.63.33-.84.23-.21.5-.32.82-.32A1.13 1.13 0 0 1 6.4 1.16c0 .34-.1.62-.33.84-.23.22-.5.32-.81.32zm4.11 0a1.13 1.13 0 0 1-1.14-1.16c0-.35.1-.63.33-.84.23-.21.5-.32.81-.32a1.13 1.13 0 0 1 1.15 1.16c0 .34-.11.62-.33.84-.23.22-.5.32-.82.32z"
                        fill="rgba(232, 229, 255, 0.5)"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h5>Preferred Payment Methods</h5>
                <div className="row">
                  <div className="col-8 col-sm-12 col-xl-8 my-2">
                    <h6 className="text-muted font-weight-normal">
                      We offer a wide range of payment methods. Crypto is
                      faster, but you can also choose Bank Transfers, Gift
                      cards, and many more options.
                    </h6>
                  </div>
                  <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                    <i className="icon-lg mdi mdi-codepen text-primary ml-auto"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="SlotsList_list_container">
          <h3 className="SlotsList_heading-item">
            <svg
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 46.7 50.22"
              fill="#7179A5"
            >
              <defs>
                <linearGradient
                  id="linear-gradient"
                  x1="23.35"
                  x2="23.35"
                  y1="51.36"
                  y2="1.15"
                  gradientTransform="matrix(1 0 0 -1 0 51.36)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#5cb4ff"></stop>
                  <stop offset="1" stopColor="#0082f0"></stop>
                </linearGradient>
                <linearGradient
                  id="linear-gradient-2"
                  x1="23.35"
                  x2="23.35"
                  y1="51.36"
                  y2="1.15"
                  gradientTransform="matrix(1 0 0 -1 0 51.36)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#87c1f2"></stop>
                  <stop offset="1" stopColor="#3a8dda"></stop>
                </linearGradient>
                <linearGradient
                  id="linear-gradient-3"
                  x1="23.35"
                  x2="23.35"
                  y1="51.21"
                  y2="1.3"
                  gradientTransform="matrix(1 0 0 -1 0 51.36)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#fff" stopOpacity="0.75"></stop>
                  <stop offset="1" stopColor="#fff" stopOpacity="0.05"></stop>
                </linearGradient>
              </defs>
              <path
                fill="url(#linear-gradient)"
                strokeWidth="0"
                d="M46.36 7.54L40.97.55c-.54-.54-1.44-.72-2.16-.36l-2.16 1.08C31.44 3.78 25.69 4.32 20.12 2.7c-2.34-.72-4.85-.9-7.19-.9H1.8C.72 1.8 0 2.52 0 3.59v20.8c0 1.08.72 1.79 1.8 1.79h7.19c1.08 0 1.8-.72 1.8-1.79 0-2.87 2.34-5.2 5.39-5.2h5.21l-2.7 3.23C12.4 29.95 7.91 38.56 5.39 48.06c0 .36 0 1.08.36 1.43.36.36.9.72 1.44.72h23.36c1.08 0 1.8-.72 1.8-1.79 0-9.86 2.7-19.55 7.73-28.15l6.29-10.76c.54-.54.36-1.26 0-1.97z"
              ></path>
              <path
                fill="url(#linear-gradient-2)"
                fillOpacity="0.4"
                strokeWidth="0"
                d="M46.36 7.54L40.97.55c-.54-.54-1.44-.72-2.16-.36l-2.16 1.08C31.44 3.78 25.69 4.32 20.12 2.7c-2.34-.72-4.85-.9-7.19-.9H1.8C.72 1.8 0 2.52 0 3.59v20.8c0 1.08.72 1.79 1.8 1.79h7.19c1.08 0 1.8-.72 1.8-1.79 0-2.87 2.34-5.2 5.39-5.2h5.21l-2.7 3.23C12.4 29.95 7.91 38.56 5.39 48.06c0 .36 0 1.08.36 1.43.36.36.9.72 1.44.72h23.36c1.08 0 1.8-.72 1.8-1.79 0-9.86 2.7-19.55 7.73-28.15l6.29-10.76c.54-.54.36-1.26 0-1.97z"
              ></path>
              <path
                fill="none"
                stroke="url(#linear-gradient-3)"
                strokeWidth="0.28"
                d="M36.78 1.53h0L38.94.45c.59-.3 1.34-.15 1.8.29l5.36 6.95c.17.34.28.64.29.91.02.26-.05.49-.25.69l-.03.03-.02.03-6.29 10.76c-5.06 8.65-7.77 18.39-7.77 28.3 0 .47-.16.84-.41 1.09-.25.25-.62.41-1.09.41H7.19c-.42 0-.89-.29-1.23-.63-.11-.11-.19-.31-.23-.56-.04-.22-.04-.45-.04-.63 2.51-9.45 6.97-18 13.23-25.49l2.7-3.23.41-.49h-5.85c-3.21 0-5.69 2.46-5.69 5.5 0 .47-.16.84-.41 1.09-.25.25-.62.41-1.09.41H1.8c-.47 0-.84-.16-1.09-.41-.25-.25-.41-.62-.41-1.09V3.59c0-.47.16-.84.41-1.09.25-.25.62-.41 1.09-.41h11.14c2.32 0 4.81.18 7.1.88h0c5.64 1.64 11.47 1.09 16.74-1.45z"
              ></path>
            </svg>
            Recommended
          </h3>

          <div
            className="row"
            style={{
              display: "flex",
              gap: "5px",
              justifyContent: "space-between",
            }}
          >
            <a>
              <img
                alt="sample"
                src={require("../../assets/images/project/mini/1.png")}
                style={{
                  height: "100%",
                  width: "140px",
                  inset: "0px",
                  objectFit: "cover",
                  color: "transparent",
                }}
              ></img>
            </a>
            <a>
              <img
                alt="sample"
                src={require("../../assets/images/project/mini/2.png")}
                style={{
                  height: "100%",
                  width: "140px",
                  inset: "0px",
                  objectFit: "cover",
                  color: "transparent",
                }}
              ></img>
            </a>
            <a>
              <img
                alt="sample"
                src={require("../../assets/images/project/mini/3.png")}
                style={{
                  height: "100%",
                  width: "140px",
                  inset: "0px",
                  objectFit: "cover",
                  color: "transparent",
                }}
              ></img>
            </a>
            <a>
              <img
                alt="sample"
                src={require("../../assets/images/project/mini/4.png")}
                style={{
                  height: "100%",
                  width: "140px",
                  inset: "0px",
                  objectFit: "cover",
                  color: "transparent",
                }}
              ></img>
            </a>
            <a>
              <img
                alt="sample"
                src={require("../../assets/images/project/mini/1.png")}
                style={{
                  height: "100%",
                  width: "140px",
                  inset: "0px",
                  objectFit: "cover",
                  color: "transparent",
                }}
              ></img>
            </a>
            <a>
              <img
                alt="sample"
                src={require("../../assets/images/project/mini/2.png")}
                style={{
                  height: "100%",
                  width: "140px",
                  inset: "0px",
                  objectFit: "cover",
                  color: "transparent",
                }}
              ></img>
            </a>
            <a>
              <img
                alt="sample"
                src={require("../../assets/images/project/mini/3.png")}
                style={{
                  height: "100%",
                  width: "140px",
                  inset: "0px",
                  objectFit: "cover",
                  color: "transparent",
                }}
              ></img>
            </a>
            <a>
              <img
                alt="sample"
                src={require("../../assets/images/project/mini/4.png")}
                style={{
                  height: "100%",
                  width: "140px",
                  inset: "0px",
                  objectFit: "cover",
                  color: "transparent",
                }}
              ></img>
            </a>
          </div>
        </section>
        <section className="SlotsList_list_container">
          <h3 className="SlotsList_heading-item">
            <svg
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 46.7 50.22"
              fill="#7179A5"
            >
              <defs>
                <linearGradient
                  id="linear-gradient"
                  x1="23.35"
                  x2="23.35"
                  y1="51.36"
                  y2="1.15"
                  gradientTransform="matrix(1 0 0 -1 0 51.36)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#5cb4ff"></stop>
                  <stop offset="1" stopColor="#0082f0"></stop>
                </linearGradient>
                <linearGradient
                  id="linear-gradient-2"
                  x1="23.35"
                  x2="23.35"
                  y1="51.36"
                  y2="1.15"
                  gradientTransform="matrix(1 0 0 -1 0 51.36)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#87c1f2"></stop>
                  <stop offset="1" stopColor="#3a8dda"></stop>
                </linearGradient>
                <linearGradient
                  id="linear-gradient-3"
                  x1="23.35"
                  x2="23.35"
                  y1="51.21"
                  y2="1.3"
                  gradientTransform="matrix(1 0 0 -1 0 51.36)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#fff" stopOpacity="0.75"></stop>
                  <stop offset="1" stopColor="#fff" stopOpacity="0.05"></stop>
                </linearGradient>
              </defs>
              <path
                fill="url(#linear-gradient)"
                strokeWidth="0"
                d="M46.36 7.54L40.97.55c-.54-.54-1.44-.72-2.16-.36l-2.16 1.08C31.44 3.78 25.69 4.32 20.12 2.7c-2.34-.72-4.85-.9-7.19-.9H1.8C.72 1.8 0 2.52 0 3.59v20.8c0 1.08.72 1.79 1.8 1.79h7.19c1.08 0 1.8-.72 1.8-1.79 0-2.87 2.34-5.2 5.39-5.2h5.21l-2.7 3.23C12.4 29.95 7.91 38.56 5.39 48.06c0 .36 0 1.08.36 1.43.36.36.9.72 1.44.72h23.36c1.08 0 1.8-.72 1.8-1.79 0-9.86 2.7-19.55 7.73-28.15l6.29-10.76c.54-.54.36-1.26 0-1.97z"
              ></path>
              <path
                fill="url(#linear-gradient-2)"
                fillOpacity="0.4"
                strokeWidth="0"
                d="M46.36 7.54L40.97.55c-.54-.54-1.44-.72-2.16-.36l-2.16 1.08C31.44 3.78 25.69 4.32 20.12 2.7c-2.34-.72-4.85-.9-7.19-.9H1.8C.72 1.8 0 2.52 0 3.59v20.8c0 1.08.72 1.79 1.8 1.79h7.19c1.08 0 1.8-.72 1.8-1.79 0-2.87 2.34-5.2 5.39-5.2h5.21l-2.7 3.23C12.4 29.95 7.91 38.56 5.39 48.06c0 .36 0 1.08.36 1.43.36.36.9.72 1.44.72h23.36c1.08 0 1.8-.72 1.8-1.79 0-9.86 2.7-19.55 7.73-28.15l6.29-10.76c.54-.54.36-1.26 0-1.97z"
              ></path>
              <path
                fill="none"
                stroke="url(#linear-gradient-3)"
                strokeWidth="0.28"
                d="M36.78 1.53h0L38.94.45c.59-.3 1.34-.15 1.8.29l5.36 6.95c.17.34.28.64.29.91.02.26-.05.49-.25.69l-.03.03-.02.03-6.29 10.76c-5.06 8.65-7.77 18.39-7.77 28.3 0 .47-.16.84-.41 1.09-.25.25-.62.41-1.09.41H7.19c-.42 0-.89-.29-1.23-.63-.11-.11-.19-.31-.23-.56-.04-.22-.04-.45-.04-.63 2.51-9.45 6.97-18 13.23-25.49l2.7-3.23.41-.49h-5.85c-3.21 0-5.69 2.46-5.69 5.5 0 .47-.16.84-.41 1.09-.25.25-.62.41-1.09.41H1.8c-.47 0-.84-.16-1.09-.41-.25-.25-.41-.62-.41-1.09V3.59c0-.47.16-.84.41-1.09.25-.25.62-.41 1.09-.41h11.14c2.32 0 4.81.18 7.1.88h0c5.64 1.64 11.47 1.09 16.74-1.45z"
              ></path>
            </svg>
            Original
          </h3>

          <div
            style={{
              display: "flex",

              gap: "10px",
            }}
          >
            <a>
              <img
                alt="sample"
                src={require("../../assets/images/project/mini/1.png")}
                style={{
                  height: "100%",
                  width: "140px",
                  inset: "0px",
                  objectFit: "cover",
                  color: "transparent",
                }}
              ></img>
            </a>
            <a>
              <img
                alt="sample"
                src={require("../../assets/images/project/mini/2.png")}
                style={{
                  height: "100%",
                  width: "140px",
                  inset: "0px",
                  objectFit: "cover",
                  color: "transparent",
                }}
              ></img>
            </a>{" "}
            <a>
              <img
                alt="sample"
                src={require("../../assets/images/project/mini/3.png")}
                style={{
                  height: "100%",
                  width: "140px",
                  inset: "0px",
                  objectFit: "cover",
                  color: "transparent",
                }}
              ></img>
            </a>{" "}
            <a>
              <img
                alt="sample"
                src={require("../../assets/images/project/mini/4.png")}
                style={{
                  height: "100%",
                  width: "140px",
                  inset: "0px",
                  objectFit: "cover",
                  color: "transparent",
                }}
              ></img>
            </a>
          </div>
        </section>

        <section>
          <h4 style={{ marginBottom: "15px" }}>Provider</h4>
          <div className="row">
            <div className="col-xl-2 col-sm-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body"></div>
              </div>
            </div>
            <div className="col-xl-2 col-sm-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body"></div>
              </div>
            </div>
            <div className="col-xl-2 col-sm-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body"></div>
              </div>
            </div>
            <div className="col-xl-2 col-sm-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body"></div>
              </div>
            </div>
            <div className="col-xl-2 col-sm-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body"></div>
              </div>
            </div>
            <div className="col-xl-2 col-sm-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;
