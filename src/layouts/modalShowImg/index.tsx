import React from "react";
import { Button, Modal } from "react-bootstrap";
import { interFade_Order } from "../../sp/interfade";

interface interFade_ModalShowImg {
  order: interFade_Order;
  show: boolean;
  set_show: any;
}
const ModalShowImg = ({ order, show, set_show }: interFade_ModalShowImg) => {
  const handleClose = () => {
    set_show(false);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{order.code_bill}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="img_bill">
          <img
            src={order?.url_image}
            alt={order?.code_bill}
            className="d-block w-100 img-fluid"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalShowImg;
