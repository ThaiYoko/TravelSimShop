import React, { useState, useEffect } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import {
  interFade_Category,
  interFade_Production,
} from "../../../../sp/interfade";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../../../sp/redux/slice/data";
import { formatMoney } from "../../../../sp/format";
import { sims_api } from "../../../../sp/api/admin/manager";
import { useAppDispatch } from "../../../../sp/hooks";
import { data_api } from "../../../../sp/api/data";
import { Reload_Sims_Success } from "../../../../sp/redux/slice/data";
import { AdminSelector } from "../../../../sp/redux/slice/admin";

interface interFade_Modal_Add_Sim {
  show: boolean;
  setShow: any;
  id_cate: number;
  id_product: number;
}
const ModalAddSim = ({
  show,
  setShow,
  id_cate,
  id_product,
}: interFade_Modal_Add_Sim) => {
  const handleClose = () => setShow(false);
  const dispatch = useAppDispatch();
  const accesstoken = useSelector(AdminSelector.accestoken);
  //Data
  const Productions = useSelector(DataPublicSelector.Productions);
  const Categorys = useSelector(DataPublicSelector.Categorys);

  const [cate_add, set_cate_add] = useState<interFade_Category>();
  const [prd_add, set_prd_add] = useState<interFade_Production>();

  useEffect(() => {
    const cate = Categorys?.find((item) => item.id === id_cate);
    set_cate_add(cate);
    const prd = Productions?.find((item) => item.id === id_product);
    set_prd_add(prd);
  }, [id_cate, id_product]);

  const [url, set_url] = useState("");
  const [name_sim, set_name_sim] = useState("");
  const [total_data, set_total_data] = useState("0");
  const [price, set_price] = useState("");
  const [discount, set_discount] = useState("0");
  const [speed_data, set_speed_data] = useState("");
  const [advantage, set_advantage] = useState("");
  const [expiry, set_expiry] = useState("1");
  const [active, set_active] = useState(false);
  const [telco, set_telco] = useState("");
  const [size_sim, set_size_sim] = useState("");
  const [limt, set_limit] = useState("");
  const [hotspot, set_hotspot] = useState(true);
  const [call, set_call] = useState(false);
  const [surplus, set_surplus] = useState("");
  const [use_call, set_use_call] = useState("");
  const [use_data, set_use_data] = useState("");
  const [use_manual, set_use_manual] = useState("");
  const [common, set_common] = useState(false);
  const [number_selled, set_number_selled] = useState("0");
  const [number_inventory, set_number_inventory] = useState("0");
  const [number_order, set_number_order] = useState("0");

  const handle_create_sim = async () => {
    await sims_api.Create(
      id_product,
      url,
      name_sim,
      Number(total_data),
      price,
      Number(discount),
      speed_data,
      advantage,
      Number(expiry),
      active,
      telco,
      size_sim,
      limt,
      hotspot,
      call,
      surplus,
      use_call,
      use_data,
      use_manual,
      common,
      Number(number_selled),
      Number(number_order),
      Number(number_inventory),
      dispatch,
      accesstoken
    );
    await data_api.reload_data("sims", dispatch, Reload_Sims_Success);
    handle_cancle();
  };
  const handle_cancle = () => {
    setShow(false);
    set_url("");
    set_name_sim("");
    set_total_data("0");
    set_price("");
    set_discount("0");
    set_speed_data("");
    set_advantage("");
    set_expiry("1");
    set_active(false);
    set_telco("");
    set_size_sim("");
    set_limit("");
    set_hotspot(true);
    set_call(false);
    set_surplus("");
    set_use_call("");
    set_use_data("");
    set_use_manual("");
    set_common(false);
    set_number_selled("0");
    set_number_inventory("0");
    set_number_order("0");
  };

  return (
    <div id="modal_edit_sim">
      <Modal show={show} onHide={handleClose} fullscreen={true}>
        <div className="w-80">
          <Modal.Header closeButton>
            <Modal.Title>
              {cate_add?.name.toUpperCase()} || {prd_add?.name.toUpperCase()}
            </Modal.Title>
          </Modal.Header>
        </div>

        <Modal.Body>
          <div className="w-80">
            <Row>
              {/* Tên sim */}
              <Col xs={4}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Name{" "}
                    {name_sim === "" ? (
                      <span className="text-danger">(*)</span>
                    ) : (
                      ""
                    )}
                  </Form.Label>
                  <Form.Control
                    placeholder="Tên sim"
                    value={name_sim}
                    onChange={(e) => set_name_sim(e.target.value)}
                    autoFocus
                  />
                </Form.Group>
              </Col>
              {/* Data */}
              <Col xs={1}>
                <Form.Group className="mb-3">
                  <Form.Label>Total Data</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    step={1}
                    value={total_data}
                    onChange={(e) => set_total_data(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* HSD */}
              <Col xs={1}>
                <Form.Group className="mb-3">
                  <Form.Label>Expiry (day)</Form.Label>
                  <Form.Control
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    value={expiry}
                    onChange={(e) => set_expiry(e.target.value)}
                    type="number"
                    step={1}
                    min={1}
                  />
                </Form.Group>
              </Col>
              {/* Giá */}
              <Col xs={3}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Price{" "}
                    {price === "" ? (
                      <span className="text-danger">(*)</span>
                    ) : (
                      ""
                    )}
                  </Form.Label>
                  <Form.Control
                    type="number"
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    value={price}
                    onChange={(e) => set_price(e.target.value)}
                    min={0}
                    step={100000}
                  />
                </Form.Group>
              </Col>
              {/* discount */}
              <Col xs={1}>
                <Form.Group className="mb-3">
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    type="number"
                    value={discount}
                    onChange={(e) => set_discount(e.target.value)}
                    min={0}
                    step={10000}
                  />
                </Form.Group>
              </Col>
              {/* Giá bán */}
              <Col xs={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Sale</Form.Label>
                  <Form.Control
                    value={formatMoney(
                      (Number(price) - Number(discount)).toString()
                    )}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row>
              {/* Telco */}
              <Col xs={2}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Nhà mạng{" "}
                    {telco === "" ? (
                      <span className="text-danger">(*)</span>
                    ) : (
                      ""
                    )}
                  </Form.Label>
                  <Form.Control
                    placeholder="Nhà mạng"
                    value={telco}
                    onChange={(e) => set_telco(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* limit */}
              <Col xs={2}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Vùng phủ sóng{" "}
                    {limt === "" ? (
                      <span className="text-danger">(*)</span>
                    ) : (
                      ""
                    )}
                  </Form.Label>
                  <Form.Control
                    placeholder="Mỹ, Canada,..."
                    value={limt}
                    onChange={(e) => set_limit(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* speed */}
              <Col xs={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Tốc độ data</Form.Label>
                  <Form.Control
                    placeholder="Không giới hạn 3G 128kbps"
                    value={speed_data}
                    onChange={(e) => set_speed_data(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* addvane */}
              <Col xs={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Ưu điểm</Form.Label>
                  <Form.Control
                    placeholder="Không giới hạn gọi điện, nhắn tin."
                    value={advantage}
                    onChange={(e) => set_advantage(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* Size sim */}
              <Col xs={2}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Kích thước sim{" "}
                    {size_sim === "" ? (
                      <span className="text-danger">(*)</span>
                    ) : (
                      ""
                    )}
                  </Form.Label>
                  <Form.Control
                    placeholder="sim thường/ micro/ nano"
                    value={size_sim}
                    onChange={(e) => set_size_sim(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* URL */}
              <Col xs={2}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    URL{" "}
                    {url === "" ? <span className="text-danger">(*)</span> : ""}
                  </Form.Label>
                  <Form.Control
                    placeholder="URL"
                    value={url}
                    onChange={(e) => set_url(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row>
              {/* selled */}
              <Col xs={1}>
                <Form.Group className="mb-3">
                  <Form.Label>Đã bán</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    step={10}
                    value={number_selled}
                    onChange={(e) => set_number_selled(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* inventory */}
              <Col xs={1}>
                <Form.Group className="mb-3">
                  <Form.Label>Có sẵn</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    step={10}
                    value={number_inventory}
                    onChange={(e) => set_number_inventory(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* order */}
              <Col xs={1}>
                <Form.Group className="mb-3">
                  <Form.Label>Đang order</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    step={10}
                    value={number_order}
                    onChange={(e) => set_number_order(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* common */}
              <Col xs={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Tự động kích hoạt sim</Form.Label>
                  <Form.Check
                    type="switch"
                    checked={!active}
                    onChange={(e) => set_active(!common)}
                  />
                </Form.Group>
              </Col>
              {/* common */}
              <Col xs={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Thông dụng quốc tế.</Form.Label>
                  <Form.Check
                    type="switch"
                    checked={common}
                    onChange={(e) => set_common(!common)}
                  />
                </Form.Group>
              </Col>
              {/* hotspot */}
              <Col xs={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Wifi hotspot</Form.Label>
                  <Form.Check
                    type="switch"
                    checked={hotspot}
                    onChange={(e) => set_hotspot(!hotspot)}
                  />
                </Form.Group>
              </Col>
              {/* Call */}
              <Col xs={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Nghe gọi</Form.Label>
                  <Form.Check
                    type="switch"
                    checked={call}
                    onChange={(e) => set_call(!call)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <hr />
            {call && (
              <Row>
                {/* surplus */}
                <Col xs={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Số dư tài khoản</Form.Label>
                    <Form.Control
                      placeholder="20bat."
                      value={surplus}
                      onChange={(e) => set_surplus(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                {/* use_call */}
                <Col xs={5}>
                  <Form.Group className="mb-3">
                    <Form.Label>Các nước có thể nghe gọi</Form.Label>
                    <InputGroup>
                      <Form.Control
                        as="textarea"
                        aria-label="With textarea"
                        value={use_call}
                        placeholder="Austria, Britain , Belgium, Bulgaria, Croatia, Cyprus,..."
                        onChange={(e) => set_use_call(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                {/* use_data */}
                <Col xs={5}>
                  <Form.Group className="mb-3">
                    <Form.Label>Các nước chỉ sử dụng data</Form.Label>
                    <InputGroup>
                      <Form.Control
                        as="textarea"
                        aria-label="With textarea"
                        placeholder="Austria, Britain , Belgium, Bulgaria, Croatia, Cyprus,..."
                        value={use_data}
                        onChange={(e) => set_use_data(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
            )}
            <Row>
              {/* usemanual */}
              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Hướng dẩn sử dụng sim</Form.Label>
                  <InputGroup>
                    <Form.Control
                      as="textarea"
                      aria-label="With textarea"
                      value={use_manual}
                      onChange={(e) => set_use_manual(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <div className="w-80">
          <div className="note">
            <span className="txt_bold">Lưu ý:</span>
            <div className="note_item">
              <span className="text-danger">(*)</span>{" "}
              <span>Dữ liệu bắt buộc.</span>
            </div>
            <div className="note_item">
              <span className="text-danger">URL</span>{" "}
              <span>
                Đường dẫn mong muốn - Không được sử dụng tiếng việt - Thay khoản
                trắng bằng kí tự "-" hoặc "_"
              </span>
            </div>
            <div className="note_item">
              <span className="text-danger">Nhà mạng</span>{" "}
              <span>
                Nếu có nhiều nhà mạng thuộc nhiều quốc gia khác nhau thì viết
                tách nhau bằng kí tự "||" <span className="txt_bold">VD:</span>{" "}
                Malaysia: Maxis||Indonesia: Telkomsel||Singapore: Singtel
              </span>
            </div>
            <div className="note_item">
              <span className="text-danger">Ưu điểm</span>{" "}
              <span>
                Nếu sim có nhiều ưu điểm thì viết tách nhau bằng kí tự "||"{" "}
                <span className="txt_bold">VD:</span>không bị chặn các ứng dụng
                : facebook . line , whats app v.v...||Không giới hạn nghe gọi.
              </span>
            </div>
            <div className="note_item">
              <span className="text-danger">
                Số lượng đã bán, Số lượng đang order
              </span>{" "}
              <span>Chỉ mang tính chất dữ liệu ban đầu</span>
            </div>
          </div>
        </div>
        <div className="w-80">
          <Modal.Footer>
            <Button variant="danger" onClick={handle_cancle}>
              Hủy
            </Button>
            <Button variant="success" onClick={handle_create_sim}>
              Thêm mới
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default ModalAddSim;
