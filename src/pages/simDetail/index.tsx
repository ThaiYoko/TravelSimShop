import React, { useState, useEffect } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  Choose_Sim_Success,
  DataPublicSelector,
} from "../../sp/redux/slice/data";
import { formatMoney } from "../../sp/format";
import { useAppDispatch } from "../../sp/hooks";
import SEO from "../../seo";

const SimDetail = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const dispatch = useAppDispatch();
  const { sim } = useParams();

  const Sims = useSelector(DataPublicSelector.Sims);
  const ItemDetail = Sims?.find((item) => item.url === sim);

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
      {ItemDetail && (
        <SEO
          title={ItemDetail.name}
          description={`Sim du lịch ${ItemDetail?.Production?.name} giá rẻ`}
        />
      )}
      <div className="w-70">
        <div className="sim_content">
          <div className="bsd">
            <Row>
              <Col xs={12} xl={6}>
                <div className="sim_img">
                  <img
                    src={ItemDetail?.Production?.avatar}
                    alt={ItemDetail?.name}
                  />
                </div>
              </Col>
              <Col xs={12} xl={6}>
                <div className="sim_info">
                  <div className="simDetail_header">
                    <h4>{ItemDetail?.name}</h4>
                  </div>
                  <span className="total_data">
                    {ItemDetail?.total_data &&
                      `${ItemDetail?.total_data}GB tốc độ cao 4G`}
                  </span>
                  <div className="sim_info_content">
                    <div className="price">
                      {ItemDetail?.price && (
                        <>
                          <s>{formatMoney(ItemDetail?.price)}</s>
                          <h1>
                            {formatMoney(
                              (
                                Number(ItemDetail?.price) -
                                Number(ItemDetail?.discount)
                              ).toString()
                            )}
                          </h1>
                        </>
                      )}
                    </div>
                    <ul className="sim_item">
                      {ItemDetail?.total_data && (
                        <li>
                          <span className="material-symbols-outlined">
                            check
                          </span>
                          <span>
                            {ItemDetail?.total_data % ItemDetail?.expiry === 0
                              ? ` ${
                                  ItemDetail?.total_data / ItemDetail?.expiry
                                }GB Data Tốc độ cao mỗi ngày.`
                              : `${ItemDetail?.total_data}GB Data Tốc độ cao.`}
                          </span>
                        </li>
                      )}

                      {ItemDetail?.speed_data && (
                        <li>
                          <span className="material-symbols-outlined">
                            check
                          </span>
                          <span>{ItemDetail?.speed_data}</span>
                        </li>
                      )}

                      <li>
                        <span className="material-symbols-outlined">check</span>
                        <span>{ItemDetail?.expiry} ngày sử dụng.</span>
                      </li>
                      <li>
                        <span className="material-symbols-outlined">check</span>
                        {ItemDetail?.active ? (
                          <span>Cần kích hoạt.</span>
                        ) : (
                          <span>Tự động kích hoạt. Không cần đăng ký.</span>
                        )}
                      </li>
                      {ItemDetail?.advantage &&
                        ItemDetail?.advantage?.split("||").map((ad, index2) => {
                          return (
                            <li key={index2}>
                              <span className="material-symbols-outlined">
                                check
                              </span>
                              <span>{ad}</span>
                            </li>
                          );
                        })}
                    </ul>

                    <div className="inventory">
                      <div className="inventory_item">
                        <div className="inventory_header bg_red">
                          <p className="m-0">Còn hàng</p>
                        </div>
                        {ItemDetail?.number_inventory &&
                        ItemDetail?.number_inventory > 0 ? (
                          <div className="inventory_number">
                            <p className="m-0">
                              {ItemDetail?.number_inventory}
                            </p>
                          </div>
                        ) : (
                          <div className="inventory_number">
                            <p className="m-0">Hết hàng</p>
                          </div>
                        )}
                      </div>
                      <div className="inventory_item">
                        <div className="inventory_header bg_red_100">
                          <p className="m-0">Đã bán</p>
                        </div>
                        {ItemDetail?.number_selled && (
                          <div className="inventory_number">
                            <p className="m-0">{ItemDetail?.number_selled}</p>
                          </div>
                        )}
                      </div>
                      <div className="inventory_item">
                        <div className="inventory_header bg_red_200">
                          <p className="m-0">Đặt hàng</p>
                        </div>
                        {ItemDetail?.number_order && (
                          <div className="inventory_number">
                            <p className="m-0">{ItemDetail?.number_order}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={() => handle_add_sim_to_cart()}
                      className="btn_add_cart"
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
          </div>

          <div className="tabs_sim mt-4 mb-4 bsd">
            <div className="btn_tabs">
              <Button
                onClick={() => setChangeType("mô tả")}
                className={changeType === "mô tả" ? "active" : ""}
              >
                MÔ TẢ
              </Button>
              <Button
                variant="primary"
                onClick={() => setChangeType("hdsd")}
                className={changeType === "hdsd" ? "active" : ""}
              >
                HƯỚNG DẪN SỬ DỤNG
              </Button>
            </div>
            {changeType === "mô tả" ? (
              <div className="tabs_panel">
                <div className="sim_info">
                  <div className="info_item">
                    <ListGroup as="ol">
                      <ListGroup.Item as="li" className="txt_bold txt_red">
                        Thông số chi tiết {ItemDetail?.name}
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">Nhà mạng: </span>
                        <span>
                          <ul>
                            {ItemDetail?.telco
                              .split("||")
                              .map((item, index) => {
                                return <li key={index}>{item}</li>;
                              })}
                          </ul>
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">Kích thước sim:</span>
                        <span>{ItemDetail?.size_sim.toUpperCase()}</span>
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">
                          Tổng dung lượng DATA:
                        </span>
                        <span>{ItemDetail?.total_data}GB</span>
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">Phạm vi phủ sóng:</span>
                        <span>{ItemDetail?.limit.toUpperCase()}</span>
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">Thời hạn sử dụng:</span>
                        <span>{ItemDetail?.expiry} Ngày</span>
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">Wifi Hotspot:</span>
                        <span>
                          {ItemDetail?.hotspot ? "Khả dụng" : "Không khả dụng"}
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">Nghe gọi:</span>
                        <span>
                          {ItemDetail?.call ? "Khả dụng" : "Không khả dụng"}
                        </span>
                      </ListGroup.Item>
                      {ItemDetail?.use_call && (
                        <ListGroup.Item>
                          <span className="me-2 txt_bold">
                            Các nước có thể sử dụng cuộc gọi:
                          </span>
                          <span>{ItemDetail.use_call}</span>
                        </ListGroup.Item>
                      )}

                      {ItemDetail?.use_data && (
                        <ListGroup.Item>
                          <span className="me-2 txt_bold">
                            Các nước chỉ sử dụng data:
                          </span>
                          <span>{ItemDetail.use_data}</span>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                    <span className="note mt-3 d-block">
                      **Lưu ý: Sim chỉ dùng được ở {ItemDetail?.limit}, không
                      dùng được ở Việt Nam. Thời hạn sim bắt đầu từ lúc lắp sim
                      vào điện thoại.
                    </span>
                  </div>

                  <div className="info_item">
                    <ListGroup as="ol">
                      <ListGroup.Item as="li" className="txt_bold txt_red">
                        Lợi ích khi mua {ItemDetail?.name}
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        Không mất thời gian xếp hàng, bất đồng ngôn ngữ khi mua
                        sim tại sân bay.
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        Không cần cung cấp thông tin cá nhân, passport…
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Tiết kiệm hơn khi mua tại nước ngoài hay đăng ký chuyển
                        vùng (roaming) truyền thống.
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {ItemDetail?.name} lắp vào là có thể sử dụng ngay, không
                        phải đăng ký rườm rà.
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Cam Kết Hoàn Tiền 100% khi sim bị lỗi, không kết nối
                        được mạng.
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Hướng dẫn sử dụng, hỗ trợ kỹ thuật 24/7 ngay cả khi đang
                        ở nước ngoài.
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Đặt và nhận Sim từ 1 - 3 ngày làm việc, giao hàng tận
                        nhà, chỉ thanh toán khi nhận hàng.
                      </ListGroup.Item>
                    </ListGroup>
                  </div>

                  <div className="info_item">
                    <ListGroup as="ol">
                      <ListGroup.Item as="li" className="txt_bold txt_red">
                        Lưu ý
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Không nên sử dụng các dòng máy cũ vì không tích hợp LTE
                        - 4G hoặc các máy Samsung xách tay, máy lock.
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Không sử dụng cục phát Wifi và Ipad.
                      </ListGroup.Item>
                    </ListGroup>
                  </div>

                  <div className="info_item">
                    <ListGroup as="ol">
                      <ListGroup.Item className="txt_bold txt_red" as="li">
                        Quy định đổi trả sim
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Nếu sim có trục trặc, cần báo ngay ngay trong tour du
                        lịch. Sau khi kết thúc tour, chúng tôi sẽ không chịu
                        trách nhiệm với sim bị trục trặc.
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Nếu quý khách muốn trả hàng, cần đảm bảo số Seri trên
                        khay sim phải trùng với số seri sim (mạch điện trên sim
                        không bị trầy xước) - áp dụng cho HDV.
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </div>
              </div>
            ) : (
              <div className="tabs_panel">
                <div className="user_manual">
                  <div className="user_manual_item">
                    <ListGroup as="ol" className="mt-3">
                      <ListGroup.Item className="txt_red txt_bold" as="li">
                        Với dòng máy iOS tự động
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">Bước 1</span>
                        <span>Lắp Sim Du Lịch vào khe sim.</span>
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">Lưu ý:</span>
                        <span>
                          Chỉ lắp sim khi đã đáp sân bay nước ngoài vì thời điểm
                          sim được lắp thành công sẽ kích hoạt ngày sử dụng và
                          nhận mạng ngay.
                          <br />
                          Mở Dữ Liệu di động/ Cellular Data và Mở chuyển vùng dữ
                          liệu/ Cellular data options ( roaming On).
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span className="txt_bold me-2">Bước 2</span>
                        <span>
                          Khởi động lại máy, chờ sim tự dò sóng và tự động kích
                          hoạt.
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span className="txt_bold me-2">Bước 3</span>
                        <span>
                          Nếu máy không tự động đổi APN <br />
                          Chọn
                          <span className="txt_bold"> Cài đặt/ Setting </span>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                          <span className="txt_bold"> Di động/ Cellular </span>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                          <span className="txt_bold">
                            Mạng dữ liệu di động/ Cellular Data Network
                          </span>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                          <span className="txt_bold">
                            Đặt lại Cài đặt/ Reset Settings
                          </span>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                          <span className="txt_bold">
                            Sửa APN dòng đầu tiên trên cùng thành “Sim Station
                            sẽ cung cấp khi giao dịch”.
                          </span>
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span className="txt_bold me-2">Bước 4</span>
                        <span>Tắt máy, khởi động lại.</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>

                  <div className="user_manual_item">
                    <ListGroup as="ol" className="mt-3">
                      <ListGroup.Item className="txt_bold txt_red" as="li">
                        Với dòng máy Android không tự động
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">Bước 1</span>
                        <span>
                          Lắp Sim Du Lịch vào khe sim 1 (với loại máy 2 sim 2
                          sóng). Trong khi lắp sim 1, phải tắt hoặc tháo sim 2
                          ra khỏi máy. Mở Dữ Liệu di động/ Cellular Data và Mở
                          chuyển vùng dữ liệu/ Cellular data options (roaming
                          On).
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">Lưu ý</span>
                        <span>
                          Chỉ lắp sim khi đã đáp sân bay nước ngoài vì thời điểm
                          sim được lắp thành công sẽ kích hoạt ngày sử dụng và
                          nhận mạng ngay.
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">Bước 2</span>
                        <span>
                          Khởi động lại máy, chờ sim tự dò sóng và tự động kích
                          hoạt.
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">Bước 2</span>
                        <span>
                          Khởi động lại máy, chờ sim tự dò sóng và tự động kích
                          hoạt. Với một số dòng máy, thời gian kích hoạt có thể
                          lâu hơn, vui lòng chờ trong ít nhất 5 phút.
                        </span>
                      </ListGroup.Item>
                      <ListGroup.Item as="li">
                        <span className="txt_bold me-2">Bước 3</span>
                        <span>
                          Tắt tính năng Wifi và chỉnh sang Chuyển Vùng Dữ Liệu/
                          Data Roaming bằng cách: <br />
                          vào <span className="txt_bold">Cài đặt/ Setting</span>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                          <span className="txt_bold">
                            Dữ liệu di động/ Cellular Data hoặc Connections
                          </span>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                          <span className="txt_bold">
                            Tùy chọn Dữ liệu di động/ Cellular Data Options
                          </span>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                          <span className="txt_bold">
                            Data Roaming/ Chuyển vùng dữ liệu
                          </span>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>{" "}
                          <span className="txt_bold"> Bật On.</span>
                          <br /> Sau khi thực hiện đủ 3 bước ở trên, máy của bạn
                          vẫn không kết nối được mạng, hãy chỉnh cấu hình mạng
                          APN cho máy theo hướng dẫn.
                          <br />
                          <span className="txt_bold">Cài đặt/ Setting</span>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                          <span className="txt_bold">Kết nối/ Connections</span>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                          <span className="txt_bold">
                            Mạng di động/ Mobile networks
                          </span>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                          <span className="txt_bold">
                            Điểm truy cập/ Access point name or APN
                          </span>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                          <span className="txt_bold">
                            Chọn “Tạo mới APN/ New APN” (dấu cộng)
                          </span>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                          <span className="txt_bold">
                            Sửa APN thành “ Sim station cung cấp khi giao dịch”.
                          </span>
                        </span>
                      </ListGroup.Item>
                    </ListGroup>
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
