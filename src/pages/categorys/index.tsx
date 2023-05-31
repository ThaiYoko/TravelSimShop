import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.scss";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../sp/redux/slice/data";

import { Accordion } from "react-bootstrap";
import { interFade_Category, interFade_Production } from "../../sp/interfade";
import SEO from "../../seo";
import CategorySim from "../../components/categorys";

const Categorys = () => {
  const { cate, product } = useParams();

  const Categorys = useSelector(DataPublicSelector.Categorys);
  const Productions = useSelector(DataPublicSelector.Productions);
  const [active, setActive] = useState("");
  const [CateOnline, setCateOnline] = useState<interFade_Category>();
  const [prd_online, set_prd_online] = useState<interFade_Production>(
    {} as interFade_Production
  );

  useEffect(() => {
    if (product) {
      const prd = Productions.find((item) => item.url === product);
      if (prd) set_prd_online(prd);
    }
  }, [product]);

  //Back to top when load page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [cate, product]);

  useEffect(() => {
    if (cate) {
      const cateOnline = Categorys?.find((item) => item?.url === cate);
      if (cateOnline) {
        setCateOnline(cateOnline);
        setActive(cateOnline?.id?.toString());
      }
    }
  }, [cate, product]);

  const handle_onchange_accordion = (cate: interFade_Category) => {
    if (Number(active) === cate.id) {
      setActive("");
    } else {
      setActive(cate?.id?.toString());
    }
  };

  return (
    <section id="categorys">
      <SEO
        title={`SIM DU LỊCH || ${CateOnline?.name.toUpperCase()}`}
        description={`Sim du lịch - ${CateOnline?.name} giá rẻ dung lượng cao`}
      />
      <div className="w-80">
        <div className="cate_header">
          <p>
            Trang chủ / {CateOnline?.name} / {prd_online.name}
          </p>
        </div>
        <div className="cate_content">
          <Accordion activeKey={(Number(active) - 1).toString()}>
            {Categorys?.map((item, index) => {
              return (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header
                    onClick={() => handle_onchange_accordion(item)}
                  >
                    {item.name}
                  </Accordion.Header>
                  {item?.Productions?.map((prd, index2) => {
                    return (
                      <Accordion.Body
                        key={index2}
                        className={product === prd?.url ? "active" : ""}
                      >
                        <Link to={`/sim/${item?.url}/${prd?.url}`}>
                          {prd?.name}
                        </Link>
                      </Accordion.Body>
                    );
                  })}
                </Accordion.Item>
              );
            })}
          </Accordion>

          <div className="cate_render bsd p-3">
            <div className="cate_render_content">
              {CateOnline && (
                <CategorySim product={product} cate={CateOnline} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categorys;
