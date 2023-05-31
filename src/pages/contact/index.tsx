import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import SEO from "../../seo";

import "./style.scss";
import zalo_icon from "../../access/icon/zalo.png";
import fb_icon from "../../access/icon/facebook.png";
import email_icon from "../../access/icon/email.png";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../sp/redux/slice/data";

const Sim_Contact = () => {
  const Logos = useSelector(DataPublicSelector.Logos);
  const light_logo = Logos?.find((item) => item.id === 1);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div id="sim_contact">
      <SEO
        title="TRAVELSIMSHOP || LIÊN HỆ"
        description="Liên hệ với chúng tôi"
      />
      <div className="w-80">
        <div className="contact_container">
          <Row>
            <Col xs={12} xl={5}>
              <div className="map p-3 bsd bdr-7 mt-3 mb-3">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d291.28748577823563!2d106.69794021371348!3d10.805059011636574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528c7371f13bf%3A0x1957d4d6c045ae75!2zODQgTMOqIFF1YW5nIMSQ4buLbmgsIFBoxrDhu51uZyAxNCwgQsOsbmggVGjhuqFuaCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1684461129731!5m2!1svi!2s"
                  width="100%"
                  height="450"
                  style={{ border: "1px" }}
                  loading="lazy"
                  title="uniqueTitle"
                ></iframe>
              </div>
            </Col>
            <Col xs={12} xl={7}>
              <div className="contact p-3 bsd bdr-7 mt-3 mb-3">
                <div className="contact_wrap">
                  <div className="contact_header">
                    <h1>MỌI THÔNG TIN CHI TIẾT XIN VUI LÒNG LIÊN HỆ</h1>
                  </div>
                  <div className="contact_content">
                    <div className="contact_logo">
                      <img src={light_logo?.url} alt="logo" />
                    </div>

                    <div className="contact_items">
                      <div className="contact_item">
                        <div className="icon_zalo icon">
                          <img src={zalo_icon} alt="icon_zalo" />
                        </div>
                        <div className="contact_link">
                          <a href="tel:0938561002">093.856.1002</a>
                        </div>
                      </div>

                      <div className="contact_item">
                        <div className="icon icon_fb">
                          <img src={fb_icon} alt="icon_fb" />
                        </div>
                        <div className="contact_link">
                          <a
                            target="_blank "
                            rel="noreferrer"
                            href="https://www.facebook.com/travelsimshop"
                          >
                            Travel Sim Shop
                          </a>
                        </div>
                      </div>

                      <div className="contact_item">
                        <div className="icon icon_email">
                          <img src={email_icon} alt="icon_email" />
                        </div>
                        <div className="contact_link">
                          <a href="mailto:globalsimshop@gmail.com">
                            globalsimshop@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Sim_Contact;
