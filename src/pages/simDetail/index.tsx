import React, { useState } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  Choose_Sim_Success,
  DataPublicSelector,
} from "../../sp/redux/slice/data";
import { formatMoney } from "../../sp/format";
import { useAppDispatch } from "../../sp/hooks";

const SimDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const Sims = useSelector(DataPublicSelector.Sims);
  const ItemDetail = Sims.find((item) => item.id === Number(id));
  console.log(ItemDetail?.discount);

  const handle_add_sim_to_cart = () => {
    const newStore = {
      sim: ItemDetail,
      count: 1,
    };
    dispatch(Choose_Sim_Success(newStore));
  };

  const [changeType, setChangeType] = useState("mô tả");
  return (
    <div id="sim_detail">
      <div className="w-70">
        <div className="sim_content">
          <Row className="bsd">
            <Col xs={12} xl={6}>
              <div className="sim_img p-5">
                <img src={ItemDetail?.avatar} alt={ItemDetail?.name} />
              </div>
            </Col>
            <Col xs={12} xl={6}>
              <div className="sim_info p-4">
                <div className="simDetail_header">
                  <h4>{ItemDetail?.name}</h4>
                </div>
                <span className="total_data">
                  {ItemDetail?.size_data} tốc độ cao 4G
                </span>
                <div className="sim_info_content">
                  <div className="price mb-3">
                    {ItemDetail?.discount && ItemDetail?.discount > 0 ? (
                      <>
                        <div className="price_item txt_center">
                          <div className="price_header">
                            <p className="m-0">Giá gốc</p>
                          </div>

                          <span>{formatMoney(ItemDetail?.price)}</span>
                          <s id="price_discount">
                            {formatMoney(
                              (
                                (ItemDetail.discount *
                                  Number(ItemDetail?.price)) /
                                100
                              ).toString()
                            )}
                          </s>
                        </div>
                        <div className="price_item txt_center ">
                          <div className="price_header bg_gray">
                            <p className="m-0">Khuyến mãi</p>
                          </div>
                          <span>
                            {formatMoney(
                              (
                                Number(ItemDetail?.price) -
                                (Number(ItemDetail?.price) *
                                  ItemDetail.discount) /
                                  100
                              ).toString()
                            )}
                          </span>
                        </div>
                      </>
                    ) : (
                      ItemDetail?.price && (
                        <>
                          <div className="price_item txt_center">
                            <div className="price_header">
                              <p className="m-0">Giá Gốc</p>
                            </div>

                            <span>
                              {formatMoney(
                                (
                                  Number(ItemDetail.price) -
                                  (ItemDetail.discount *
                                    Number(ItemDetail?.price)) /
                                    100
                                ).toString()
                              )}
                            </span>
                          </div>
                          <div className="price_item txt_center ">
                            <div className="price_header bg_gray">
                              <p className="m-0">Giảm giá</p>
                            </div>
                            <s>
                              {formatMoney(
                                (
                                  (ItemDetail.discount *
                                    Number(ItemDetail?.price)) /
                                  100
                                ).toString()
                              )}
                            </s>
                          </div>
                        </>
                      )
                    )}
                  </div>
                  <ul className="sim_item">
                    <li>
                      <span className="material-symbols-outlined">check</span>
                      <span>{ItemDetail?.size_data} Data Tốc độ cao.</span>
                    </li>
                    <li>
                      <span className="material-symbols-outlined">check</span>
                      <span>Không giới hạn 3G.</span>
                    </li>
                    <li>
                      <span className="material-symbols-outlined">check</span>
                      <span>{ItemDetail?.expiry} ngày sử dụng.</span>
                    </li>
                    <li>
                      <span className="material-symbols-outlined">check</span>
                      <span>Tự động kích hoạt. Không cần đăng ký.</span>
                    </li>
                  </ul>

                  <div className="inventory">
                    <div className="inventory_item">
                      <div className="inventory_header">
                        <p className="m-0">Còn hàng</p>
                      </div>
                      <p className="inventory_number">
                        {ItemDetail?.inventory}
                      </p>
                    </div>
                    <div className="inventory_item">
                      <div className="inventory_header">
                        <p className="m-0">Đã bán</p>
                      </div>
                      <p className="inventory_number">{ItemDetail?.selled}</p>
                    </div>
                    <div className="inventory_item">
                      <div className="inventory_header">
                        <p className="m-0">Đặt hàng</p>
                      </div>
                      <p className="inventory_number">{ItemDetail?.order}</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handle_add_sim_to_cart()}
                    className="btn_add_cart w-100"
                  >
                    <span className="material-symbols-outlined">
                      add_shopping_cart
                    </span>
                    <span>Thêm vào giỏ hàng</span>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <div className="tabs_sim bsd">
            <div className="btn_tabs">
              <Button
                onClick={() => setChangeType("mô tả")}
                className={changeType === "mô tả" ? "active" : ""}
              >
                MÔ TẢ
              </Button>
              <Button
                onClick={() => setChangeType("hdsd")}
                className={changeType === "hdsd" ? "active" : ""}
              >
                HƯỚNG DẪN SỬ DỤNG
              </Button>
              <hr className="m-0" />
            </div>
            {changeType === "mô tả" ? (
              <div className="tabs_panel">
                <div className="sim_info">
                  <div className="info_item">
                    <h6>Thông số chi tiết {ItemDetail?.name}</h6>
                    <ul>
                      <li>
                        <span>Nhà mạng: </span>
                        <span>
                          {ItemDetail?.telco.split("||").map((item, index) => {
                            return (
                              <span key={index} className="me-1 ms-1">
                                {item}
                              </span>
                            );
                          })}
                        </span>
                      </li>
                      <li>
                        <span>Kích thước sim</span>
                        <span>{ItemDetail?.size_sim}</span>
                      </li>
                      <li>
                        <span className="me-2">Dung lượng DATA</span>
                        <span>{ItemDetail?.size_data}</span>
                      </li>
                      <li>
                        <span className="me-2">Phạm vi phủ sóng</span>
                        <span>{ItemDetail?.limit}</span>
                      </li>
                      <li>
                        <span className="me-2">Thời hạn sử dụng</span>
                        <span>{ItemDetail?.expiry} Ngày</span>
                      </li>
                      <li>
                        <span className="me-2">Wifi Hotspot</span>
                        <span>
                          {ItemDetail?.wifi_hostpot
                            ? "Khả dụng"
                            : "Không khả dụng"}
                        </span>
                      </li>
                      <li>
                        <span className="me-2">Nghe gọi</span>
                        <span>
                          {ItemDetail?.call ? "Khả dụng" : "Không khả dụng"}
                        </span>
                      </li>
                    </ul>
                    <span className="note">
                      **Lưu ý: Sim chỉ dùng được ở {ItemDetail?.limit}, không
                      dùng được ở Việt Nam. Thời hạn sim bắt đầu từ lúc lắp sim
                      vào điện thoại.
                    </span>
                  </div>

                  <div className="info_item">
                    <h6>Lợi ích khi mua {ItemDetail?.name}</h6>
                    <ul>
                      <li>
                        Không mất thời gian xếp hàng, bất đồng ngôn ngữ khi mua
                        sim tại sân bay.
                      </li>
                      <li>Không cần cung cấp thông tin cá nhân, passport…</li>
                      <li>
                        Tiết kiệm hơn khi mua tại nước ngoài hay đăng ký chuyển
                        vùng (roaming) truyền thống.
                      </li>
                      <li>
                        {ItemDetail?.name} lắp vào là có thể sử dụng ngay, không
                        phải đăng ký rườm rà.
                      </li>
                      <li>
                        Cam Kết Hoàn Tiền 100% khi sim bị lỗi, không kết nối
                        được mạng.
                      </li>
                      <li>
                        Hướng dẫn sử dụng, hỗ trợ kỹ thuật 24/7 ngay cả khi đang
                        ở nước ngoài.
                      </li>
                      <li>
                        Đặt và nhận Sim từ 1 - 3 ngày làm việc, giao hàng tận
                        nhà, chỉ thanh toán khi nhận hàng.
                      </li>
                    </ul>
                  </div>

                  <div className="info_item">
                    <h6>Lưu ý</h6>
                    <ul>
                      <li>
                        Không nên sử dụng các dòng máy cũ vì không tích hợp LTE
                        - 4G hoặc các máy Samsung xách tay, máy lock.
                      </li>
                      <li>Không sử dụng cục phát Wifi và Ipad.</li>
                    </ul>
                  </div>

                  <div className="info_item">
                    <h6>Quy định đổi trả sim</h6>
                    <ul>
                      <li>
                        Nếu sim có trục trặc, cần báo ngay ngay trong tour du
                        lịch. Sau khi kết thúc tour, chúng tôi sẽ không chịu
                        trách nhiệm với sim bị trục trặc.
                      </li>
                      <li>
                        Nếu quý khách muốn trả hàng, cần đảm bảo số Seri trên
                        khay sim phải trùng với số seri sim (mạch điện trên sim
                        không bị trầy xước) - áp dụng cho HDV.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="tabs_panel">
                <div className="user_manual">
                  <div className="user_manual_item">
                    <div className="user_manual_header">
                      <h6>Với dòng máy iOS tự động</h6>
                    </div>
                    <div className="user_manual_info">
                      <div className="info_item">
                        <span>Bước 1</span>
                        <span>Lắp Sim Du Lịch vào khe sim.</span>
                      </div>

                      <div className="info_item">
                        <span>Lưu ý</span>
                        <span>
                          Chỉ lắp sim khi đã đáp sân bay nước ngoài vì thời điểm
                          sim được lắp thành công sẽ kích hoạt ngày sử dụng và
                          nhận mạng ngay.
                          <br />
                          Mở Dữ Liệu di động/ Cellular Data và Mở chuyển vùng dữ
                          liệu/ Cellular data options ( roaming On).
                        </span>
                      </div>

                      <div className="info_item">
                        <span>Bước 2</span>
                        <span>
                          Khởi động lại máy, chờ sim tự dò sóng và tự động kích
                          hoạt.
                        </span>
                      </div>

                      <div className="info_item">
                        <span>Bước 2</span>
                        <span>
                          Khởi động lại máy, chờ sim tự dò sóng và tự động kích
                          hoạt.
                        </span>
                      </div>

                      <div className="info_item">
                        <span>Bước 3</span>
                        <span>
                          Nếu máy không tự động đổi APN chọn Cài đặt/ Setting{" "}
                          {"=>"} Di động/ Cellular {"=>"} Mạng dữ liệu di động/
                          Cellular Data Network {"=>"} Đặt lại Cài đặt/ Reset
                          Settings {"=>"} Sửa APN dòng đầu tiên trên cùng thành
                          “Sim Station sẽ cung cấp khi giao dịch”.
                        </span>
                      </div>

                      <div className="info_item">
                        <span>Bước 4</span>
                        <span>Tắt máy, khởi động lại.</span>
                      </div>
                    </div>
                  </div>

                  <div className="user_manual_item">
                    <div className="user_manual_header">
                      <h6>Với dòng máy Android không tự động</h6>
                    </div>
                    <div className="user_manual_info">
                      <div className="info_item">
                        <span>Bước 1</span>
                        <span>
                          Lắp Sim Du Lịch vào khe sim 1 (với loại máy 2 sim 2
                          sóng). Trong khi lắp sim 1, phải tắt hoặc tháo sim 2
                          ra khỏi máy. Mở Dữ Liệu di động/ Cellular Data và Mở
                          chuyển vùng dữ liệu/ Cellular data options (roaming
                          On).
                        </span>
                      </div>

                      <div className="info_item">
                        <span>Lưu ý</span>
                        <span>
                          Chỉ lắp sim khi đã đáp sân bay nước ngoài vì thời điểm
                          sim được lắp thành công sẽ kích hoạt ngày sử dụng và
                          nhận mạng ngay.
                        </span>
                      </div>

                      <div className="info_item">
                        <span>Bước 2</span>
                        <span>
                          Khởi động lại máy, chờ sim tự dò sóng và tự động kích
                          hoạt.
                        </span>
                      </div>

                      <div className="info_item">
                        <span>Bước 2</span>
                        <span>
                          Khởi động lại máy, chờ sim tự dò sóng và tự động kích
                          hoạt. Với một số dòng máy, thời gian kích hoạt có thể
                          lâu hơn, vui lòng chờ trong ít nhất 5 phút.
                        </span>
                      </div>

                      <div className="info_item">
                        <span>Bước 3</span>
                        <span>
                          Tắt tính năng Wifi và chỉnh sang Chuyển Vùng Dữ Liệu/
                          Data Roaming bằng cách: <br />
                          vào Cài đặt/ Setting {"=>"} Dữ liệu di động/ Cellular
                          Data hoặc Connections {"=>"} Tùy chọn Dữ liệu di động/
                          Cellular Data Options {"=>"} Data Roaming/ Chuyển vùng
                          dữ liệu {"=>"} Bật On.
                          <br /> Sau khi thực hiện đủ 3 bước ở trên, máy của bạn
                          vẫn không kết nối được mạng, hãy chỉnh cấu hình mạng
                          APN cho máy theo hướng dẫn.
                          <br /> Cài đặt/ Setting {"=>"} Kết nối/ Connections{" "}
                          {"=>"} Mạng di động/ Mobile networks {"=>"} Điểm truy
                          cập/ Access point name or APN {"=>"} Chọn “Tạo mới
                          APN/ New APN” (dấu cộng) {"=>"} Sửa APN thành “ Sim
                          station cung cấp khi giao dịch”.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimDetail;
