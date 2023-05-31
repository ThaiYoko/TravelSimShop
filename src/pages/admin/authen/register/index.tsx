import React, { useState } from "react";
import "./style.scss";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authen_api } from "../../../../sp/api/admin/authen";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../../../sp/redux/slice/data";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, set_email] = useState("");
  const [phone, set_phone] = useState("");
  const [key_admin, setKey_admin] = useState("");

  const handle_register_admin = async () => {
    await authen_api.Register(
      username,
      password,
      email,
      phone,
      key_admin,
      navigate
    );
  };
  const Logos = useSelector(DataPublicSelector.Logos);
  const light_logo = Logos?.find((item) => item.id === 1);
  return (
    <div id="admin_login">
      <div className="login_content bsd bdr-7 p-5">
        <div className="login_logo">
          <img src={light_logo?.url} alt="logo" />
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Địa chỉ email"
              value={email}
              onChange={(e) => set_email(e.target.value)}
            />
            <Form.Text className="text-muted">
              Email không được để trống.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Điện thoại"
              value={phone}
              onChange={(e) => set_phone(e.target.value)}
            />
            <Form.Text className="text-muted">
              Số điện thoại không được để trống.
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
            <Button variant="danger" onClick={() => navigate("/admin")}>
              Hủy
            </Button>
            <Button onClick={handle_register_admin}>Đăng ký</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
