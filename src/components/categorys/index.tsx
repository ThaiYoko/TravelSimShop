import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../sp/redux/slice/data";
import { Col, Row } from "react-bootstrap";
import CardSim from "../../layouts/cardSim";
import "./style.scss";
import SimPagination from "../../layouts/pagination";
import { interFade_Sim } from "../../sp/interfade";

interface CategorySim {
  cate?: string;
}
const CategorySim = ({ cate }: CategorySim) => {
  const Categorys = useSelector(DataPublicSelector.Categorys);

  const Sims = useSelector(DataPublicSelector.Sims);
  const [listSimRender, setListSimRender] = useState<interFade_Sim[]>([]);

  const [page, setPage] = useState(1);
  const limit = 12;
  useEffect(() => {
    const CateRender = Categorys.find((item) => item.url === cate);
    const list = Sims.filter(
      (item: any) => item.Production.Category.name === CateRender?.name
    );
    const array = list.slice((page - 1) * limit, limit);
    setListSimRender(array);
  }, [Sims, cate, page]);
  return (
    <div id="categorys_sim">
      <Row>
        {listSimRender?.map((item, index) => {
          return (
            <Col sm={12} md={6} xl={4} xxl={3} key={index} className="mb-4">
              <CardSim sim={item} />
            </Col>
          );
        })}
        <SimPagination
          page={page}
          setPage={setPage}
          limit={limit}
          lenght={Sims.length}
        />
      </Row>
    </div>
  );
};

export default CategorySim;
