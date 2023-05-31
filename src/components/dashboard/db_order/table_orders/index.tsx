import React, { useState, useEffect } from "react";
import { interFade_Order } from "../../../../sp/interfade";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { formatMoney } from "../../../../sp/format";
import SimPagination from "../../../../layouts/pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  AdminSelector,
  Reload_Order_Success,
} from "../../../../sp/redux/slice/admin";
import { order_admin_api } from "../../../../sp/api/admin/manager";
import { admin_data_api } from "../../../../sp/api/admin/data";
import ModalViewBill from "../modal_view_bill";
interface interFade_Table_Orders {
  type: string;
}
const TableOrders = ({ type }: interFade_Table_Orders) => {
  //Data
  const Orders = useSelector(AdminSelector.Orders);
  const accesstoken = useSelector(AdminSelector.accestoken);
  const dispatch = useDispatch();

  const [order_render, set_order_render] = useState<interFade_Order[]>([]);
  const [id_order, set_id_order] = useState(0);
  const [page, set_page] = useState(1);
  const limit = 10;
  const [length, set_length] = useState(0);
  const [show, set_show] = useState(false);

  useEffect(() => {
    if (type === "history") {
      const array = Orders?.filter(
        (item) => item.status !== "pending" && item.status !== "waiting"
      );
      set_length(array.length);
      const ofset = (page - 1) * limit;
      const list = array.slice(ofset, ofset + limit);
      set_order_render(list);
    } else {
      const array = Orders?.filter((item) => item.status === type);
      set_length(array.length);
      const ofset = (page - 1) * limit;
      const list = array.slice(ofset, ofset + limit);
      set_order_render(list);
    }
  }, [Orders]);

  const handle_bill = async (order: interFade_Order, action: string) => {
    var message = "";
    if (action === "cancle") {
      message = `Xác nhận hủy đơn hàng mã đơn ${order.code_bill}?`;
    } else if (action === "delete") {
      message = `Xác nhận xóa vĩnh viễn đơn hàng mã đơn ${order.code_bill}?`;
    }

    if (window.confirm(message)) {
      await order_admin_api.Handle(order, action, dispatch, accesstoken);
      await admin_data_api.reload_data(
        "orders",
        dispatch,
        Reload_Order_Success,
        accesstoken
      );
    } else {
      return;
    }
  };
  const handle_view_modal = (order: interFade_Order) => {
    set_show(true);
    set_id_order(order.id);
  };
  return (
    <div className="order_table">
      {length > 0 ? (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr className="txt_center">
                <th>#</th>
                <th>Mã đơn hàng</th>
                <th>Khách hàng</th>
                <th>Email</th>
                <th>Điện thoại</th>
                <th>Thanh toán</th>
                <th>Trạng thái</th>
                <th>Tổng thanh toán</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {order_render?.map((item, index) => {
                return (
                  <tr className="txt_center">
                    <td>{index + 1}</td>
                    <td>{item.code_bill}</td>
                    <td className="txt_bold">{item.name}</td>
                    <td className="txt_bold txt_red">
                      {item.email ? (
                        <a href={`mailto:${item.email}`}>{item.email}</a>
                      ) : (
                        "Không"
                      )}
                    </td>
                    <td className="txt_bold txt_red">
                      <a href={`tel:${item.phone}`}>{item.phone}</a>
                    </td>
                    <td className={item.url_image ? "txt_red" : ""}>
                      {item.url_image ? "Trả trước" : "Trả sau"}
                    </td>
                    <td
                      className={
                        item.status === "success"
                          ? "text-success"
                          : item.status === "waiting"
                          ? "text-info"
                          : item.status === "pending"
                          ? "text-primary"
                          : "text-danger"
                      }
                    >
                      {item.status === "pending"
                        ? "Chờ xác nhận"
                        : item.status === "waiting"
                        ? "Chờ giao hàng"
                        : item.status === "cancle"
                        ? "Đã hủy"
                        : item.status === "success"
                        ? "Hoàn thành"
                        : ""}
                    </td>
                    <td className="txt_bold txt_red">
                      {formatMoney(item.total)}
                    </td>
                    <td>
                      <Button
                        className="btn_sim btn_sim_success me-1"
                        variant="outline-primary"
                        onClick={() => handle_view_modal(item)}
                      >
                        <i className="fa fa-eye"></i>
                      </Button>
                      {type === "history" ? (
                        <Button
                          className="btn_sim btn_sim_cancle ms-1"
                          onClick={() => handle_bill(item, "delete")}
                        >
                          <i className="fa fa-trash-alt"></i>
                        </Button>
                      ) : (
                        <Button
                          className="btn_sim btn_sim_cancle ms-1"
                          onClick={() => handle_bill(item, "cancle")}
                        >
                          <i className="fa fa-times"></i>
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <SimPagination
            page={page}
            setPage={set_page}
            lenght={length}
            limit={limit}
          />
          {/* Modal */}
          <ModalViewBill show={show} setShow={set_show} id_order={id_order} />
        </>
      ) : (
        <h6>Chưa có dữ liệu</h6>
      )}
    </div>
  );
};

export default TableOrders;
