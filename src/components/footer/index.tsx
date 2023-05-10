import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";
import logo_dark from "../../access/logo/dark.png";
import bct from "../../access/icon/bct.png";

const SimFooter = () => {
  const pathname = window.location.pathname;
  if (pathname === "/admin" || pathname === "/dashboard") {
    return <div></div>;
  } else
    return (
      <div id="sim_footer">
        <div className="footer_content">
          <div className="footer_main">
            <div className="w-90">
              <Row>
                <Col xs={12} xl={3}>
                  <div className="footer_logo">
                    <div className="logo_top">
                      <div className="logo">
                        <img src={logo_dark} alt="logo" />
                      </div>

                      <ul className="logo_serevive">
                        <li>
                          <span className="material-symbols-outlined">
                            radio_button_checked
                          </span>
                          Sim Du Lịch Quốc Tế 5G/4G
                        </li>
                        <li>
                          <span className="material-symbols-outlined">
                            radio_button_checked
                          </span>
                          Esim Du Lịch Quốc Tế 5G/4G
                        </li>
                        <li>
                          <span className="material-symbols-outlined">
                            radio_button_checked
                          </span>
                          Sim Châu Âu, Úc, Mỹ, Canada nghe gọi + data
                        </li>
                      </ul>
                    </div>

                    <div className="bct">
                      <img
                        src={bct}
                        alt="Bộ công thương"
                        className="w-100 img-fluid"
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={12} xl={3}>
                  <div className="footer_item">
                    <div className="footer_header">
                      <h6>LIÊN HỆ</h6>
                    </div>
                    <div className="footer_contact footer_infor">
                      <ul>
                        <li>
                          <span className="material-symbols-outlined">
                            mail
                          </span>
                          <Link to={"mailto:travelsimshop14@gmail.com"}>
                            travelsimshop14@gmail.com
                          </Link>
                        </li>
                        <hr className="mt-1 mb-1 txt_white" />
                        <li>
                          <span className="material-symbols-outlined">
                            phone_in_talk
                          </span>
                          <Link to={"tel:0938561002"}>093.856.1002</Link>
                        </li>
                        <hr className="mt-1 mb-1 txt_white" />
                        <li>
                          <i
                            className="fab fa-facebook-f"
                            style={{ fontSize: "1.3rem" }}
                          ></i>
                          <Link
                            to={"https://www.facebook.com/travelsimshop/"}
                            target="_blank"
                          >
                            Travel Sim Shop
                          </Link>
                        </li>
                        <hr className="mt-1 mb-1 txt_white" />
                        <li>
                          <span className="material-symbols-outlined">
                            pin_drop
                          </span>
                          <p className="m-0">
                            84 Lê Quang Định, P.14, Q.Bình Thạnh, TP.HCM
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
                <Col xs={12} xl={3}>
                  <div className="footer_item">
                    <div className="footer_header">
                      <h6>LỐI TẮT</h6>
                    </div>
                    <div className="footer_links footer_infor">
                      <ul>
                        <li>
                          <span className="material-symbols-outlined">
                            sim_card
                          </span>
                          <Link to={"mailto:travelsimshop14@gmail.com"}>
                            Sim Châu Á
                          </Link>
                        </li>
                        <hr className="mt-1 mb-1 txt_white" />
                        <li>
                          <span className="material-symbols-outlined">
                            sim_card
                          </span>
                          <Link to={"mailto:travelsimshop14@gmail.com"}>
                            Sim Châu Âu - Mỹ
                          </Link>
                        </li>
                        <hr className="mt-1 mb-1 txt_white" />
                        <li>
                          <span className="material-symbols-outlined">
                            sim_card
                          </span>
                          <Link to={"mailto:travelsimshop14@gmail.com"}>
                            Sim Châu Úc - Phi
                          </Link>
                        </li>
                        <hr className="mt-1 mb-1 txt_white" />
                        <li>
                          <span className="material-symbols-outlined">
                            sim_card
                          </span>
                          <Link to={"mailto:travelsimshop14@gmail.com"}>
                            ESIM
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
                <Col xs={12} xl={3}>
                  <div className="footer_item">
                    <div className="footer_header">
                      <h6>PHẢN HỒI</h6>
                    </div>
                    <div className="footer_feedback">
                      <Form.Group className="mb-3 mt-3">
                        <InputGroup>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                          />
                          <Button className="btn_submit">
                            <span className="material-symbols-outlined">
                              send
                            </span>
                          </Button>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <InputGroup>
                          <Form.Control
                            style={{ backgroundColor: "transparent" }}
                            as="textarea"
                            aria-label="With textarea"
                            rows={5}
                            placeholder="Enter your feedback"
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="footer_bot p-2 txt_center">
            <p className="m-0">Copyright © 2023 TRAVELSHIMSHOP</p>
          </div>
        </div>
      </div>
    );
};

export default SimFooter;
