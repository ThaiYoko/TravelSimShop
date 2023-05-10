import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../../sp/redux/slice/data";
import "./style.scss";
import { interFade_Production, interFade_Sim } from "../../../sp/interfade";

import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import SimPagination from "../../../layouts/pagination";
import DBCardSim from "../DbCardSim";

const DBSims = () => {
  //Data
  const Categorys = useSelector(DataPublicSelector.Categorys);
  const Productions = useSelector(DataPublicSelector.Productions);
  const Sims = useSelector(DataPublicSelector.Sims);

  //Aray sim cần render
  const [ListSim, setListSim] = useState<interFade_Sim[]>([]);

  //List Product cần render ra filter
  const [ListProductionRender, setListProductionRender] = useState<
    interFade_Production[]
  >([]);

  const [cateChoose, setcateChoose] = useState("All");
  //Product
  const [prdChoose, setprdChoose] = useState("All");

  useEffect(() => {
    if (cateChoose === "All") {
      setListSim(Sims);
    } else {
      const cate = Categorys.find((item) => item.name === cateChoose);
      const listPrd = Productions.filter((item) => item.idCate === cate?.id);
      setListProductionRender(listPrd);
      if (prdChoose === "All") {
        const list = Sims.filter((item) => item.Production.idCate === cate?.id);
        setListSim(list);
      } else {
        const prd = Productions.find((item) => item.name === prdChoose);
        const list = Sims.filter((item) => item.idProduct === prd?.id);
        setListSim(list);
      }
    }
  }, [cateChoose, prdChoose, Sims, Categorys, Productions]);

  //Fillter by name
  const [name, setName] = useState("");
  useEffect(() => {
    if (name !== "") {
      const list = Sims.filter((item) =>
        item.name.toLocaleLowerCase().includes(name)
      );
      setListSim(list);
    } else {
      setListSim(Sims);
    }
  }, [name]);

  const [page, setPage] = useState(1);
  return (
    <div id="db_sim">
      <div className="db_sim_content">
        <div className="sim_filter">
          <div className="find">
            <ul className="filter_by_cate">
              <li
                className={cateChoose === "All" ? "active" : ""}
                onClick={() => setcateChoose("All")}
              >
                All
              </li>
              {Categorys?.map((cate, index) => {
                return (
                  <li
                    className={cateChoose === cate.name ? "active" : ""}
                    key={index}
                    onClick={() => {
                      setcateChoose(cate.name);
                      setprdChoose("All");
                    }}
                  >
                    {cate.name}
                  </li>
                );
              })}
            </ul>
            <InputGroup>
              <Form.Control
                placeholder="Sim"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button>
                <span className="material-symbols-outlined">search</span>
              </Button>
            </InputGroup>
          </div>

          <hr />
          {cateChoose !== "All" && (
            <>
              <ul className="filter_by_product">
                <li
                  onClick={() => setprdChoose("All")}
                  className={prdChoose === "All" ? "active" : ""}
                >
                  All
                </li>
                {ListProductionRender?.map((item, index) => {
                  return (
                    <li
                      onClick={() => setprdChoose(item.name)}
                      key={index}
                      className={prdChoose === item.name ? "active" : ""}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
              <hr />
            </>
          )}
        </div>
        <div className="sim_views">
          <Row>
            {ListSim?.map((item, index) => {
              return (
                <Col className="mb-3" key={index} xs={3}>
                  <DBCardSim sim={item} />
                </Col>
              );
            })}
          </Row>

          <SimPagination
            page={page}
            setPage={setPage}
            limit={15}
            lenght={ListSim.length}
          />
        </div>
      </div>
    </div>
  );
};

export default DBSims;
