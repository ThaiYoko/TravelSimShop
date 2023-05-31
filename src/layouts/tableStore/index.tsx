import React, { useState, useEffect } from "react";
import "./style.scss";
import { formatMoney } from "../../sp/format";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  Add_Sim_Success,
  Delete_Sim_Success,
  Remove_Sim_Success,
} from "../../sp/redux/slice/data";
import { interFade_Store } from "../../sp/interfade";

interface interFade_TableStore {
  admin: boolean;
  array: interFade_Store[];
}

const TableStore = ({ admin, array }: interFade_TableStore) => {
  const dispatch = useDispatch();

  const [total_price, set_total_price] = useState(0);

  const handle_add_item = (sim: interFade_Store) => {
    dispatch(Add_Sim_Success(sim));
  };

  const handle_remove_item = (sim: interFade_Store) => {
    dispatch(Remove_Sim_Success(sim));
  };
  const handle_delete_item = (sim: interFade_Store) => {
    dispatch(Delete_Sim_Success(sim));
  };

  useEffect(() => {
    let a = 0;
    array.map((item) => {
      a +=
        (Number(item?.sim?.price) - Number(item?.sim?.discount)) * item?.count;
    });
    set_total_price(a);
  }, [array]);
  return (
    <div className={admin ? "table_store" : "table_store bsd"}>
      <div className="head_table">
        <div className="xl_item">
          <h6>SẢN PHẨM</h6>
        </div>
        <div className="md_item">
          <div className="sm_item txt_bold">ĐƠN GIÁ</div>
          <div className="sm_item txt_bold">SỐ LƯỢNG</div>
          <div className="sm_item txt_bold">TẠM TÍNH</div>
        </div>
      </div>
      <hr />
      {array?.map((item, index) => {
        return (
          <div key={index} className="main_table mb-3">
            <div className="xl_item">
              <div className="btn_item">
                {admin ? (
                  <i className="fa fa-trash-alt"></i>
                ) : (
                  <i
                    className="fa fa-trash-alt"
                    onClick={() => handle_delete_item(item)}
                  ></i>
                )}
              </div>
              <div className="img_item">
                <img
                  src={item?.sim?.Production?.avatar}
                  alt={item?.sim?.url}
                  className="d-block w-100 img-fluid"
                />
              </div>
              <div className="info_item">
                <h6>{item?.sim?.name}</h6>
                <p>
                  {item?.sim?.expiry} NGÀY :{" "}
                  {item?.sim?.total_data === 0
                    ? "Không giới hạn 4G"
                    : item?.sim?.total_data % item?.sim?.expiry === 0
                    ? `${item?.sim?.total_data / item?.sim?.expiry}GB/NGÀY`
                    : `TỔNG : ${item?.sim?.total_data}GB`}
                </p>
              </div>
            </div>
            <div className="md_item">
              <div className="sm_item text-danger txt_bold">
                {formatMoney(
                  (
                    Number(item?.sim?.price) - Number(item.sim.discount)
                  ).toString()
                )}
              </div>

              <div className="sm_item">
                {admin ? (
                  <div className="sm_count">
                    <div className="btn_count bg_white txt_black">
                      {item?.count}
                    </div>
                  </div>
                ) : (
                  <div className="sm_count">
                    <div
                      className="btn_count"
                      onClick={() => handle_remove_item(item)}
                    >
                      <i className="fa fa-minus"></i>
                    </div>
                    <div className="btn_count bg_white txt_black">
                      {item?.count}
                    </div>
                    <div
                      className="btn_count"
                      onClick={() => handle_add_item(item)}
                    >
                      <i className="fa fa-plus"></i>
                    </div>
                  </div>
                )}
              </div>
              <div className="sm_item text-danger txt_bold">
                {formatMoney(
                  (
                    (Number(item?.sim?.price) - Number(item?.sim?.discount)) *
                    item?.count
                  ).toString()
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div className="table_price">
        <Row>
          <Col xs={12}>
            <div className="total_price">
              <div className="price_header">
                <i className="fa fa-donate me-2 mb-2"></i>
                <h6 className="ms-2 mb-2 txt_bold">TỔNG THANH TOÁN</h6>
              </div>

              <div className="total_price_items p-2">
                <div className="price_item">
                  <span className="me-2">Tiền Hàng:</span>
                  <span className="text-danger txt_bold">
                    {formatMoney(total_price.toString())}
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TableStore;
