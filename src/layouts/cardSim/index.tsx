import { interFade_Sim } from "../../sp/interfade";
import { Card, Button } from "react-bootstrap";
import { formatMoney } from "../../sp/format";
import { useAppDispatch } from "../../sp/hooks";
import { Choose_Sim_Success } from "../../sp/redux/slice/data";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handle_buy_now = () => {
    handle_choose_sim();
    navigate("/gio-hang");
  };
  return (
    <Card className="mb-4 me-2 ms-2">
      <Card.Img
        style={{ cursor: "pointer" }}
        variant="top"
        src={sim.Production?.avatar}
        onClick={() => navigate(`/sim/chi-tiet-sim/${sim?.url}`)}
      />
      <Card.Body>
        <Card.Title onClick={() => navigate(`/sim/chi-tiet-sim/${sim?.url}`)}>
          {sim.name}
        </Card.Title>
        <Card.Text>
          <ul className="txt_left card_info">
            <li>Tổng {sim?.expiry} Ngày</li>
            <li>
              {sim.total_data === 0
                ? "Không giới hạn 4G tốc độ cao."
                : sim?.total_data % sim?.expiry === 0
                ? `${sim?.total_data / sim?.expiry}GB tốc độ cao mỗi ngày.`
                : `${sim?.total_data}GB dung lượng cao.`}
            </li>
            <li>{sim?.limit}</li>
            <li>
              {!sim?.active
                ? "Tự động kích hoạt không cần đăng ký."
                : "Cần kích hoạt sim."}
            </li>
          </ul>
          <div className="price">
            <Link to={`/sim/chi-tiet-sim/${sim?.url}`} className="price_link">
              {Number(sim?.discount) > 0 ? (
                <>
                  <s>{formatMoney(sim?.price)}</s>
                  <span>
                    {formatMoney(
                      (Number(sim?.price) - Number(sim.discount)).toString()
                    )}
                  </span>
                </>
              ) : (
                <span>{formatMoney(sim?.price)}</span>
              )}
            </Link>
          </div>
        </Card.Text>
      </Card.Body>
      <div className="card_btn">
        <Button variant="primary" onClick={() => handle_choose_sim()}>
          <span className="material-symbols-outlined">add_shopping_cart</span>
          <div className="tip">Add store</div>
        </Button>
        <Button variant="primary" onClick={() => handle_buy_now()}>
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
