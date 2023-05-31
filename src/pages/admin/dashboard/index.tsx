import React, { useState, useEffect } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import DBSystems from "../../../components/dashboard/db_system";
import DBOrders from "../../../components/dashboard/db_order";
import DBCategorys from "../../../components/dashboard/db_categorys";
import DBProductions from "../../../components/dashboard/db_productions";
import DBSims from "../../../components/dashboard/db_sims";
import { useAppDispatch } from "../../../sp/hooks";
import { useSelector } from "react-redux";
import {
  AdminSelector,
  Load_Data_Admin_Success,
  Sign_Out_Success,
} from "../../../sp/redux/slice/admin";
import { admin_data_api } from "../../../sp/api/admin/data";
import { Badge } from "react-bootstrap";
import { interFade_Order, interFade_User } from "../../../sp/interfade";
import { authen_api } from "../../../sp/api/admin/authen";
import ErrorLogin from "../../../components/errorLogin";
import { DataPublicSelector } from "../../../sp/redux/slice/data";
import DBProfile from "../../../components/dashboard/db_profile";
import { useViewport } from "../../../sp/viewport";

const AdminDashboard = () => {
  //Data
  const Admin = useSelector(AdminSelector.User);
  const Logos = useSelector(DataPublicSelector.Logos);
  const dark_logo = Logos?.find((item) => item.id === 2);
  const dispatch = useAppDispatch();
  const accesstoken = useSelector(AdminSelector.accestoken);
  //Load data admin
  useEffect(() => {
    const load_data_admin = async () => {
      await admin_data_api.load_data(
        dispatch,
        Load_Data_Admin_Success,
        accesstoken
      );
    };
    load_data_admin();
  }, []);
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
      case "Profile":
        return <DBProfile />;
      default:
        return <DBSystems />;
    }
  };

  //Data
  const Orders = useSelector(AdminSelector.Orders);
  const [show_bade, set_show_bade] = useState(true);
  const [order_render, set_order_render] = useState<interFade_Order[]>([]);
  useEffect(() => {
    const list = Orders?.filter((item) => item.status === "pending");
    set_order_render(list);
  }, [Orders]);
  const onchange_order = () => {
    setMenu("Orders");
    set_show_bade(false);
  };

  //Logout
  const navigate = useNavigate();
  const handle_sign_out = async () => {
    await authen_api.Logout(navigate, dispatch, Sign_Out_Success);
  };

  //Thu nhỏ menu
  const [show_menu, set_show_menu] = useState(true);
  const viewport = useViewport();
  useEffect(() => {
    const menu = window.document.getElementById("dashboard");
    if (menu && viewport.width < 1200) {
      set_show_menu(false);
    } else if (menu && viewport.width > 1200) {
      set_show_menu(true);
    }
  }, [viewport.width]);
  if (accesstoken && Admin !== ({} as interFade_User)) {
    return (
      <div id="dashboard" className={show_menu ? "" : "mini_menu"}>
        <div className="db_content">
          <div className="db_left">
            <div className="db_menu">
              <div className="menu_header">
                <img
                  src={dark_logo?.url}
                  alt={dark_logo?.name}
                  onClick={() => navigate("/")}
                />
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
                    <span className="material-symbols-outlined">dns</span>
                  </div>
                </div>

                {/* Categorys */}
                <div
                  onClick={() => setMenu("Categorys")}
                  className={
                    menu === "Categorys" ? "menu_item active" : "menu_item"
                  }
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
                      flex_no_wrap
                    </span>
                  </div>
                </div>

                {/* Sims */}
                <div
                  onClick={() => setMenu("Sims")}
                  className={menu === "Sims" ? "menu_item active" : "menu_item"}
                >
                  <div className="item_left">Sims</div>
                  <div className="item_right">
                    <span className="material-symbols-outlined">sim_card</span>
                  </div>
                </div>

                {/* Orders */}
                <div
                  onClick={() => onchange_order()}
                  className={
                    menu === "Orders" ? "menu_item active" : "menu_item"
                  }
                >
                  <div className="item_left">
                    Orders{" "}
                    {show_bade && order_render?.length > 0 && (
                      <Badge bg="danger">{order_render?.length}</Badge>
                    )}
                  </div>
                  <div className="item_right">
                    <span className="material-symbols-outlined">inventory</span>
                  </div>
                </div>

                {/* Profile */}
                <div
                  onClick={() => setMenu("Profile")}
                  className={
                    menu === "Profile" ? "menu_item active" : "menu_item"
                  }
                >
                  <div className="item_left">Profile</div>
                  <div className="item_right">
                    <span className="material-symbols-outlined">
                      manage_accounts
                    </span>
                  </div>
                </div>

                {/* Sign Out */}
                <div className="menu_item" onClick={() => handle_sign_out()}>
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
                <div className="user me-3">
                  <i className="fa fa-user me-2"></i>
                  <span>{Admin?.username?.toUpperCase()}</span>
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
  } else {
    return <ErrorLogin />;
  }
};

export default AdminDashboard;
