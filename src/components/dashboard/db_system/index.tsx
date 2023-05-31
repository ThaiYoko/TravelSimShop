import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  DataPublicSelector,
  Reload_Banners_Success,
  Reload_Logo_Success,
  Reload_TravelSimShopContact_Success,
} from "../../../sp/redux/slice/data";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import "./style.scss";
import {
  banner_admin_api,
  contact_admin_api,
} from "../../../sp/api/admin/manager";
import {
  interFade_Banner,
  interFade_Logo,
  interFade_TravelSimShop_Contact,
} from "../../../sp/interfade";
import { data_api } from "../../../sp/api/data";
import { useAppDispatch } from "../../../sp/hooks";
import { AdminSelector } from "../../../sp/redux/slice/admin";
import Statistical from "../../../layouts/dashboard/statistical";
import { admin_contact_api } from "../../../sp/api/admin/contact";

const DBSystems = () => {
  const dispatch = useAppDispatch();
  const accesstoken = useSelector(AdminSelector.accestoken);
  //Data
  const Banners = useSelector(DataPublicSelector.Banners);
  const TravelSimShopContact = useSelector(
    DataPublicSelector.TravelSimShopContact
  );
  const Logos = useSelector(DataPublicSelector.Logos);

  //Add
  const [add_banner, set_add_banner] = useState(false);
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState("");
  const [preview_new_image, set_preview_new_image] = useState("");
  //Edit_image
  const onchangeImg = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  //Add_image
  const onchange_new_banner = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      set_preview_new_image(URL.createObjectURL(e.target.files[0]));
    }
  };
  //Edit
  const [edit_banner, set_edit_banner] = useState("");

  //Handle Banner
  const handle_add_banner = async () => {
    await banner_admin_api.Add(photo, dispatch, accesstoken);
    await data_api.reload_data("banners", dispatch, Reload_Banners_Success);
    setPhoto("");
    set_preview_new_image("");
    set_add_banner(false);
  };
  const handle_delete_banner = async (banner: interFade_Banner) => {
    if (window.confirm("Bạn có chắc muốn xóa banner?")) {
      await banner_admin_api.Delete(banner, accesstoken, dispatch);
      await data_api.reload_data("banners", dispatch, Reload_Banners_Success);
    } else {
      return;
    }
  };
  const handle_edit_banner = async (banner: interFade_Banner) => {
    await banner_admin_api.Edit(photo, banner, accesstoken, dispatch);
    setPhoto("");
    setPreview("");
    set_edit_banner("");
    await data_api.reload_data("banners", dispatch, Reload_Banners_Success);
  };

  //Edit_Contact
  const [edit_contact, set_edit_contact] = useState(false);
  const [name, set_name] = useState("");
  const [website, set_web_site] = useState("");
  const [serevices, set_serevices] = useState({
    sr_1: "",
    sr_2: "",
    sr_3: "",
  });
  const [email, set_email] = useState("");
  const [phone, set_phone] = useState("");
  const [facebook, set_facebook] = useState("");
  const [zalo, set_zalo] = useState("");
  const [adress, set_adress] = useState("");

  const onClick_edit_contact = () => {
    set_name(TravelSimShopContact?.name);
    set_web_site(TravelSimShopContact?.website);
    set_serevices({
      sr_1: TravelSimShopContact?.serevices.split("||")[0],
      sr_2: TravelSimShopContact?.serevices.split("||")[1],
      sr_3: TravelSimShopContact?.serevices.split("||")[2],
    });
    set_email(TravelSimShopContact?.email);
    set_phone(TravelSimShopContact?.phone);
    set_facebook(TravelSimShopContact?.facebook);
    set_zalo(TravelSimShopContact?.zalo);
    set_adress(TravelSimShopContact?.adress);
    set_edit_contact(true);
  };
  const onClick_cancle_edit_contact = () => {
    set_name("");
    set_web_site("");
    set_serevices({ sr_1: "", sr_2: "", sr_3: "" });
    set_email("");
    set_phone("");
    set_facebook("");
    set_zalo("");
    set_adress("");
    set_edit_contact(false);
  };

  const handle_edit_travelsimshop_contact = async () => {
    let data = {
      name: name,
      website: website,
      email: email,
      phone: phone,
      facebook: facebook,
      zalo: zalo,
      adress: adress,
      serevices: serevices.sr_1 + "||" + serevices.sr_2 + "||" + serevices.sr_3,
    } as interFade_TravelSimShop_Contact;

    await admin_contact_api.Edit(dispatch, accesstoken, data);
    await data_api.reload_data(
      "contact",
      dispatch,
      Reload_TravelSimShopContact_Success
    );
    onClick_cancle_edit_contact();
  };
  //Edit_Logos
  const [edit_logo, set_edit_logo] = useState("");
  const [name_logo, set_name_logo] = useState("");

  const handle_edit_logo = async (logo: interFade_Logo) => {
    await contact_admin_api.Edit_Logo(
      dispatch,
      accesstoken,
      logo.id,
      photo,
      name_logo
    );
    handle_cancle_edit_logo();
    await data_api.reload_data("logos", dispatch, Reload_Logo_Success);
  };
  const handle_cancle_edit_logo = () => {
    setPhoto("");
    setPreview("");
    set_name_logo("");
    set_edit_logo("");
  };

  return (
    <div id="db_system">
      <Statistical />
      <div className="travel_contact bsd p-4 mb-3">
        <div className="system_header">
          <h6>CONTACT</h6>
        </div>
        <hr className="txt_white" />
        <div className="contact_content">
          <div className="contact_items">
            {edit_contact ? (
              <div className="contact_item">
                <div className="contact_info">
                  <div className="contac_header">
                    <div className="input_gr mb-2">
                      <label className="d-block mb-1" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        className="w-100"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => set_name(e.target.value)}
                        autoFocus
                      />
                    </div>

                    <div className="input_gr mb-2">
                      <label className="d-block mb-1" htmlFor="website">
                        Website
                      </label>
                      <input
                        id="website"
                        className="w-100"
                        placeholder="Name"
                        value={website}
                        onChange={(e) => set_web_site(e.target.value)}
                      />
                    </div>
                  </div>

                  <hr className="txt_white" />

                  <ul className="contact_sub">
                    <li>
                      <input
                        className="w-100 mb-2"
                        placeholder="Serevice 1"
                        value={serevices.sr_1}
                        onChange={(e) =>
                          set_serevices((prv) => ({
                            ...prv,
                            sr_1: e.target.value,
                          }))
                        }
                      />
                    </li>
                    <li>
                      <input
                        className="w-100 mb-2"
                        placeholder="Serevice 2"
                        value={serevices.sr_2}
                        onChange={(e) =>
                          set_serevices((prv) => ({
                            ...prv,
                            sr_2: e.target.value,
                          }))
                        }
                      />
                    </li>
                    <li>
                      <input
                        className="w-100 mb-2"
                        placeholder="Serevice 3"
                        value={serevices.sr_3}
                        onChange={(e) =>
                          set_serevices((prv) => ({
                            ...prv,
                            sr_3: e.target.value,
                          }))
                        }
                      />
                    </li>
                  </ul>

                  <hr className="txt_white" />

                  <div className="contact_txt">
                    <div className="txt_item">
                      <span className="me-2 txt_bold">Email</span>
                      <input
                        type="email"
                        placeholder="abc@gmail.com"
                        value={email}
                        onChange={(e) => set_email(e.target.value)}
                      />
                    </div>
                    <div className="txt_item">
                      <span className="me-2 txt_bold">Phone</span>
                      <input
                        type="tel"
                        placeholder="09xxxxxxx"
                        value={phone}
                        onChange={(e) => set_phone(e.target.value)}
                      />
                    </div>

                    <div className="txt_item">
                      <span className="me-2 txt_bold">Facebook</span>
                      <input
                        placeholder="Link Facebook"
                        value={facebook}
                        onChange={(e) => set_facebook(e.target.value)}
                      />
                    </div>
                    <div className="txt_item">
                      <span className="me-2 txt_bold">Zalo</span>
                      <input
                        type="tel"
                        placeholder="Zalo"
                        value={zalo}
                        onChange={(e) => set_zalo(e.target.value)}
                      />
                    </div>
                    <div className="txt_item">
                      <span className="me-2 txt_bold">Adress</span>
                      <input
                        placeholder="Địa chỉ"
                        value={adress}
                        onChange={(e) => set_adress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="btn_contact">
                    <Button
                      className="btn_success"
                      onClick={handle_edit_travelsimshop_contact}
                    >
                      <i className="fa fa-check"></i>
                    </Button>
                    <Button
                      className="btn_cancle"
                      onClick={() => onClick_cancle_edit_contact()}
                    >
                      <i className="fa fa-times"></i>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="contact_item">
                <div className="contact_info">
                  <div className="contac_header">
                    <h6>{TravelSimShopContact?.name}</h6>
                    <span>{TravelSimShopContact?.website}</span>
                  </div>

                  <hr className="txt_white" />

                  <ul className="contact_sub">
                    {TravelSimShopContact?.serevices
                      .split("||")
                      ?.map((item, index) => {
                        return (
                          <li key={index}>
                            <span className="material-symbols-outlined">
                              radio_button_checked
                            </span>
                            {item}
                          </li>
                        );
                      })}
                  </ul>

                  <hr className="txt_white" />

                  <div className="contact_txt">
                    <div className="txt_item">
                      <span className="me-2 txt_bold">Email</span>
                      <span className="txt_white">
                        {TravelSimShopContact?.email}
                      </span>
                    </div>
                    <div className="txt_item">
                      <span className="me-2 txt_bold">Phone</span>
                      <span className="txt_white">
                        {TravelSimShopContact?.phone}
                      </span>
                    </div>

                    <div className="txt_item">
                      <span className="me-2 txt_bold">Facebook</span>
                      <span className="txt_white">
                        {TravelSimShopContact?.facebook}
                      </span>
                    </div>
                    <div className="txt_item">
                      <span className="me-2 txt_bold">Zalo</span>
                      <span className="txt_white">
                        {TravelSimShopContact?.zalo}
                      </span>
                    </div>
                    <div className="txt_item">
                      <span className="me-2 txt_bold">Adress</span>
                      <span className="txt_white">
                        {TravelSimShopContact?.adress}
                      </span>
                    </div>
                  </div>
                  <div className="btn_contact">
                    <Button onClick={() => onClick_edit_contact()}>
                      <i className="fa fa-cogs"></i>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {Logos?.map((item, index) => {
              return (
                <div key={index} className="contact_item logo_item">
                  <div className="contact_info">
                    <div className="contac_header">
                      {edit_logo === item.filename ? (
                        <div className="input_gr">
                          <label className="d-block mb-1" htmlFor="logo_name">
                            Name
                          </label>
                          <input
                            id="logo_name"
                            placeholder="Name logo"
                            onChange={(e) => set_name_logo(e.target.value)}
                            value={name_logo}
                            autoFocus
                          />
                        </div>
                      ) : (
                        <h6>{item.name}</h6>
                      )}
                    </div>
                    <hr />
                    <div className="contact_txt">
                      <div className="txt_item">
                        <span className="me-2 txt_bold">Filename</span>
                        <span>{item.filename}</span>
                      </div>
                      <div className="txt_item">
                        <span className="me-2 txt_bold">URL</span>
                        <span>{item.url}</span>
                      </div>
                    </div>
                    <div className="contact_img">
                      {preview !== "" && edit_logo === item.filename ? (
                        <img
                          src={preview}
                          className="img-fluid w-100 d-block"
                          alt={item.name}
                        />
                      ) : (
                        <img
                          src={item.url}
                          className="img-fluid w-100 d-block"
                          alt={item.name}
                        />
                      )}
                    </div>
                    <div className="btn_contact">
                      <Button
                        onClick={() => {
                          set_edit_logo(item.filename);
                          set_name_logo(item.name);
                        }}
                      >
                        <i className="fa fa-cogs"></i>
                      </Button>
                    </div>
                    <div
                      className={
                        edit_logo === item.filename
                          ? "contact_input active"
                          : "contact_input"
                      }
                    >
                      <InputGroup>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => onchangeImg(e)}
                        />
                        <Button
                          onClick={() => handle_edit_logo(item)}
                          className="btn_success"
                        >
                          <i className="fa fa-check"></i>
                        </Button>
                        <Button
                          onClick={() => handle_cancle_edit_logo()}
                          className="btn_cancle"
                        >
                          <i className="fa fa-times"></i>
                        </Button>
                      </InputGroup>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="system_content bsd p-4 mb-3">
        <div className="system_item">
          <div className="system_header">
            <h6>BANNER</h6>
            <div className="btn_add_banner">
              {add_banner ? (
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    set_add_banner(false);
                    setPhoto("");
                    setPreview("");
                  }}
                >
                  <i className="fa fa-times"></i>
                </Button>
              ) : (
                <Button
                  variant="outline-success"
                  onClick={() => set_add_banner(true)}
                >
                  <i className="fa fa-plus"></i>
                </Button>
              )}
            </div>
          </div>
          <hr className="txt_white" />
          {add_banner && (
            <div className="add_banner w-50">
              <div className="add_banner_input">
                <h6>Thêm mới banner</h6>
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{ fontStyle: "italic" }}
                    className="txt_white"
                  >
                    KT file : 1600px - 400px - 150dpi
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => onchange_new_banner(e)}
                    />
                    <Button
                      variant="outline-success"
                      onClick={() => handle_add_banner()}
                    >
                      <i className="fa fa-check"></i>
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        set_edit_banner("");
                        set_preview_new_image("");
                      }}
                    >
                      <i className="fa fa-times"></i>
                    </Button>
                  </InputGroup>
                </Form.Group>
              </div>
              {preview_new_image !== "" && (
                <div className="preview_banner">
                  <img src={preview_new_image} alt="Preview" />
                </div>
              )}

              <hr className="txt_white" />
            </div>
          )}
          <div className="banner_items">
            <Row>
              {Banners?.map((item, index) => {
                return (
                  <Col key={index} xs={12} xl={6} className="mb-3">
                    <div className="banner_item">
                      <div className="banner_img">
                        {preview !== "" && edit_banner === item.filename ? (
                          <img src={preview} alt={"preview"} />
                        ) : (
                          <img src={item.url} alt={item.filename} />
                        )}
                      </div>
                      <div className="banner_btn">
                        <Button
                          variant="outline-primary"
                          onClick={() => handle_delete_banner(item)}
                        >
                          <i className="fa fa-trash-alt"></i>
                        </Button>
                        <Button
                          onClick={() => set_edit_banner(item.filename)}
                          variant="outline-danger"
                          className="ms-2"
                        >
                          <i className="fa fa-cog"></i>
                        </Button>
                      </div>
                      <div
                        className={
                          edit_banner === item.filename
                            ? "img_edit active"
                            : "img_edit"
                        }
                      >
                        <Form.Group>
                          <InputGroup>
                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={(e) => onchangeImg(e)}
                            />
                            <Button
                              variant="outline-success"
                              onClick={() => handle_edit_banner(item)}
                            >
                              <i className="fa fa-check"></i>
                            </Button>
                            <Button
                              variant="outline-danger"
                              onClick={() => {
                                set_edit_banner("");
                                setPreview("");
                              }}
                            >
                              <i className="fa fa-times"></i>
                            </Button>
                          </InputGroup>
                        </Form.Group>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBSystems;
