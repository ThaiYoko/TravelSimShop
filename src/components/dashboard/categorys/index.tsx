import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import "./style.scss";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../../sp/redux/slice/data";

const DBCategorys = () => {
  const Categorys = useSelector(DataPublicSelector.Categorys);
  const [edit, setEdit] = useState("");
  return (
    <div id="db_category" className="bsd">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Categorys?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{`/${item.url}`}</td>
                <td className="table_btn">
                  <Button
                    className="btn_edit"
                    onClick={() => setEdit(item.id.toString())}
                  >
                    <span className="material-symbols-outlined">settings</span>
                  </Button>
                  <Button className="btn_remove">
                    <span className="material-symbols-outlined">remove</span>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default DBCategorys;
