import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../sp/redux/slice/data";
import "./style.scss";
import { Form } from "react-bootstrap";
import ModalCash from "./cash";
import qrcode from "../../access/qrcode/qr_code.jpg";
import TableStore from "../../layouts/tableStore";
import { toast } from "react-toastify";

const SimStore = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const Store = useSelector(DataPublicSelector.Store);

  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const [pay, setPay] = useState(false);

  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const onchangeImg = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > 523789) {
        toast.error("File quá lớn!");
      } else {
        setPhoto(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
      }
    }
  };
  //Modal
  const [show, setShow] = useState(false);
  const [code_bill, setCode_bill] = useState("");

  const handle_create_code_bill = () => {
    let d = new Date();
    const code_bill = d.getTime().toString();
    setCode_bill(code_bill);
    setShow(true);
  };

  if (Store.length > 0) {
    return (
      <div id="store">
        <div className="w-80">
          <div className="store_content">
            <Row>
              <Col xs={12}>
                <TableStore admin={false} array={Store} />
              </Col>
              <Col xs={12}>
                <div className="store_ship bsd p-4 mt-3 mb-3">
                  <div className="bill">
                    <div className="bill_header">
                      <i className="fa fa-chalkboard-teacher me-2"></i>
                      <h6 className="ms-2">Thông tin giao hàng</h6>
                    </div>
                    <hr className="mb-2 mt-0" />
                    <div className="bill_form">
                      <Row>
                        <Col xs={12} md={6} xl={3}>
                          <Form.Group className="mb-3">
                            <Form.Label>Tên</Form.Label>
                            <Form.Control
                              placeholder="Người nhận hàng"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            {name === "" && (
                              <Form.Text className="text-danger">
                                Người nhận hàng không được để trống.
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={3}>
                          <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ Email</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={3}>
                          <Form.Group className="mb-3">
                            <Form.Label>Điện thoại</Form.Label>
                            <Form.Control
                              placeholder="Điện thoại liên hệ"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            {!/([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(
                              phone
                            ) && (
                              <Form.Text className="text-danger">
                                Số điện thoại không đúng định dạng.
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6} xl={3}>
                          <Form.Group className="mb-3">
                            <Form.Label>Ngày nhận hàng</Form.Label>
                            <Form.Control
                              type="date"
                              placeholder="Ngày nhận hàng"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                            />
                            {date !== "" &&
                              new Date(date).getTime() <
                                new Date().getTime() && (
                                <Form.Text className="text-danger">
                                  Ngày giao hàng không hợp lệ.
                                </Form.Text>
                              )}
                          </Form.Group>
                        </Col>
                      </Row>
                      {/* Địa chỉ */}
                      <Row>
                        <Col xs={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                              placeholder="Địa chỉ nhận hàng"
                              value={adress}
                              onChange={(e) => setAdress(e.target.value)}
                            />
                            {adress === "" && (
                              <Form.Text className="text-danger">
                                Địa chỉ nhận hàng không được để trống.
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Ghi chú</Form.Label>
                            <Form.Control
                              as="textarea"
                              aria-label="With textarea"
                              rows={4}
                              placeholder="Ghi chú"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        {pay && (
                          <Col xs={12}>
                            <hr />
                            <div className="imge_pay">
                              <div className="pay_qrcode">
                                <div className="img_txt">
                                  <p>Quét mã để chuyển tiền đến</p>
                                  <h6>NGUYEN TRUNG THAI</h6>
                                  <p>1903 4564 6680 12</p>
                                </div>
                                <img src={qrcode} alt="QR Code" />
                              </div>

                              <div className="pay_note">
                                <div className="b1">
                                  <h6 className="txt_bold txt_red">Bước 1:</h6>
                                  <ul>
                                    <li>
                                      Quét mã QR hoặc chọn ảnh chụp màn hình có
                                      chứa mã QR vào Mobile Banking.
                                    </li>
                                  </ul>
                                </div>

                                <div className="b1">
                                  <h6 className="txt_bold txt_red">Bước 2:</h6>
                                  <ul>
                                    <li>
                                      Vui lòng chuyển khoản với nội dung{" "}
                                      {phone !== "" ? (
                                        <span className="txt_bold txt_red">
                                          {phone}{" "}
                                        </span>
                                      ) : (
                                        <span className="txt_bold">
                                          Số điện thoại{" "}
                                        </span>
                                      )}
                                      khi chuyển khoản ngân hàng .
                                    </li>
                                  </ul>
                                </div>

                                <div className="b1">
                                  <h6 className="txt_bold txt_red">Bước 3:</h6>
                                  <div className="pay_iput_img">
                                    {preview !== "" && (
                                      <div className="preview">
                                        <img src={preview} alt="preview" />
                                      </div>
                                    )}
                                    {preview === "" ? (
                                      <Form.Group>
                                        <Form.Label>Tải ảnh lên</Form.Label>
                                        <Form.Control
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => onchangeImg(e)}
                                        />
                                      </Form.Group>
                                    ) : (
                                      <div className="btn_pay txt_center mt-2">
                                        <Button
                                          variant="danger"
                                          className="btn_cancle"
                                          onClick={() => {
                                            setPhoto("");
                                            setPreview("");
                                          }}
                                        >
                                          <i className="fa fa-trash-alt"></i>
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <hr />
                          </Col>
                        )}
                        <Col xs={12}>
                          <div className="type_pay d-flex justify-content-end align-items-center">
                            <Form.Group className="mb-3 me-2">
                              <Form.Check
                                label="Thanh toán khi nhận hàng."
                                checked={pay === false}
                                onChange={() => {
                                  setPay(false);
                                  setPhoto("");
                                  setPreview("");
                                }}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3 ms-2">
                              <Form.Check
                                label="Thanh toán bằng chuyển khoản."
                                checked={pay === true}
                                onChange={() => setPay(true)}
                              />
                            </Form.Group>
                          </div>
                          <div className="txt_right">
                            {pay ? (
                              <Button
                                className="btn_order bg_ln p-3"
                                onClick={() => handle_create_code_bill()}
                                disabled={
                                  name === "" ||
                                  phone === "" ||
                                  date === "" ||
                                  Store.length === 0 ||
                                  adress === "" ||
                                  new Date(date).getTime() <
                                    new Date().getTime() ||
                                  photo === ""
                                }
                              >
                                Tiến hàng đặt hàng
                              </Button>
                            ) : (
                              <Button
                                disabled={
                                  name === "" ||
                                  phone === "" ||
                                  date === "" ||
                                  Store.length === 0 ||
                                  adress === "" ||
                                  new Date(date).getTime() <
                                    new Date().getTime()
                                }
                                className="btn_order bg_ln p-3"
                                onClick={() => handle_create_code_bill()}
                              >
                                Tiến hàng đặt hàng
                              </Button>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          {/* //Modal */}
          <ModalCash
            show={show}
            setShow={setShow}
            name={name}
            adress={adress}
            phone={phone}
            email={email}
            note={note}
            date={date}
            pay={pay}
            photo={photo}
            setPhoto={setPhoto}
            setAdress={setAdress}
            setDate={setDate}
            setEmail={setEmail}
            setName={setName}
            setNote={setNote}
            setPhone={setPhone}
            code_bill={code_bill}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-80">
        <div
          className="bsd mt-4 mb-4"
          style={{ width: "100%", height: "500px", padding: "50px" }}
        >
          <h1 className="text-danger">Không có sản phẩm nào được chọn.</h1>
        </div>
      </div>
    );
  }
};

export default SimStore;
