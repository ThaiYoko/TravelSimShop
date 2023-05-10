import { interFade_Sim } from "../../sp/interfade";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { formatMoney } from "../../sp/format";
import { useAppDispatch } from "../../sp/hooks";
import { Choose_Sim_Success } from "../../sp/redux/slice/data";
import { Link } from "react-router-dom";
import "./style.scss";

interface Card_Sim {
  sim: interFade_Sim;
}
const CardSim = ({ sim }: Card_Sim) => {
  const dispatch = useAppDispatch();
  const handle_choose_sim = () => {
    const newSim = {
      sim: sim,
      count: 1,
    };
    dispatch(Choose_Sim_Success(newSim));
  };
  return (
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
        <Button variant="primary">
          <span className="material-symbols-outlined">favorite</span>
          <div className="tip">Add list</div>
        </Button>
        <Button variant="primary" onClick={() => handle_choose_sim()}>
          <span className="material-symbols-outlined">add_shopping_cart</span>
          <div className="tip">Add store</div>
        </Button>
        <Button variant="primary">
          <span className="material-symbols-outlined">
            shopping_cart_checkout
          </span>
          <div className="tip">Buy now</div>
        </Button>
      </div>
    </Card>
  );
};

export default CardSim;
