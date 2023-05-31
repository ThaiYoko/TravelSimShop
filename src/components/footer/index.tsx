import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";
import bct from "../../access/icon/bct.png";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../sp/redux/slice/data";

const SimFooter = () => {
  //Data
  const TravelSimShopContact = useSelector(
    DataPublicSelector.TravelSimShopContact
  );
  const Logos = useSelector(DataPublicSelector.Logos);
  const Categorys = useSelector(DataPublicSelector.Categorys);

  const dark_logo = Logos?.find((item) => item.id === 2);

  const pathname = window.location.pathname;
  if (
    pathname === "/admin" ||
    pathname === "/admin/dashboard" ||
    pathname === "/admin/register"
  ) {
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
                        <img src={dark_logo?.url} alt={dark_logo?.name} />
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
                          <Link to={`mailto:${TravelSimShopContact?.email}`}>
                            {TravelSimShopContact?.email}
                          </Link>
                        </li>
                        <hr className="mt-1 mb-1 txt_white" />
                        <li>
                          <span className="material-symbols-outlined">
                            phone_in_talk
                          </span>
                          <Link to={`tel:${TravelSimShopContact?.phone}`}>
                            {TravelSimShopContact?.phone}
                          </Link>
                        </li>
                        <hr className="mt-1 mb-1 txt_white" />
                        <li>
                          <i
                            className="fab fa-facebook-f"
                            style={{ fontSize: "1.3rem" }}
                          ></i>
                          <Link
                            to={TravelSimShopContact?.facebook}
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
                          <a className="m-0">{TravelSimShopContact?.adress}</a>
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
                        {Categorys?.map((item, index) => {
                          return (
                            <li key={index}>
                              <span className="material-symbols-outlined">
                                sim_card
                              </span>
                              <Link to={`/sim/${item.url}`}>{item.name}</Link>
                              <hr className="mt-1 mb-1 txt_white" />
                            </li>
                          );
                        })}
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
