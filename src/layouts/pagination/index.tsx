import React, { useEffect, useState } from "react";
import "./style.scss";
import { Button, ButtonGroup } from "react-bootstrap";

interface interFade_SimPagination {
  limit: number;
  lenght: number;
  page: number;
  setPage: any;
}
const SimPagination = ({
  limit,
  lenght,
  page,
  setPage,
}: interFade_SimPagination) => {
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    if (lenght % limit === 0) {
      setTotalPage(lenght / limit);
    } else {
      var total = Math.floor(lenght / limit + 1);
      setTotalPage(total);
    }
  }, [lenght, limit]);

  const handleNext = () => {
    if (page * limit < lenght) {
      setPage((prev: number) => prev + 1);
    } else {
      return;
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev: number) => prev - 1);
    } else {
      return;
    }
  };
  const handleLastPage = () => {
    setPage(totalPage);
  };
  if (totalPage > 1) {
    return (
      <div id="pagination">
        <ButtonGroup>
          <Button onClick={() => setPage(1)} className="btn_page_min">
            <i className="fa fa-angle-double-left"></i>
          </Button>
          <Button onClick={handlePrev} className="btn_prev">
            <i className="fa fa-angle-left"></i>
          </Button>
          <Button className="num_page">{page}</Button>
          <Button onClick={handleNext} className="btn_next">
            <i className="fa fa-angle-right"></i>
          </Button>
          <Button onClick={handleLastPage} className="btn_page_max">
            <i className="fa fa-angle-double-right"></i>
          </Button>
        </ButtonGroup>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default SimPagination;
