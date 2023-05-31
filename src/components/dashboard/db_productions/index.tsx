import React, { useState, useEffect } from "react";
import { Button, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  DataPublicSelector,
  Reload_Productions_Success,
} from "../../../sp/redux/slice/data";
import { interFade_Production } from "../../../sp/interfade";
import "./style.scss";
import { productions_api } from "../../../sp/api/admin/manager";
import { data_api } from "../../../sp/api/data";
import { useAppDispatch } from "../../../sp/hooks";
import SimPagination from "../../../layouts/pagination";
import { AdminSelector } from "../../../sp/redux/slice/admin";

const DBProductions = () => {
  const dispatch = useAppDispatch();
  const accesstoken = useSelector(AdminSelector.accestoken);
  const [id_cate, set_id_cate] = useState<number>(1);

  //Data
  const Categorys = useSelector(DataPublicSelector.Categorys);
  const Productions = useSelector(DataPublicSelector.Productions);
  //Add
  const [add, setAdd] = useState(false);
  const [new_name, set_new_name] = useState("");
  const [new_url, set_new_url] = useState("");
  const [photo, setPhoto] = useState("");
  const onchangePhoto = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  const handle_add_productions = async () => {
    await productions_api.Add(
      new_name,
      new_url,
      id_cate,
      photo,
      dispatch,
      accesstoken
    );
    set_new_name("");
    set_new_url("");
    setPhoto("");
    setAdd(false);
    await data_api.reload_data(
      "productions",
      dispatch,
      Reload_Productions_Success
    );
  };

  //Edit
  const [edit, setEdit] = useState("");
  const [namePrd, setName_Prd] = useState("");
  const [url, set_url] = useState("");

  const handle_edit_productions = async (prd: interFade_Production) => {
    await productions_api.Edit(prd, namePrd, url, photo, dispatch, accesstoken);
    setName_Prd("");
    set_url("");
    setEdit("");
    await data_api.reload_data(
      "productions",
      dispatch,
      Reload_Productions_Success
    );
  };

  //Delete
  const handle_delete_productions = async (prd: interFade_Production) => {
    if (
      window.confirm(
        `Bạn đang thực hiện xóa khu vực ${prd.name}. Sau khi khu vực ${prd.name} được xóa toàn bộ sim thuộc khu vực này sẽ được xóa theo. Bạn có muốn xóa khu vực ${prd.name}?`
      )
    ) {
      await productions_api.Delete(prd, dispatch, accesstoken);
      await data_api.reload_data(
        "productions",
        dispatch,
        Reload_Productions_Success
      );
    } else {
      return;
    }
  };

  //Render Product
  const limit = 5;
  const [page, setPage] = useState(1);
  const [product_render, set_product_render] = useState<interFade_Production[]>(
    []
  );

  const [length, setLength] = useState(0);
  useEffect(() => {
    const ofset = (page - 1) * limit;
    const array = Productions?.filter((item) => item.idCate === id_cate);
    setLength(array.length);
    const list = array.splice(ofset, ofset + limit);
    set_product_render(list);
  }, [id_cate, Productions, page]);
  return (
    <div id="db_productions">
      <div className="prd_content bsd bg_white">
        <div className="db_prd">
          <div className="btn_add">
            {add ? (
              <Button
                className="btn_sim btn_sim_cancle"
                onClick={() => setAdd(false)}
              >
                <i className="fa fa-times"></i>
              </Button>
            ) : (
              <Button
                className="btn_sim btn_sim_success"
                onClick={() => setAdd(true)}
              >
                <i className="fa fa-plus"></i>
              </Button>
            )}
          </div>
          <div className="db_header">
            <h6>PRODUCTIONS</h6>
          </div>
          <hr />

          <ul className="prd_filter">
            {Categorys?.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => set_id_cate(item.id)}
                  className={id_cate === item.id ? "active" : ""}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
          <hr />
          {add && (
            <div className="add_prod">
              <h6>Thêm Mới Khu Vực</h6>
              <div className="add_input">
                <Row>
                  <Col xs={12} md={6} xl={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tên khu vực</Form.Label>
                      <InputGroup>
                        <Form.Control
                          className="p-2"
                          placeholder="Tên khu vực"
                          value={new_name}
                          onChange={(e) => set_new_name(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} xl={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>URL</Form.Label>
                      <InputGroup>
                        <Form.Control
                          className="p-2"
                          placeholder="URL hiển thị"
                          value={new_url}
                          onChange={(e) => set_new_url(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} xl={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>IMAGE</Form.Label>
                      <InputGroup>
                        <Form.Control
                          className="p-2"
                          type="file"
                          accept="image/*"
                          placeholder="URL hiển thị"
                          onChange={(e) => onchangePhoto(e)}
                        />
                        <Button onClick={() => handle_add_productions()}>
                          <span className="material-symbols-outlined">
                            done
                          </span>
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <hr className="txt_white" />
            </div>
          )}
          <div className="db_prd_table">
            <Table striped bordered hover responsive>
              <thead>
                <tr className="txt_center">
                  <th>#</th>
                  <th>NAME</th>
                  <th>URL</th>
                  <th>IMAGE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {product_render?.map((item, index) => {
                  return (
                    <tr key={index} className="txt_center">
                      <td>{index + 1}</td>
                      <td>
                        {edit === item.name ? (
                          <Form.Group className="mb-3">
                            <Form.Control
                              placeholder="Tên Production"
                              value={namePrd}
                              onChange={(e) => setName_Prd(e.target.value)}
                            />
                          </Form.Group>
                        ) : (
                          item.name
                        )}
                      </td>
                      <td>
                        {edit === item.name ? (
                          <Form.Group className="mb-3">
                            <Form.Control
                              placeholder="URL"
                              value={url}
                              onChange={(e) => set_url(e.target.value)}
                            />
                          </Form.Group>
                        ) : (
                          item.url
                        )}
                      </td>
                      <td>
                        {edit === item.name ? (
                          <div className="prd_image">
                            <InputGroup>
                              <Form.Control
                                type={"file"}
                                accept="image/*"
                                onChange={(e) => onchangePhoto(e)}
                              />
                            </InputGroup>
                          </div>
                        ) : (
                          <div className="prd_image">
                            <img src={item.avatar} alt={item.name} />
                          </div>
                        )}
                      </td>
                      <td>
                        {edit === item.name ? (
                          <>
                            <Button
                              className="btn_sim btn_sim_cancle me-1"
                              onClick={() => setEdit("")}
                            >
                              <i className="fa fa-times"></i>
                            </Button>

                            <Button
                              className="btn_sim btn_sim_success ms-1"
                              onClick={() => handle_edit_productions(item)}
                            >
                              <i className="fa fa-check"></i>
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              className="btn_sim btn_sim_cancle me-1"
                              onClick={() => handle_delete_productions(item)}
                            >
                              <i className="fa fa-trash-alt"></i>
                            </Button>
                            <Button
                              className="btn_sim btn_sim_success ms-1"
                              onClick={() => {
                                setEdit(item.name);
                                setName_Prd(item.name);
                                set_url(item.url);
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
            {
              <SimPagination
                limit={limit}
                page={page}
                setPage={setPage}
                lenght={length}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBProductions;
