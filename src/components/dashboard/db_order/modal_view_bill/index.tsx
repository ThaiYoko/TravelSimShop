import React, { useState, useEffect } from "react";
import { Col, Modal, Row, Form, Button } from "react-bootstrap";
import { interFade_Order, interFade_Store } from "../../../../sp/interfade";
import { useSelector } from "react-redux";
import {
  AdminSelector,
  Reload_Order_Success,
} from "../../../../sp/redux/slice/admin";
import "./style.scss";
import { order_admin_api } from "../../../../sp/api/admin/manager";
import { useAppDispatch } from "../../../../sp/hooks";
import { admin_data_api } from "../../../../sp/api/admin/data";
import TableStore from "../../../../layouts/tableStore";
import ModalShowImg from "../../../../layouts/modalShowImg";

interface ModalView {
  show: boolean;
  setShow: any;
  id_order: number;
}
const ModalViewBill = ({ show, setShow, id_order }: ModalView) => {
  const dispatch = useAppDispatch();
  const accesstoken = useSelector(AdminSelector.accestoken);
  const Orders = useSelector(AdminSelector.Orders);
  const [order, set_order] = useState<interFade_Order>();
  const [store, set_store] = useState<interFade_Store[]>([]);
  useEffect(() => {
    const order = Orders?.find((item) => item.id === id_order);
    if (order) {
      set_order(order);
      const store = JSON.parse(order?.bill);
      set_store(store);
    }
  }, [id_order]);

  //Action
  const handle_bill = async (order: interFade_Order, action: string) => {
    var message = "";
    if (action === "waiting") {
      message = `Tiến hành giao hàng cho đơn hàng mã đơn ${order.code_bill}?`;
    } else if (action === "success") {
      message = `Xác nhận hoàn thành đơn hàng mã đơn ${order.code_bill}?`;
    } else if (action === "pending") {
      message = `Xác nhận khôi phục đơn hàng mã đơn ${order.code_bill}?`;
    } else if (action === "delete") {
      message = `Xác nhận xáo vĩnh viễn đơn hàng mã đơn ${order.code_bill}?`;
    }

    if (window.confirm(message)) {
      await order_admin_api.Handle(order, action, dispatch, accesstoken);
      await admin_data_api.reload_data(
        "orders",
        dispatch,
        Reload_Order_Success,
        accesstoken
      );
      setShow(false);
    } else {
      return;
    }
  };
  //Show image
  const [show_img, set_show_img] = useState(false);
  return (
    <div id="modal_view_bill">
      <Modal
        fullscreen
        centered
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {order?.code_bill}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="bill_info">
            <Row>
              <Col xs={12} md={6} xl={3}>
                <div className="user d-flex">
                  <p className="txt_bold">Người nhận hàng:</p>
                  <p className="txt_bold text-danger ms-2">
                    {order?.name.toLocaleUpperCase()}
                  </p>
                </div>
              </Col>

              <Col xs={12} md={6} xl={3}>
                <div className="user d-flex">
                  <p className="txt_bold">Điện thoại:</p>
                  <p className="txt_bold text-danger ms-2">
                    <a href={`tel:${order?.phone}`}>{order?.phone}</a>
                  </p>
                </div>
              </Col>

              <Col xs={12} md={6} xl={3}>
                <div className="user d-flex">
                  <p className="txt_bold">Email:</p>
                  {order?.email ? (
                    <p className="txt_bold text-danger ms-2">
                      <a href={`mailto:${order?.email}`}>{order?.email}</a>
                    </p>
                  ) : (
                    <p className="txt_bold text-danger ms-2">Không</p>
                  )}
                </div>
              </Col>

              <Col xs={12} md={6} xl={3}>
                {order?.url_image ? (
                  <div className="user">
                    <p className="me-2 mb-0 txt_bold">Hình thức thanh toán:</p>
                    <div className="d-flex justify-content-start align-items-center">
                      <Form.Check
                        checked
                        label={"Thanh toán chuyển khoản."}
                        className="text-danger ms-4"
                      />
                      <Button
                        onClick={() => set_show_img(true)}
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "gray",
                          color: "gray",
                        }}
                        className="ms-2"
                      >
                        <i className="fa fa-eye"></i>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="user">
                    <p className="me-2 mb-0">Hình thức thanh toán:</p>
                    <Form.Check
                      checked
                      label={"Thanh toán khi nhận hàng."}
                      className="text-danger ms-4"
                    />
                  </div>
                )}
              </Col>

              <Col xs={12} md={6} xl={3}>
                <div className="user">
                  <p className="me-2 mb-0">Ngày đặt hàng:</p>
                  <p className="txt_bold text-danger ms-2">
                    {order?.createdAt.split("T")[0]}
                  </p>
                </div>
              </Col>
              <Col xs={12} md={6} xl={3}>
                <div className="user">
                  <p className="me-2 mb-0">Ngày nhận hàng:</p>
                  <p className="txt_bold text-danger ms-2">{order?.dateline}</p>
                </div>
              </Col>
              <Col xs={12} md={12} xl={6}>
                <div className="user d-flex">
                  <p className="txt_bold">Địa chỉ nhận hàng:</p>
                  <p className="txt_bold text-danger ms-2">
                    {order?.adress.toUpperCase()}
                  </p>
                </div>
              </Col>

              <Col xs={12}>
                <div className="user d-flex">
                  <p className="txt_bold">Ghi chú:</p>
                  <p className="text-danger ms-2">
                    {order?.note === "" ? "Không có yêu cầu." : order?.note}
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <hr />
          <TableStore admin={true} array={store} />
        </Modal.Body>

        {order && (
          <Modal.Footer>
            {order.status === "success" ? (
              <>
                <Button
                  variant="danger"
                  onClick={() => handle_bill(order, "delete")}
                >
                  Xóa
                </Button>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Đóng
                </Button>
              </>
            ) : order.status === "pending" ? (
              <>
                <Button
                  variant="success"
                  onClick={() => handle_bill(order, "waiting")}
                >
                  Tiến hành giao hàng
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handle_bill(order, "cancle")}
                >
                  Hủy đơn hàng
                </Button>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Đóng
                </Button>
              </>
            ) : order.status === "waiting" ? (
              <>
                <Button
                  variant="success"
                  onClick={() => handle_bill(order, "success")}
                >
                  Hoàn thành đơn
                </Button>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Đóng
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="success"
                  onClick={() => handle_bill(order, "pending")}
                >
                  Khôi phục
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handle_bill(order, "delete")}
                >
                  Xóa vĩnh viễn
                </Button>
                <Button variant="secondary" onClick={() => setShow(false)}>
                  Đóng
                </Button>
              </>
            )}
          </Modal.Footer>
        )}
      </Modal>
      {/* Modal */}
      {order?.url_image && (
        <ModalShowImg show={show_img} set_show={set_show_img} order={order} />
      )}
    </div>
  );
};

export default ModalViewBill;
