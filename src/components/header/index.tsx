import React, { useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Badge,
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
import logo_light from "../../access/logo/dark.png";
import { Link } from "react-router-dom";
import ModalFindSim from "../../modals/findSim";

const SimHeader = () => {
  const Categorys = useSelector(DataPublicSelector.Categorys);
  const pathname = window.location.pathname;

  //Find_Sims
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

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
  if (pathname === "/admin" || pathname === "/dashboard") {
    return <div></div>;
  } else
    return (
      <section id="sim_header" className="bsd">
        <div id="header_top">
          <div className="w-95">
            <Navbar expand="lg" className="p-0">
              <Container fluid>
                <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                    <Nav.Link href="/contact" className="d-flex">
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                      Liên hệ
                    </Nav.Link>
                    <Nav.Link href="/payment" className="d-flex">
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                      Thanh toán
                    </Nav.Link>
                    <Nav.Link href="/about" className="d-flex">
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                      Về chúng tôi
                    </Nav.Link>
                  </Nav>
                  <Nav>
                    <Nav.Link href="#action1" className="icon">
                      <img
                        src={face}
                        alt="face"
                        className="img-fluid d-block w-100"
                      />
                    </Nav.Link>
                    <Nav.Link href="#action1" className="icon">
                      <img
                        src={zalo}
                        alt="zalo"
                        className="img-fluid d-block w-100"
                      />
                    </Nav.Link>
                    <Nav.Link href="#action1" className="icon">
                      <img
                        src={email}
                        alt="email"
                        className="img-fluid d-block w-100"
                      />
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
        <div id="header_main" className="bg_red">
          <div className="w-95">
            <Navbar expand="lg">
              <Container fluid>
                <Navbar.Brand href="/" className="logo me-4">
                  <img src={logo_light} alt="light_logo" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0 header_main_left"
                    navbarScroll
                  >
                    <Nav.Link
                      href="/"
                      className={
                        pathname === "/" ? "link_header active" : "link_header"
                      }
                    >
                      TRANG CHỦ
                    </Nav.Link>
                    {Categorys?.map((item, index) => {
                      return (
                        <Nav.Link
                          key={index}
                          href={`/categorys/${item.url}`}
                          className={
                            pathname === `/categorys/${item.url}`
                              ? "link_header active"
                              : "link_header"
                          }
                        >
                          {item.name.toLocaleUpperCase()}
                        </Nav.Link>
                      );
                    })}
                  </Nav>

                  <div className="header_main_right">
                    <InputGroup className="me-3">
                      <Form.Control
                        id="input_find"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sim bạn cần tìm"
                      />
                      <Button onClick={() => setShow(true)} id="btn_find">
                        <span className="material-symbols-outlined">
                          search
                        </span>
                      </Button>
                    </InputGroup>

                    <div className="store">
                      <Link to={"/store"} className="btn_store">
                        <span className="material-symbols-outlined icon_store">
                          shopping_cart
                        </span>
                      </Link>
                      <Badge bg="danger" className="number_badge">
                        {Store.length}
                      </Badge>
                    </div>
                  </div>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
        {/* Modals */}
        <ModalFindSim
          name={name}
          show={show}
          setShow={setShow}
          setName={setName}
        />
        {showBtn && (
          <Button id="btn_btt" onClick={() => handleBackTo()}>
            Back to top
          </Button>
        )}
      </section>
    );
};

export default SimHeader;
