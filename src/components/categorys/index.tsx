import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../sp/redux/slice/data";
import { Col, Row } from "react-bootstrap";
import CardSim from "../../layouts/cardSim";
import "./style.scss";
import SimPagination from "../../layouts/pagination";
import { interFade_Category, interFade_Sim } from "../../sp/interfade";

interface CategorySim {
  product?: string;
  cate: interFade_Category;
}
const CategorySim = ({ product, cate }: CategorySim) => {
  //Data
  const Categorys = useSelector(DataPublicSelector.Categorys);
  const Productions = useSelector(DataPublicSelector.Productions);
  const Sims = useSelector(DataPublicSelector.Sims);

  const [listSimRender, setListSimRender] = useState<interFade_Sim[]>([]);

  const [page, setPage] = useState(1);
  const [lenght, setLength] = useState(0);
  const limit = 6;
  useEffect(() => {
    const ofset = (page - 1) * limit;
    //B1 nếu có prd => set sim = list filter theo prd
    if (product) {
      const prdOnline = Productions?.find((item) => item.url === product);
      const List = Sims?.filter((item) => item.Production.id === prdOnline?.id); //List sim filter theo Prd
      setLength(List.length);
      const array = List.splice(ofset, limit + ofset); //List sim filter theo page
      setListSimRender(array);
    } else {
      //B2: Nếu k có prd => set list sim = list filter theo cate
      const list = Sims.filter((item) => item.Production.idCate === cate.id);
      setLength(list.length);
      const array_sim = list.splice(ofset, ofset + limit);
      setListSimRender(array_sim);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [product, page, cate]);

  useEffect(() => {
    const prdOnline = Productions?.find((item) => item.url === product);
    const cate = Categorys?.find((item) => item.id === prdOnline?.idCate);
    if (cate) {
      window.document.title = cate?.name;
    }
  }, [product]);
  return (
    <div id="categorys_sim">
      <Row>
        {listSimRender.length > 0 ? (
          listSimRender?.map((item, index) => {
            return (
              <Col sm={12} md={6} xl={6} xxl={4} key={index} className="mb-4">
                <CardSim sim={item} />
              </Col>
            );
          })
        ) : (
          <h1 className="text-danger txt_bold">Không tìm thấy sản phẩm.</h1>
        )}
        <SimPagination
          page={page}
          setPage={setPage}
          limit={limit}
          lenght={lenght}
        />
      </Row>
    </div>
  );
};

export default CategorySim;
