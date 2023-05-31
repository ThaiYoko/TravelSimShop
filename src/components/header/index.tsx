import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../sp/redux/slice/data";
import "./style.scss";
import zalo from "../../access/icon/zalo.png";
import face from "../../access/icon/facebook.png";
import email from "../../access/icon/email.png";
import { useNavigate } from "react-router-dom";
import { interFade_Sim } from "../../sp/interfade";
import { formatMoney } from "../../sp/format";

const SimHeader = () => {
  const [show_menu, set_show_menu] = useState(false);

  const TravelSimShopContact = useSelector(
    DataPublicSelector.TravelSimShopContact
  );
  const Categorys = useSelector(DataPublicSelector.Categorys);
  const Logos = useSelector(DataPublicSelector.Logos);
  const dark_logo = Logos?.find((item) => item.id === 2);

  const pathname = window.location.pathname;
  const navigate = useNavigate();

  //Back to top
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    const headerTop = window.document.getElementById("header_top");
    const headerMain = window.document.getElementById("header_main");
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 150) {
        headerTop?.classList.add("hide");
        headerMain?.classList.add("header_fix");
        setShowBtn(true);
      } else {
        headerTop?.classList.remove("hide");
        headerMain?.classList.remove("header_fix");
        setShowBtn(false);
      }
    });
  }, []);

  const handleBackTo = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const Store = useSelector(DataPublicSelector.Store);
  const Sims = useSelector(DataPublicSelector.Sims);
  const [find_name, setFindName] = useState("");
  const [SimFind, setSimFind] = useState<interFade_Sim[]>([]);
  useEffect(() => {
    if (find_name !== "") {
      const list = Sims?.filter((item) =>
        item.name.toLocaleLowerCase().includes(find_name.toLocaleLowerCase())
      );
      setSimFind(list);
    } else {
      setSimFind([]);
    }
  }, [find_name]);

  const [show_link, set_show_link] = useState("");

  if (
    pathname === "/admin" ||
    pathname === "/admin/dashboard" ||
    pathname === "/admin/register"
  ) {
    return <div></div>;
  } else
    return (
      <header id="sim_header" className="bsd">
        <div id="header_top">
          <div className="w-80">
            <Navbar expand="lg" id="nav_sim_header">
              <Container fluid>
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="ms-auto header_top_right my-2 my-lg-0"
                    navbarScroll
                  >
                    <Form className="d-flex find_sim">
                      <InputGroup>
                        <Form.Control
                          type="search"
                          placeholder="Sim bạn cần tìm"
                          aria-label="Search"
                          value={find_name}
                          onChange={(e) => setFindName(e.target.value)}
                        />
                        <Button variant="outline-success" disabled>
                          <span className="material-symbols-outlined">
                            search
                          </span>
                        </Button>
                      </InputGroup>
                      <div className="find_ket_qua bsd">
                        {SimFind?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="find_link"
                              onClick={() => {
                                navigate(`/sim/chi-tiet-sim/${item?.url}`);
                                setFindName("");
                              }}
                            >
                              <div className="img_sim">
                                <img
                                  src={item?.Production?.avatar}
                                  alt={item?.name}
                                />
                              </div>
                              <div className="sim_info">
                                <span>{item?.name}</span>
                              </div>
                              <div className="sim_price">
                                <span>{formatMoney(item?.price)}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Form>
                    <Nav.Link
                      href={TravelSimShopContact?.facebook}
                      className="icon"
                      target="_blank"
                    >
                      <img src={face} alt="facebook_travelsimshop" />
                    </Nav.Link>
                    <Nav.Link
                      href={`mailto:${TravelSimShopContact?.email}`}
                      className="icon"
                    >
                      <img src={email} alt="facebook" />
                    </Nav.Link>
                    <Nav.Link
                      href={`tel:${TravelSimShopContact?.zalo?.replace(
                        ".",
                        ""
                      )}`}
                      className="icon"
                    >
                      <img src={zalo} alt="zalo" />
                    </Nav.Link>
                    <div
                      className="store"
                      onClick={() => navigate("/gio-hang")}
                    >
                      <div className="store_icon">
                        <span className="material-symbols-outlined">
                          shopping_cart
                        </span>
                      </div>
                      <div className="store_length">
                        <span>{Store.length}</span>
                      </div>
                    </div>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
        <div id="header_main" className="bg_ln">
          <div className="w-80">
            <Navbar expand="lg">
              <Container fluid>
                <Navbar.Brand href="/">
                  <div className="logo">
                    <img src={dark_logo?.url} alt={dark_logo?.name} />
                  </div>
                </Navbar.Brand>

                <Button
                  onClick={() => set_show_menu(!show_menu)}
                  id="btn_responsive"
                >
                  <i className="fa fa-align-justify"></i>
                </Button>

                <Navbar.Collapse
                  id="nav_sim"
                  className={show_menu ? "menu_show" : ""}
                >
                  <Nav className="m-auto header_main_left my-2 my-lg-0">
                    <Nav.Link href="/" className="link_header">
                      HOME
                    </Nav.Link>
                    {Categorys?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            pathname?.split("/")[2] === item.url
                              ? "link_header active"
                              : "link_header"
                          }
                        >
                          <div
                            className="lin"
                            onClick={() => {
                              if (show_link === item.name) {
                                set_show_link("");
                              } else {
                                set_show_link(item.name);
                              }
                            }}
                          >
                            <p className="m-0">
                              {item.name.toLocaleUpperCase()}
                            </p>
                            <i className="fa fa-angle-down"></i>
                          </div>
                          {item.Productions.length > 0 ? (
                            <div
                              className={
                                show_link === item.name
                                  ? "link_dropdow active"
                                  : "link_dropdow"
                              }
                            >
                              {item.Productions?.map((prd, index2) => {
                                return (
                                  <div
                                    key={index2}
                                    className={
                                      pathname?.split("/")[3] === prd.url
                                        ? "dropdow_item active "
                                        : "dropdow_item"
                                    }
                                    onClick={() => {
                                      navigate(`/sim/${item.url}/${prd.url}`);
                                      set_show_menu(false);
                                      set_show_link("");
                                    }}
                                  >
                                    {prd.name}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <Nav.Link href={item.url} className="link_header">
                              {item.name}
                            </Nav.Link>
                          )}
                        </div>
                      );
                    })}

                    <Nav.Link className="link_header bdr-none" href="/lien-he">
                      LIÊN HỆ
                    </Nav.Link>
                    <Nav.Link
                      className="link_header store_cart bdr-none"
                      href="/gio-hang"
                    >
                      GIỎ HÀNG
                    </Nav.Link>
                  </Nav>

                  <Form className="d-flex header_main_right">
                    <InputGroup>
                      <Form.Control
                        type="search"
                        placeholder="Sim bạn cần tìm"
                        aria-label="Search"
                        value={find_name}
                        onChange={(e) => setFindName(e.target.value)}
                      />
                      <Button variant="outline-success" disabled>
                        <span className="material-symbols-outlined">
                          search
                        </span>
                      </Button>
                    </InputGroup>
                    <div className="find_ket_qua bsd">
                      {SimFind?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="find_link"
                            onClick={() => {
                              navigate(`/sim/chi-tiet-sim/${item.url}`);
                              setFindName("");
                            }}
                          >
                            <div className="img_sim">
                              <img
                                src={item.Production.avatar}
                                alt={item.name}
                              />
                            </div>
                            <div className="sim_info">
                              <span>{item.name}</span>
                            </div>
                            <div className="sim_price">
                              <span>{formatMoney(item.price)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Form>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>

        {showBtn && (
          <>
            <Button id="btn_btt" onClick={() => handleBackTo()}>
              <i className="fa fa-angle-up"></i>
            </Button>
            <div className="setting">
              <div className="store" onClick={() => navigate("/gio-hang")}>
                <div className="store_icon">
                  <i className="fa fa-shopping-cart"></i>
                </div>
                <div className="store_length">
                  <span>{Store.length}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    );
};

export default SimHeader;
