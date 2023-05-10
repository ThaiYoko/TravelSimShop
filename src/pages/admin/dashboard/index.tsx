import React, { useState } from "react";
import "./style.scss";
import logo from "../../../access/logo/dark.png";
import { Link } from "react-router-dom";
import DBSystems from "../../../components/dashboard/system";
import DBCategorys from "../../../components/dashboard/categorys";
import DBSims from "../../../components/dashboard/sims";
import DBOrders from "../../../components/dashboard/order";
import DBProductions from "../../../components/dashboard/productions";

const AdminDashboard = () => {
  const [menu, setMenu] = useState("Systems");

  const handle_render_views = () => {
    switch (menu) {
      case "Systems":
        return <DBSystems />;
      case "Categorys":
        return <DBCategorys />;
      case "Productions":
        return <DBProductions />;
      case "Sims":
        return <DBSims />;
      case "Orders":
        return <DBOrders />;
      default:
        return <DBSystems />;
    }
  };
  return (
    <div id="dashboard">
      <div className="db_content">
        <div className="db_left">
          <div className="db_menu">
            <div className="menu_header">
              <img src={logo} />
            </div>
            <div className="menu_content">
              {/* Systems */}
              <div
                onClick={() => setMenu("Systems")}
                className={
                  menu === "Systems" ? "menu_item active" : "menu_item"
                }
              >
                <div className="item_left">Systems</div>
                <div className="item_right">
                  <span className="material-symbols-outlined">web</span>
                </div>
              </div>

              {/* Categorys */}
              <div
                className={
                  menu === "Categorys" ? "menu_item active" : "menu_item"
                }
                onClick={() => setMenu("Categorys")}
              >
                <div className="item_left">Categorys</div>
                <div className="item_right">
                  <span className="material-symbols-outlined">category</span>
                </div>
              </div>

              {/* Productions */}
              <div
                onClick={() => setMenu("Productions")}
                className={
                  menu === "Productions" ? "menu_item active" : "menu_item"
                }
              >
                <div className="item_left">Productions</div>
                <div className="item_right">
                  <span className="material-symbols-outlined">
                    dynamic_form
                  </span>
                </div>
              </div>

              <div
                onClick={() => setMenu("Sims")}
                className={menu === "Sims" ? "menu_item active" : "menu_item"}
              >
                <div className="item_left">Sims</div>
                <div className="item_right">
                  <span className="material-symbols-outlined">sim_card</span>
                </div>
              </div>

              <div
                onClick={() => setMenu("Orders")}
                className={menu === "Orders" ? "menu_item active" : "menu_item"}
              >
                <div className="item_left">Orders</div>
                <div className="item_right">
                  <span className="material-symbols-outlined">list_alt</span>
                </div>
              </div>

              <div className="menu_item">
                <div className="item_left">Sign out</div>
                <div className="item_right">
                  <span className="material-symbols-outlined">logout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="db_right">
          <div className="right_header">
            <div className="header_left">
              <p>Dashboard / {menu}</p>
            </div>
            <div className="header_right">
              <div className="user">
                <span className="material-symbols-outlined">person</span>
                <span>Admin</span>
              </div>
              <Link to={"/"}>Back to home</Link>
            </div>
          </div>
          <div className="right_views">{handle_render_views()}</div>
        </div>
        <div className="db_bot"></div>
      </div>
    </div>
  );
};

export default AdminDashboard;
