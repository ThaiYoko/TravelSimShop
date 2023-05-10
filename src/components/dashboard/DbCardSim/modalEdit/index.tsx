import React from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { interFade_Sim } from "../../../../sp/interfade";
import { formatMoney } from "../../../../sp/format";

interface interFade_ModalEditSim {
  show: boolean;
  setShow: any;
  sim: interFade_Sim;
}
const ModalEditSim = ({ show, setShow, sim }: interFade_ModalEditSim) => {
  const handleClose = () => setShow(false);
  console.log(sim);
  return (
    <div>
      <Modal fullscreen show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{sim?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="sim_detail">
            <div className="w-70">
              <div className="sim_content">
                <Row className="bsd">
                  <Col xs={12} xl={6}>
                    <div className="sim_img p-5">
                      <img src={sim?.avatar} alt={sim?.name} />
                    </div>
                  </Col>
                  <Col xs={12} xl={6}>
                    <div className="sim_info p-4">
                      <div className="simDetail_header">
                        <h4>{sim?.name}</h4>
                      </div>
                      <span className="total_data">
                        {sim?.size_data} tốc độ cao 4G
                      </span>
                      <div className="sim_info_content">
                        <div className="price mb-3">
                          {sim?.discount && sim?.discount > 0 ? (
                            <>
                              <div className="price_item txt_center">
                                <div className="price_header">
                                  <p className="m-0">Giá gốc</p>
                                </div>

                                <span>{formatMoney(sim?.price)}</span>
                                <s id="price_discount">
                                  {formatMoney(
                                    (
                                      (sim.discount * Number(sim?.price)) /
                                      100
                                    ).toString()
                                  )}
                                </s>
                              </div>
                              <div className="price_item txt_center ">
                                <div className="price_header bg_gray">
                                  <p className="m-0">Khuyến mãi</p>
                                </div>
                                <span>
                                  {formatMoney(
                                    (
                                      Number(sim?.price) -
                                      (Number(sim?.price) * sim.discount) / 100
                                    ).toString()
                                  )}
                                </span>
                              </div>
                            </>
                          ) : (
                            sim?.price && (
                              <>
                                <div className="price_item txt_center">
                                  <div className="price_header">
                                    <p className="m-0">Giá Gốc</p>
                                  </div>

                                  <span>
                                    {formatMoney(
                                      (
                                        Number(sim.price) -
                                        (sim.discount * Number(sim?.price)) /
                                          100
                                      ).toString()
                                    )}
                                  </span>
                                </div>
                                <div className="price_item txt_center ">
                                  <div className="price_header bg_gray">
                                    <p className="m-0">Giảm giá</p>
                                  </div>
                                  <s>
                                    {formatMoney(
                                      (
                                        (sim.discount * Number(sim?.price)) /
                                        100
                                      ).toString()
                                    )}
                                  </s>
                                </div>
                              </>
                            )
                          )}
                        </div>
                        <ul className="sim_item">
                          <li>
                            <span className="material-symbols-outlined">
                              check
                            </span>
                            <span>{sim?.size_data} Data Tốc độ cao.</span>
                          </li>
                          <li>
                            <span className="material-symbols-outlined">
                              check
                            </span>
                            <span>Không giới hạn 3G.</span>
                          </li>
                          <li>
                            <span className="material-symbols-outlined">
                              check
                            </span>
                            <span>{sim?.expiry} ngày sử dụng.</span>
                          </li>
                          <li>
                            <span className="material-symbols-outlined">
                              check
                            </span>
                            <span>Tự động kích hoạt. Không cần đăng ký.</span>
                          </li>
                        </ul>

                        <div className="inventory">
                          <div className="inventory_item">
                            <div className="inventory_header">
                              <p className="m-0">Còn hàng</p>
                            </div>
                            <p className="inventory_number">{sim?.inventory}</p>
                          </div>
                          <div className="inventory_item">
                            <div className="inventory_header">
                              <p className="m-0">Đã bán</p>
                            </div>
                            <p className="inventory_number">{sim?.selled}</p>
                          </div>
                          <div className="inventory_item">
                            <div className="inventory_header">
                              <p className="m-0">Đặt hàng</p>
                            </div>
                            <p className="inventory_number">{sim?.order}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditSim;
