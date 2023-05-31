import React, { useState, useEffect } from "react";
import "./style.scss";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authen_api } from "../../../../sp/api/admin/authen";
import { useAppDispatch } from "../../../../sp/hooks";
import {
  AdminSelector,
  Sign_In_Admin_Success,
} from "../../../../sp/redux/slice/admin";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../../../sp/redux/slice/data";

const AdminLogin = () => {
  //Data
  const Logos = useSelector(DataPublicSelector.Logos);
  const light_logo = Logos?.find((item) => item.id === 1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [key_admin, setKey_admin] = useState("");
  const handle_login = async () => {
    await authen_api.Login(
      username,
      password,
      key_admin,
      navigate,
      dispatch,
      Sign_In_Admin_Success
    );
  };
  const accesstoken = useSelector(AdminSelector.accestoken);
  useEffect(() => {
    if (accesstoken) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [accesstoken]);
  return (
    <div id="admin_login">
      <div className="login_content bsd bdr-7">
        <div className="login_logo">
          <img src={light_logo?.url} alt={light_logo?.name} />
        </div>
        <div className="login_input">
          <Form.Group className="mb-3">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Text className="text-muted">
              Tên đăng nhập không được để trống.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted">
              Mật khẩu không được để trống.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Key Admin</Form.Label>
            <Form.Control
              type="password"
              placeholder="Key Admin"
              value={key_admin}
              onChange={(e) => setKey_admin(e.target.value)}
            />
            <Form.Text className="text-muted">
              Key Admin không được để trống.
            </Form.Text>
          </Form.Group>
          <div className="login_btn txt_right">
            <Button className="btn_login" onClick={handle_login}>
              Đăng nhập
            </Button>
            <Button
              className="ms-2 btn_register"
              onClick={() => navigate("/admin/register")}
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
