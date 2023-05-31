import React, { useEffect, useState } from "react";
import { Button, Table, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  DataPublicSelector,
  Reload_Sims_Success,
} from "../../../sp/redux/slice/data";
import SimPagination from "../../../layouts/pagination";
import "./style.scss";
import { interFade_Production, interFade_Sim } from "../../../sp/interfade";
import ModalEditSim from "./modal_db_sim/edit";
import { formatMoney } from "../../../sp/format";
import { sims_api } from "../../../sp/api/admin/manager";
import { data_api } from "../../../sp/api/data";
import { useAppDispatch } from "../../../sp/hooks";
import ModalAddSim from "./modal_db_sim/add";
import { AdminSelector } from "../../../sp/redux/slice/admin";

const DBSims = () => {
  const dispatch = useAppDispatch();
  const accesstoken = useSelector(AdminSelector.accestoken);
  //Data
  const Categorys = useSelector(DataPublicSelector.Categorys);
  const Productions = useSelector(DataPublicSelector.Productions);
  const Sims = useSelector(DataPublicSelector.Sims);
  const [prduct_online, set_product_online] = useState<interFade_Production[]>(
    []
  );
  const [id_cate, set_id_cate] = useState(1);
  const [id_product, set_id_product] = useState<number>(0);
  const [sim_render, set_sim_render] = useState<interFade_Sim[]>([]); //List sim show

  const [id_sim_edit, set_id_sim_edit] = useState(0);

  const onchang_sim_edit = (sim: interFade_Sim) => {
    set_id_sim_edit(sim.id);
    setShow(true);
  };

  useEffect(() => {
    const list = Productions?.filter((item) => item?.idCate === id_cate);
    set_product_online(list);
    set_id_product(list[0].id);
  }, [id_cate]);

  const limit = 10;
  const [page, setPage] = useState(1);
  const [length, set_length] = useState(0);
  useEffect(() => {
    const ofset = (page - 1) * limit;
    const array = Sims?.filter((item) => item.idProduct === id_product);
    set_length(array.length);
    const list = array.splice(ofset, ofset + limit);
    set_sim_render(list);
  }, [id_product, Sims, page]);
  //Add
  const [add, setAdd] = useState(false);

  //Edit
  const [show, setShow] = useState(false);

  const handle_delete_sim = async (sim: interFade_Sim) => {
    if (
      window.confirm(
        `Bạn đang thực hiện lệnh xóa ${sim.name} vĩnh viễn. Bạn có muốn tiếp tục? `
      )
    ) {
      await sims_api.Delete(sim, dispatch, accesstoken);
      await data_api.reload_data("sims", dispatch, Reload_Sims_Success);
    } else {
      return;
    }
  };
  return (
    <div id="db_sims">
      <div className="sims_content bsd bg_white">
        <div className="db_sim">
          <div className="btn_add">
            <Button
              className="btn_sim btn_sim_success"
              onClick={() => setAdd(true)}
            >
              <i className="fa fa-plus"></i>
            </Button>
          </div>
          <div className="db_header">
            <h6>SIMS</h6>
          </div>
          <hr />
          <div className="sim_filter">
            <ul className="filter_by_cate">
              {Categorys?.map((item, index) => {
                return (
                  <li
                    className={id_cate === item.id ? "active" : ""}
                    key={index}
                    onClick={() => set_id_cate(item.id)}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
            <hr />
            <ul className="filter_by_product">
              {prduct_online?.map((item, index) => {
                return (
                  <li
                    className={id_product === item.id ? "active" : ""}
                    key={index}
                    onClick={() => set_id_product(item.id)}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
            <hr />
          </div>
          <div className="db_prd_table">
            <Table bordered hover responsive>
              <thead>
                <tr className="txt_center">
                  <th>#</th>
                  <th>Production</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Sale</th>
                  <th>Data(GB)</th>
                  <th>Expiry(day)</th>
                  <th>Limit</th>
                  <th>Common</th>
                  <th>Auto active</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {sim_render?.map((item, index) => {
                  return (
                    <tr key={index} className="txt_center">
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{formatMoney(item.price)}</td>
                      <td>{formatMoney(item.discount)}</td>
                      <td>
                        {formatMoney(
                          (
                            Number(item.price) - Number(item.discount)
                          ).toString()
                        )}
                      </td>
                      <td className={item.total_data ? "" : "txt_white"}>
                        {item.total_data !== 0
                          ? `${item.total_data}GB`
                          : "Không giới hạn 4G"}
                      </td>
                      <td>{item.expiry} Ngày</td>
                      <td>{item.limit}</td>
                      <td>{item.common ? "True" : "False"}</td>
                      <td>{!item.active ? "True" : "False"}</td>
                      <td>
                        <>
                          <Button
                            className="btn_sim btn_sim_cancle me-1"
                            onClick={() => handle_delete_sim(item)}
                          >
                            <i className="fa fa-trash-alt"></i>
                          </Button>
                          <Button
                            className="btn_sim btn_sim_success ms-1"
                            onClick={() => onchang_sim_edit(item)}
                          >
                            <i className="fa fa-cogs"></i>
                          </Button>
                        </>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <SimPagination
              limit={limit}
              page={page}
              setPage={setPage}
              lenght={length}
            />
            {/* Modal */}
            <ModalEditSim show={show} setShow={setShow} id={id_sim_edit} />
            <ModalAddSim
              show={add}
              setShow={setAdd}
              id_cate={id_cate}
              id_product={id_product}
            />
          </div>
          <div className="note">
            <span className="" style={{ fontStyle: "italic" }}>
              Price: Giá gốc || Sale: Giá sau discount || Data: Tổng dung lượng
              data {"=>"} Mức 0 tương đương "Không giới hạn 4G tốc độ cao." ||
              Auto active - True :Tự động kích hoạt || Common: Thông dụng Quốc
              tế
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBSims;
