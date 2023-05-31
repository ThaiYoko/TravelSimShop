import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  DataPublicSelector,
  Reload_Categorys_Success,
} from "../../../sp/redux/slice/data";
import "./style.scss";
import { Button, ButtonGroup, Form, InputGroup, Table } from "react-bootstrap";
import { interFade_Category } from "../../../sp/interfade";
import { category_api } from "../../../sp/api/admin/manager";
import { useAppDispatch } from "../../../sp/hooks";
import { data_api } from "../../../sp/api/data";
import { AdminSelector } from "../../../sp/redux/slice/admin";

const DBCategorys = () => {
  const dispatch = useAppDispatch();
  const accesstoken = useSelector(AdminSelector.accestoken);
  const Categorys = useSelector(DataPublicSelector.Categorys);
  const [addCate, setAddCate] = useState(false);
  const [editCate, setEditCate] = useState("");
  const [nameCate, setNameCate] = useState("");
  const [name_newCate, setName_newCate] = useState("");

  const handle_add_category = async () => {
    await category_api.Add(name_newCate, dispatch, accesstoken);
    await data_api.reload_data("categorys", dispatch, Reload_Categorys_Success);
    setName_newCate("");
    setAddCate(false);
  };
  const handle_edit_category = async (cate: interFade_Category) => {
    await category_api.Edit(cate, nameCate, dispatch, accesstoken);
    await data_api.reload_data("categorys", dispatch, Reload_Categorys_Success);
    setEditCate("");
  };
  const handle_delete_category = async (cate: interFade_Category) => {
    if (
      window.confirm(
        `Bạn đang thực hiện lệnh xóa vĩnh viễn vùng ${cate.name}. Toàn bộ khu vực và sim thuộc khu vực này sẽ được xóa vĩnh viễn theo. Bạn có muốn tiếp tục?`
      )
    ) {
      await category_api.Delete(cate, dispatch, accesstoken);
      await data_api.reload_data(
        "categorys",
        dispatch,
        Reload_Categorys_Success
      );
    } else {
      return;
    }
  };
  return (
    <div id="db_product">
      <div className="db_product_content bsd bg_white">
        <div className="db_cate">
          <div className="btn_add">
            {addCate ? (
              <Button
                className="btn_sim btn_sim_cancle"
                onClick={() => setAddCate(false)}
              >
                <span className="material-symbols-outlined">
                  <i className="fa fa-times"></i>
                </span>
              </Button>
            ) : (
              <Button
                className="btn_sim btn_sim_success"
                onClick={() => setAddCate(true)}
              >
                <i className="fa fa-plus"></i>
              </Button>
            )}
          </div>

          <div className="db_header">
            <h6>CATEGORYS</h6>
          </div>
          <hr className="txt_white" />
          {addCate && (
            <div className="add_cate">
              <h6>Thêm mới categorys</h6>
              <div className="add_input w-50">
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="Tên category"
                      value={name_newCate}
                      onChange={(e) => setName_newCate(e.target.value)}
                    />
                    <Button
                      variant="success"
                      onClick={() => handle_add_category()}
                    >
                      <i className="fa fa-check"></i>
                    </Button>
                  </InputGroup>
                  <Form.Text>
                    URL vùng sẽ được tạo tự động theo tên của vùng
                  </Form.Text>
                </Form.Group>
              </div>
              <hr className="txt_white" />
            </div>
          )}
          <div className="db_cate_items mt-4">
            <Table striped bordered hover responsive>
              <thead>
                <tr className="txt_center">
                  <th>#</th>
                  <th>NAME</th>
                  <th>URL</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {Categorys?.map((item, index) => {
                  return (
                    <tr key={index} className="txt_center">
                      <td>{index + 1}</td>
                      <td>
                        {editCate === item.name ? (
                          <Form.Group className="mb-3">
                            <Form.Control
                              placeholder="Tên category"
                              value={nameCate}
                              onChange={(e) => setNameCate(e.target.value)}
                            />
                          </Form.Group>
                        ) : (
                          item.name
                        )}
                      </td>
                      <td>{item.url}</td>
                      <td>
                        {editCate === item.name ? (
                          <>
                            <Button
                              className="btn_sim btn_sim_cancle me-1"
                              onClick={() => setEditCate("")}
                            >
                              <i className="fa fa-times"></i>
                            </Button>
                            <Button
                              className="btn_sim btn_sim_success ms-1"
                              onClick={() => handle_edit_category(item)}
                            >
                              <i className="fa fa-check"></i>
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              className="btn_sim btn_sim_cancle me-1"
                              onClick={() => handle_delete_category(item)}
                            >
                              <i className="fa fa-trash-alt"></i>
                            </Button>
                            <Button
                              className="btn_sim btn_sim_success ms-1"
                              onClick={() => {
                                setEditCate(item.name);
                                setNameCate(item.name);
                              }}
                            >
                              <i className="fa fa-cog"></i>
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBCategorys;
