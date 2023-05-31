import React, { useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  AdminSelector,
  Edit_User_Success,
} from "../../../sp/redux/slice/admin";
import "./style.scss";
import { authen_api } from "../../../sp/api/admin/authen";
import { useAppDispatch } from "../../../sp/hooks";

const DBProfile = () => {
  //Data
  const dispatch = useAppDispatch();
  const accesstoken = useSelector(AdminSelector.accestoken);
  const Admin = useSelector(AdminSelector.User);

  const [edit, set_edit] = useState(false);
  const [old_pass, set_old_pas] = useState("");
  const [new_pass, set_new_pass] = useState("");
  const [re_pass, set_re_pass] = useState("");

  const [email, set_Email] = useState("");
  const [phone, set_phone] = useState("");

  const handle_edit_user = async () => {
    await authen_api.Edit(
      dispatch,
      accesstoken,
      email,
      phone,
      Admin?.id,
      Edit_User_Success
    );
    set_Email("");
    set_phone("");
    set_edit(false);
  };

  const handle_change_password = async () => {
    await authen_api.ChangePassword(
      dispatch,
      accesstoken,
      old_pass,
      new_pass,
      Admin?.id
    );
    set_old_pas("");
    set_new_pass("");
    set_re_pass("");
  };
  return (
    <div id="db_profile">
      <div className="profile_content bsd p-4">
        <div className="profile_items mb-3">
          <ListGroup as="ul" className="w-50">
            <ListGroup.Item
              as="li"
              active
              className="d-flex justify-content-between align-items-center"
            >
              <div className="header_left">
                <h6>{Admin?.username.toUpperCase()}</h6>
              </div>
              <div className="header_right">
                {edit ? (
                  <>
                    <Button
                      onClick={() => set_edit(false)}
                      className="btn_auth"
                    >
                      Cancle
                    </Button>
                    <Button
                      onClick={() => handle_edit_user()}
                      className="btn_auth"
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      set_edit(true);
                      set_Email(Admin.email);
                      set_phone(Admin.phone);
                    }}
                    className="btn_auth"
                  >
                    Edit
                  </Button>
                )}
              </div>
            </ListGroup.Item>
            {edit ? (
              <>
                <ListGroup.Item as="li">
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => set_Email(e.target.value)}
                    />
                    {email === "" && (
                      <Form.Text className="text-danger">
                        Email không được để trống.
                      </Form.Text>
                    )}
                  </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      placeholder="Your phone"
                      value={phone}
                      onChange={(e) => set_phone(e.target.value)}
                    />
                    {phone === "" && (
                      <Form.Text className="text-danger">
                        Email không được để trống.
                      </Form.Text>
                    )}
                  </Form.Group>
                </ListGroup.Item>
              </>
            ) : (
              <>
                <ListGroup.Item as="li">
                  <span className="txt_bold me-2">Email</span>
                  <span>{Admin.email}</span>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  <span className="txt_bold me-2">Phone</span>
                  <span>{Admin.phone}</span>
                </ListGroup.Item>
              </>
            )}
          </ListGroup>
        </div>
        <div className="profile_items mb-3">
          <ListGroup as="ul" className="w-50">
            <ListGroup.Item as="li" active>
              <div className="header_left">
                <h6>CHANGE PASSWORD</h6>
              </div>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <Row>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Mật khẩu củ</Form.Label>
                    <Form.Control
                      autoFocus
                      type="password"
                      placeholder="Mật khẩu củ"
                      value={old_pass}
                      onChange={(e) => set_old_pas(e.target.value)}
                    />
                    {old_pass === "" && (
                      <Form.Text className="text-danger">
                        Mật khẩu củ không được để trống.
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Mật khẩu mới"
                      value={new_pass}
                      onChange={(e) => set_new_pass(e.target.value)}
                    />
                    {new_pass === "" && (
                      <Form.Text className="text-danger">
                        Mật khẩu mới không được để trống.
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Xác nhận mật khẩu mới"
                      value={re_pass}
                      onChange={(e) => set_re_pass(e.target.value)}
                    />
                    {re_pass === "" ? (
                      <Form.Text className="text-danger">
                        Repassword không được để trống.
                      </Form.Text>
                    ) : re_pass !== new_pass ? (
                      <Form.Text className="text-danger">
                        Repassword không khớp.
                      </Form.Text>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <div className="txt_right mt-3">
                    <Button
                      onClick={handle_change_password}
                      className="me-2"
                      variant="success"
                      disabled={
                        old_pass === "" ||
                        new_pass === "" ||
                        re_pass === "" ||
                        re_pass !== new_pass
                      }
                    >
                      Ok
                    </Button>
                    <Button
                      onClick={() => {
                        set_new_pass("");
                        set_old_pas("");
                        set_re_pass("");
                      }}
                      variant="danger"
                    >
                      Cancle
                    </Button>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default DBProfile;
