import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";
import { interFade_Sim } from "../../../sp/interfade";
import { formatMoney } from "../../../sp/format";
import ModalEditSim from "./modalEdit";

interface Card_Sim {
  sim: interFade_Sim;
}
const DBCardSim = ({ sim }: Card_Sim) => {
  const [show, setShow] = useState(false);
  return (
    <div id="db_card_sim">
      <Card className="ms-2 me-2">
        <Card.Img variant="top" src={sim.avatar} />
        <Card.Body>
          <Card.Title>{sim.name}</Card.Title>
          <Card.Text>
            <ul className="txt_left">
              <li>Tổng {sim.expiry} Ngày</li>
              <li>Dung lượng {sim.size_data}/Ngày</li>
              <li>Phủ sóng {sim.limit}</li>
              <li>Tự động kích hoạt không cần đăng ký</li>
            </ul>
            <div className="price">
              <Link to={`/product/${sim.id}`} className="price_link">
                {sim.discount > 0 ? (
                  <>
                    <span>
                      {formatMoney(
                        (
                          Number(sim.price) -
                          (sim.discount * Number(sim.price)) / 100
                        ).toString()
                      )}
                    </span>
                    <s>
                      {formatMoney(
                        ((sim.discount * Number(sim.price)) / 100).toString()
                      )}
                    </s>
                  </>
                ) : (
                  <span>{formatMoney(sim.price)}</span>
                )}
              </Link>
            </div>
          </Card.Text>
        </Card.Body>
        <div className="card_btn">
          <Button variant="primary" onClick={() => setShow(true)}>
            <span className="material-symbols-outlined">settings</span>
            <div className="tip">Edit</div>
          </Button>
        </div>
      </Card>
      <ModalEditSim show={show} setShow={setShow} sim={sim} />
    </div>
  );
};

export default DBCardSim;
