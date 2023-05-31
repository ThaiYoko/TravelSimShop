import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import { AdminSelector } from "../../../sp/redux/slice/admin";

const Statistical = () => {
  //Data
  const Orders = useSelector(AdminSelector.Orders);
  const User_Count = useSelector(AdminSelector.User_Count);

  return (
    <div id="statistical" className="bsd p-4 mb-3">
      <div className="statistical_content">
        <div className="system_header">
          <h6>STATISTICAL</h6>
          <hr className="txt_white" />
        </div>
        <div className="web_info">
          <div className="info_item">
            <div className="icon">
              <span className="material-symbols-outlined">
                shopping_cart_checkout
              </span>
            </div>
            <h1>{Orders?.length}</h1>
          </div>

          <div className="info_item">
            <div className="icon">
              <span className="material-symbols-outlined">attach_money</span>
            </div>
            <h1>85M</h1>
          </div>

          <div className="info_item">
            <div className="icon">
              <span className="material-symbols-outlined">person</span>
            </div>
            <h1>
              {User_Count > 9 ? User_Count : `0${User_Count?.toString()}`}
            </h1>
          </div>

          <div className="info_item">
            <div className="icon">
              <span className="material-symbols-outlined">group</span>
            </div>
            <h1>85</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistical;
