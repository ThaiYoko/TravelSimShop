import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  Row,
  Table,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  Clear_Store_Success,
  DataPublicSelector,
} from "../../../sp/redux/slice/data";
import { toast } from "react-toastify";
import { order_api } from "../../../sp/api/order";
import "./style.scss";
import { useAppDispatch } from "../../../sp/hooks";
import { useNavigate } from "react-router-dom";
import { formatMoney } from "../../../sp/format";

interface interFade_ModalCash {
  show: boolean;
  setShow: any;
  name: string;
  adress: string;
  phone: string;
  email: string;
  note: string;
  date: string;
  pay: boolean;
  photo: any;
  setPhoto: any;
  setName: any;
  setAdress: any;
  setPhone: any;
  setDate: any;
  setEmail: any;
  setNote: any;
  code_bill: string;
}
const ModalCash = ({
  show,
  setShow,
  name,
  adress,
  phone,
  email,
  note,
  date,
  pay,
  photo,
  setPhoto,
  setName,
  setAdress,
  setPhone,
  setDate,
  setEmail,
  setNote,
  code_bill,
}: interFade_ModalCash) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onHide = () => setShow(false);
  const Store = useSelector(DataPublicSelector.Store);
  const [total, set_total] = useState(0);

  const [access, setAccess] = useState(true);

  useEffect(() => {
    let a = 0;
    Store?.map((item) => {
      a += (Number(item.sim.price) - Number(item.sim.discount)) * item.count;
    });
    set_total(a);
  }, [Store]);

  const handle_submit = async () => {
    if (access) {
      await order_api.Create(
        Store,
        name,
        adress,
        phone,
        date,
        email,
        note,
        code_bill,
        photo,
        setPhoto,
        setName,
        setAdress,
        setPhone,
        setDate,
        setEmail,
        setNote,
        setShow,
        dispatch,
        Clear_Store_Success,
        navigate
      );
    } else {
      toast.error("Bạn cần xác nhận thông tin giao hàng.");
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ zIndex: "99999" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Mã Đơn <span className="txt_bold">{code_bill}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bill_info">
          <Row>
            <Col xs={12} xl={4}>
              <div className="user d-flex">
                <p>Người nhận hàng:</p>
                <p className="txt_bold text-danger ms-2">
                  {name.toLocaleUpperCase()}
                </p>
              </div>
            </Col>

            <Col xs={12} xl={4}>
              <div className="user d-flex">
                <p>Điện thoại:</p>
                <p className="txt_bold text-danger ms-2">{phone}</p>
              </div>
            </Col>

            <Col xs={12} xl={4}>
              <div className="user d-flex">
                <p>Email:</p>
                <p className="txt_bold text-danger ms-2">{email}</p>
              </div>
            </Col>

            <Col xs={12} xl={4}>
              <div className="user">
                <p className="me-2 mb-0">Hình thức thanh toán:</p>
                {pay ? (
                  <Form.Check
                    checked
                    label={"Thanh toán trả trước."}
                    className="text-danger ms-4"
                  />
                ) : (
                  <Form.Check
                    checked
                    label={"Thanh toán khi nhận hàng."}
                    className="text-danger ms-4"
                  />
                )}
              </div>
            </Col>

            <Col xs={12} xl={4}>
              <div className="user">
                <p className="me-2 mb-0">Ngày đặt hàng:</p>
                <p className="txt_bold text-danger ms-2">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </Col>
            <Col xs={12} xl={4}>
              <div className="user">
                <p className="me-2 mb-0">Ngày nhận hàng:</p>
                <p className="txt_bold text-danger ms-2">
                  {new Date(date).toLocaleDateString()}
                </p>
              </div>
            </Col>

            <Col xs={12}>
              <div className="user d-flex">
                <p>Ghi chú:</p>
                <p className="text-danger ms-2">
                  {note === "" ? "Không có yêu cầu." : note}
                </p>
              </div>
            </Col>

            <Col xs={12}>
              <div className="user d-flex">
                <p>Địa chỉ nhận hàng:</p>
                <p className="txt_bold text-danger ms-2">
                  {adress.toUpperCase()}
                </p>
              </div>
            </Col>
          </Row>
        </div>
        <hr />
        <div className="table_bill">
          <Table responsive striped bordered hover style={{ overflow: "auto" }}>
            <thead>
              <tr className="txt_center">
                <th>#</th>
                <th>SẢN PHẨM</th>
                <th>ĐƠN GIÁ</th>
                <th>SỐ LƯỢNG</th>
                <th>THÀNH TIỀN</th>
              </tr>
            </thead>
            <tbody>
              {Store?.map((item, index) => {
                return (
                  <tr key={index} className="txt_center">
                    <td>{index + 1}</td>
                    <td className="txt_left">
                      {item.sim.name.toLocaleUpperCase()}
                    </td>
                    <td>
                      {formatMoney(
                        (
                          Number(item.sim.price) - Number(item.sim.discount)
                        ).toString()
                      )}
                    </td>
                    <td>{item.count}</td>
                    <td>
                      {formatMoney(
                        (
                          (Number(item.sim.price) - Number(item.sim.discount)) *
                          item.count
                        ).toString()
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <hr />
        <div className="price mb-3">
          <div className="price_item txt_right">
            <h6>Tổng Thanh Toán</h6>
            <h6 className="txt_bold text-danger">
              {formatMoney(total.toString())}
            </h6>
          </div>
        </div>

        <div className="access_info">
          <hr />
          <InputGroup className="justify-content-end">
            <Form.Check
              checked={access}
              label="Xác nhận thông tin giao hàng."
              onChange={() => setAccess(!access)}
              className="text-danger"
            />
          </InputGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Chỉnh sửa</Button>
        <Button variant="success" onClick={() => handle_submit()}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCash;
