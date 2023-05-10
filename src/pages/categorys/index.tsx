import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../sp/redux/slice/data";
import CategorySim from "../../components/categorys";
import { interFade_Production } from "../../sp/interfade";
import { Button, Col, Form, FormGroup, InputGroup, Row } from "react-bootstrap";

const Categorys = () => {
  const { cate } = useParams();
  const Categorys = useSelector(DataPublicSelector.Categorys);
  const Productions = useSelector(DataPublicSelector.Productions);

  const [cateRender, setCateRender] = useState("");
  const [prdRender, setPrdRender] = useState<interFade_Production[]>([]);

  useEffect(() => {
    if (cate) {
      setCateRender(cate);
    }
  }, [cate]);

  useEffect(() => {
    if (cate) {
      const cateShow = Categorys?.find((item) => item.url === cate);
      if (cateShow) {
        const list = Productions?.filter((item) => item.idCate === cateShow.id);
        if (list) {
          setPrdRender(list);
        }
      }
    }
  }, []);

  return (
    <section id="categorys">
      <div className="w-80">
        <div className="cate_content bsd">
          <div className="cate_filter">
            <ul className="filter_by_cate">
              <span className="d-block">Khu vực</span>
              {Categorys?.map((item, index) => {
                return (
                  <li
                    className={cate === item.url ? "cate_active" : ""}
                    key={index}
                  >
                    {item.name}
                  </li>
                );
              })}
            </ul>
            <hr />
            <ul className="filter_by_prd">
              <span className="d-block">Vùng</span>
              {prdRender?.map((prd, index) => {
                return (
                  <li className="prd_item" key={index}>
                    {prd.name}
                  </li>
                );
              })}
            </ul>
            <hr />
            <div className="filter_by_info">
              <Row>
                <Col xl={3} sm={6} xs={12}>
                  <div className="by_money">
                    <FormGroup>
                      <Form.Label>Chọn giá</Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Select>
                          <option value={500}>100.000đ - 500.000đ</option>
                          <option value={1000}>500.000đ - 1.000.000đ</option>
                        </Form.Select>
                      </InputGroup>
                    </FormGroup>
                  </div>
                </Col>

                <Col xl={3} sm={6} xs={12}>
                  <div className="by_date">
                    <FormGroup>
                      <Form.Label>Hạn sử dụng</Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Select>
                          <option value={500}>
                            Theo ngày sử dụng từ thấp đến cao
                          </option>
                          <option value={1000}>
                            Theo ngày sử dụng từ cao đến thấp
                          </option>
                        </Form.Select>
                      </InputGroup>
                    </FormGroup>
                  </div>
                </Col>

                <Col xl={3} sm={6} xs={12}>
                  <div className="by_size">
                    <FormGroup>
                      <Form.Label>Dung lượng</Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Select>
                          <option value={500}>
                            Theo dung lượng từ thấp đến cao
                          </option>
                          <option value={1000}>
                            Theo dung lượng từ cao đến thấp
                          </option>
                        </Form.Select>
                      </InputGroup>
                    </FormGroup>
                  </div>
                </Col>

                <Col xl={3} sm={6} xs={12}>
                  <div className="by_name">
                    <FormGroup>
                      <Form.Label>Tên sim</Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control placeholder="Nhập tên sim" />
                        <Button>
                          <span className="material-symbols-outlined">
                            search
                          </span>
                        </Button>
                      </InputGroup>
                    </FormGroup>
                  </div>
                </Col>
              </Row>
            </div>
            <hr />
          </div>

          <div className="cate_render p-3">
            <div className="cate_render_content">
              <CategorySim cate={cate} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categorys;
