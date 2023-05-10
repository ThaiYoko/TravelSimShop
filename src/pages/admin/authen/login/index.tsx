import React from "react";
import "./style.scss";
import { Button, Form } from "react-bootstrap";
import logo from "../../../../access/logo/light.png";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const handle_login = () => {
    navigate("/dashboard", { replace: true });
  };
  return (
    <div id="admin_login">
      <div className="login_content bsd bdr-7 p-5">
        <div className="login_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="login_input">
          <Form.Group className="mb-3">
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control type="text" placeholder="Tên đăng nhập" />
            <Form.Text className="text-muted">
              Tên đăng nhập không được để trống.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control type="text" placeholder="Mật khẩu" />
            <Form.Text className="text-muted">
              Mật khẩu không được để trống.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Key Admin</Form.Label>
            <Form.Control type="text" placeholder="Key Admin" />
            <Form.Text className="text-muted">
              Key Admin không được để trống.
            </Form.Text>
          </Form.Group>
          <div className="login_btn txt_right">
            <Button onClick={handle_login}>Đăng nhập</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
