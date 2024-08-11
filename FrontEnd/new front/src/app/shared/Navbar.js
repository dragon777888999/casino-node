import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Form } from "react-bootstrap";
import {
  Tab,
  TabPanel,
  TabsList,
} from "../../assets/styles/components/StyleTabs"; // Import the styled components

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  // Method to open the modal
  openModal = () => {
    this.setState({ showModal: true });
  };
  // Method to close the modal
  closeModal = () => {
    this.setState({ showModal: false });
  };

  toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }
  toggleRightSidebar() {
    document.querySelector(".right-sidebar").classList.toggle("open");
  }
  render() {
    return (
      <>
        <nav className="navbar p-0 fixed-top d-flex flex-row">
          <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
            <Link className="navbar-brand brand-logo-mini" to="/">
              <img
                src={require("../../assets/images/logo-mini.svg")}
                alt="logo"
              />
            </Link>
          </div>
          <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
            <button
              className="navbar-toggler align-self-center"
              type="button"
              onClick={() =>
                document.body.classList.toggle("sidebar-icon-only")
              }
            >
              <span className="mdi mdi-menu"></span>
            </button>
            <ul
              className="navbar-nav navbar-nav center-wallet"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <li>
                {" "}
                <Dropdown>
                  <Dropdown.Toggle
                    variant="btn btn-outline-primary"
                    id="dropdownMenuOutlineButton1"
                  >
                    0.00xrpl
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header>ROOG</Dropdown.Header>
                    <Dropdown.Item>USD</Dropdown.Item>
                    <Dropdown.Item>XRPL</Dropdown.Item>

                    {/* <Dropdown.Divider></Dropdown.Divider> */}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li>
                <button
                  type="button"
                  onClick={this.openModal}
                  className="btn btn-primary btn-fw"
                >
                  wallet
                </button>
              </li>
            </ul>
            <ul className="navbar-nav  navbar-nav-right">
              {/* <li className="nav-item w-100">
              <button type="button" className="btn btn-outline-primary btn-fw">
                Login
              </button>
            </li>
            <li className="nav-item w-100">
              <button type="button" className="btn btn-outline-primary btn-fw">
                Register
              </button>
            </li> */}
              <li className="nav-item w-100">
                <button type="button" className="btn btn-primary btn-fw">
                  connect
                </button>
              </li>
            </ul>

            <button
              className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              onClick={this.toggleOffcanvas}
            >
              <span className="mdi mdi-format-line-spacing"></span>
            </button>
          </div>
        </nav>

        {this.state.showModal && (
          <div
            className="wallet-adapter-modal wallet-adapter-modal-fade-in"
            style={{ zIndex: "100" }}
          >
            <div className="wallet-adapter-modal-container">
              <div className="wallet-adapter-modal-wrapper">
                <div
                  className="items-start justify-between pt-4 pb-2 border-b border-solid border-blueGray-200 rounded-t"
                  style={{ marginBottom: "10px" }}
                >
                  <div className="row">
                    <h3>wallet</h3>
                    <button
                      className="wallet-adapter-modal-button-close"
                      onClick={this.closeModal}
                    >
                      <svg width={14} height={14}>
                        <path d="M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex row pb-4" style={{ gap: "10px" }}>
                  <div className=" stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <Form.Group>
                          <label>Balance</label>
                          <Form.Control
                            type="text"
                            className="form-control-lg"
                            placeholder="Balance"
                            aria-label="Balance"
                          />
                        </Form.Group>
                        <Form.Group>
                          <label>Amount</label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            placeholder="Withdraw amount"
                            aria-label="Withdraw amount"
                          />
                        </Form.Group>
                        <button
                          type="button"
                          className="btn btn-primary btn-fw"
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className=" stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <Form.Group>
                          <label>Address</label>
                          <Form.Control
                            type="text"
                            className="form-control-lg"
                            placeholder="Deposit address"
                            aria-label="Deposit address"
                          />
                        </Form.Group>
                        <Form.Group>
                          <label>Amount</label>
                          <Form.Control
                            type="text"
                            className="form-control"
                            placeholder="Deposit Amount"
                            aria-label="Deposit Amount"
                          />
                        </Form.Group>
                        <button
                          type="button"
                          className="btn btn-primary btn-fw"
                        >
                          Deposit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        )}
      </>
    );
  }
}

export default Navbar;
