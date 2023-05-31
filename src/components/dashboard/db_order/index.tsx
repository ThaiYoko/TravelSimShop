import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  AdminSelector,
  Reload_Order_Success,
} from "../../../sp/redux/slice/admin";
import "./style.scss";
import { admin_data_api } from "../../../sp/api/admin/data";
import { useAppDispatch } from "../../../sp/hooks";
import TableOrders from "./table_orders";

const DBOrders = () => {
  const dispatch = useAppDispatch();
  const accesstoken = useSelector(AdminSelector.accestoken);

  const handle_reload_order = async () => {
    await admin_data_api.reload_data(
      "orders",
      dispatch,
      Reload_Order_Success,
      accesstoken
    );
  };
  return (
    <div id="db_orders">
      <div className="order_content">
        <Button
          onClick={handle_reload_order}
          className="btn_refresh btn_sim btn_sim_success"
        >
          <i className="fa fa-sync"></i>
        </Button>
      </div>

      <div className="order_content bsd bg_white p-4 mt-4">
        <div className="db_header">
          <h6>CHỜ XÁC NHẬN</h6>
        </div>
        <hr />
        <TableOrders type="pending" />
      </div>

      <div className="order_content bsd bg_white p-4 mt-4">
        <div className="db_header">
          <h6>CHỜ GIAO HÀNG</h6>
        </div>
        <hr />
        <TableOrders type="waiting" />
      </div>

      {/* History */}
      <div className="order_content bsd bg_white p-4 mt-4">
        <div className="db_header">
          <h6>LỊCH SỬ</h6>
        </div>
        <hr />
        <TableOrders type="history" />
      </div>
    </div>
  );
};

export default DBOrders;
