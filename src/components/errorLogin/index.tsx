import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const ErrorLogin = () => {
  const navigate = useNavigate();
  return (
    <div id="error_login" className="bg_ln">
      <div className="err_content bsd">
        <h1>HẾT PHIÊN ĐĂNG NHẬP</h1>
        <Button onClick={() => navigate("/admin", { replace: true })}>
          SIGN IN
        </Button>
      </div>
    </div>
  );
};

export default ErrorLogin;
