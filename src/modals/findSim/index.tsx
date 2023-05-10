import React from "react";
import { Button, Modal } from "react-bootstrap";

interface ModalFindSim {
  name: string;
  show: boolean;
  setShow: any;
  setName: any;
}
const ModalFindSim = ({ name, show, setShow, setName }: ModalFindSim) => {
  const onHide = () => {
    setShow(false);
    setName("");
  };
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{name}</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalFindSim;
