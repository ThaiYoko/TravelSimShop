import React, { useState, useEffect } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { interFade_Sim } from "../../../../sp/interfade";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../../../sp/redux/slice/data";
import { formatMoney } from "../../../../sp/format";
import { sims_api } from "../../../../sp/api/admin/manager";
import { useAppDispatch } from "../../../../sp/hooks";
import { data_api } from "../../../../sp/api/data";
import { Reload_Sims_Success } from "../../../../sp/redux/slice/data";
import { AdminSelector } from "../../../../sp/redux/slice/admin";

interface interFade_Modal_Edit_Sim {
  show: boolean;
  setShow: any;
  id: number;
}
const ModalEditSim = ({ show, setShow, id }: interFade_Modal_Edit_Sim) => {
  const handleClose = () => setShow(false);
  const dispatch = useAppDispatch();
  const accesstoken = useSelector(AdminSelector.accestoken);
  //Data
  const Sims = useSelector(DataPublicSelector.Sims);

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

  const [sim_edit, set_sim_edit] = useState({} as interFade_Sim);

  useEffect(() => {
    const sim = Sims?.find((item) => item.id === id);
    if (sim) {
      set_sim_edit(sim);
      set_url(sim?.url);
      set_name_sim(sim?.name);
      set_total_data(sim?.total_data?.toString());
      set_expiry(sim?.expiry?.toString());
      set_price(sim?.price);
      set_discount(sim?.discount?.toString());
      set_telco(sim?.telco);
      set_limit(sim?.limit);
      set_speed_data(sim?.speed_data);
      set_advantage(sim?.advantage);
      set_size_sim(sim?.size_sim);
      set_number_selled(sim?.number_selled?.toString());
      set_number_inventory(sim?.number_inventory?.toString());
      set_number_order(sim.number_order?.toString());
      set_active(sim?.active);
      set_common(sim?.common);
      set_hotspot(sim?.hotspot);
      set_call(sim?.call);
      set_surplus(sim?.surplus);
      set_use_call(sim?.use_call);
      set_use_data(sim?.use_data);
      set_use_manual(sim?.use_manual);
    }
  }, [id, show]);

  const handle_edit_sim = async () => {
    await sims_api.Edit(
      id,
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
            <Modal.Title>{sim_edit?.name?.toUpperCase()}</Modal.Title>
          </Modal.Header>
        </div>

        <Modal.Body>
          <div className="w-80">
            <Row>
              {/* Name */}
              <Col xs={12} md={6} xl={4} xxl={3}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Name <span className="text-danger">(*)</span>
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
              <Col xs={12} md={3} xl={2}>
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
              <Col xs={12} md={3} xl={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Expiry (day)</Form.Label>
                  <Form.Control
                    value={expiry}
                    onChange={(e) => set_expiry(e.target.value)}
                    type="number"
                    step={1}
                    min={1}
                  />
                </Form.Group>
              </Col>
              {/* Giá */}
              <Col xs={12} md={6} xl={4} xxl={2}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Price <span className="text-danger">(*)</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    value={price}
                    onChange={(e) => set_price(e.target.value)}
                    min={0}
                    step={500}
                  />
                </Form.Group>
              </Col>
              {/* discount */}
              <Col xs={12} md={3} xl={2} xxl={1}>
                <Form.Group className="mb-3">
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    value={discount}
                    onChange={(e) => set_discount(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* Giá bán */}
              <Col xs={12} md={3} xl={3} xxl={2}>
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
              <Col xs={12} md={6} xl={5}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Telco <span className="text-danger">(*)</span>
                  </Form.Label>
                  <Form.Control
                    placeholder="Nhà mạng"
                    value={telco}
                    onChange={(e) => set_telco(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* limit */}
              <Col xs={12} md={6} xl={3}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Limit <span className="text-danger">(*)</span>
                  </Form.Label>
                  <Form.Control
                    placeholder="Vùng phủ sóng :Mỹ, Canada,..."
                    value={limt}
                    onChange={(e) => set_limit(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* speed */}
              <Col xs={12} md={6} xl={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Speed Data</Form.Label>
                  <Form.Control
                    placeholder="Tốc độ data"
                    value={speed_data}
                    onChange={(e) => set_speed_data(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* addvane */}
              <Col xs={12} md={6} xl={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Advantage</Form.Label>
                  <Form.Control
                    placeholder="Ưu điểm vượt trội."
                    value={advantage}
                    onChange={(e) => set_advantage(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* Size sim */}
              <Col xs={12} md={6} xl={2}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Size Sim <span className="text-danger">(*)</span>
                  </Form.Label>
                  <Form.Control
                    placeholder="sim thường/ micro/ nano"
                    value={size_sim}
                    onChange={(e) => set_size_sim(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* URL */}
              <Col xs={12} md={6} xl={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    URL <span className="text-danger">(*)</span>
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
              <Col xs={12} md={4} xl={2} xxl={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Selled</Form.Label>
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
              <Col xs={12} md={4} xl={2} xxl={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Inventory</Form.Label>
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
              <Col xs={12} md={4} xl={2} xxl={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Orders</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    step={10}
                    value={number_order}
                    onChange={(e) => set_number_order(e.target.value)}
                  />
                </Form.Group>
              </Col>
              {/* Active */}
              <Col xs={6} md={3} xl={2} xxl={2}>
                <Form.Group className="mb-3">
                  <Form.Label>Auto Active</Form.Label>
                  <Form.Check
                    type="switch"
                    checked={!active}
                    onChange={(e) => set_active(!common)}
                  />
                </Form.Group>
              </Col>
              {/* common */}
              <Col xs={6} md={3} xl={2} xxl={1}>
                <Form.Group className="mb-3">
                  <Form.Label>Common</Form.Label>
                  <Form.Check
                    type="switch"
                    checked={common}
                    onChange={(e) => set_common(!common)}
                  />
                </Form.Group>
              </Col>
              {/* hotspot */}
              <Col xs={6} md={3} xl={2} xxl={2}>
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
              <Col xs={6} md={3} xl={2} xxl={1}>
                <Form.Group className="mb-3">
                  <Form.Label>Call</Form.Label>
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
                <Col xs={12} xl={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Surplus</Form.Label>
                    <Form.Control
                      placeholder="Số dư tài khoản nếu có."
                      value={surplus}
                      onChange={(e) => set_surplus(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                {/* use_call */}
                <Col xs={12} xl={5}>
                  <Form.Group className="mb-3">
                    <Form.Label>Use Call</Form.Label>
                    <InputGroup>
                      <Form.Control
                        as="textarea"
                        aria-label="With textarea"
                        value={use_call}
                        placeholder="Các nước có thể nghe gọi: Austria, Britain , Belgium, Bulgaria, Croatia, Cyprus,..."
                        onChange={(e) => set_use_call(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                {/* use_data */}
                <Col xs={12} xl={5}>
                  <Form.Group className="mb-3">
                    <Form.Label>User Data</Form.Label>
                    <InputGroup>
                      <Form.Control
                        as="textarea"
                        aria-label="With textarea"
                        placeholder="Các nước chỉ sử dụng data: Austria, Britain , Belgium, Bulgaria, Croatia, Cyprus,..."
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
                  <Form.Label>Usermanual</Form.Label>
                  <InputGroup>
                    <Form.Control
                      as="textarea"
                      aria-label="With textarea"
                      value={use_manual}
                      onChange={(e) => set_use_manual(e.target.value)}
                      placeholder="Hướng dẫn sử dụng sim nếu có."
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
              <span className="text-danger txt_bold">(*)</span>{" "}
              <span>Dữ liệu bắt buộc.</span>
            </div>
            <div className="note_item">
              <span className="text-danger txt_bold">URL</span>{" "}
              <span>
                Đường dẫn mong muốn - Không được sử dụng tiếng việt - Thay khoản
                trắng bằng kí tự "-" hoặc "_"
              </span>
            </div>
            <div className="note_item">
              <span className="text-danger txt_bold">Telco</span>{" "}
              <span>
                Nếu có nhiều nhà mạng thuộc nhiều quốc gia khác nhau thì viết
                tách nhau bằng kí tự "||" <span className="txt_bold">VD:</span>{" "}
                Malaysia: Maxis||Indonesia: Telkomsel||Singapore: Singtel
              </span>
            </div>
            <div className="note_item">
              <span className="text-danger txt_bold">Ưu điểm</span>{" "}
              <span>
                Nếu sim có nhiều ưu điểm thì viết tách nhau bằng kí tự "||"{" "}
                <span className="txt_bold">VD:</span>không bị chặn các ứng dụng
                : facebook . line , whats app v.v...||Không giới hạn nghe gọi.
              </span>
            </div>
            <div className="note_item">
              <span className="text-danger txt_bold">Selled, Orders</span>{" "}
              <span>Chỉ mang tính chất dữ liệu ban đầu</span>
            </div>
          </div>
        </div>
        <div className="w-80">
          <Modal.Footer>
            <Button variant="danger" onClick={handle_cancle}>
              Hủy
            </Button>
            <Button variant="success" onClick={handle_edit_sim}>
              Lưu
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default ModalEditSim;
