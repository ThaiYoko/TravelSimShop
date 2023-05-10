import React from "react";
import SimBanners from "../../layouts/banner";
import { Row, Col } from "react-bootstrap";
import "./style.scss";
import SlideImg from "../../components/slideImg";
import { useSelector } from "react-redux";
import { DataPublicSelector } from "../../sp/redux/slice/data";
import SlideReviews from "../../components/slideReviews";

import tietkiem from "../../access/img/tietkiem.png";
import ship from "../../access/img/ship-01.png";
import thutuc from "../../access/img/thutuc-01.png";

const HomePage = () => {
  const Sims = useSelector(DataPublicSelector.Sims);
  const ListComons = Sims?.filter((item) => item.common);
  const Hot_Sims = useSelector(DataPublicSelector.Hot_Sims);
  return (
    <div id="home_page">
      <SimBanners />
      <SlideImg
        List_Card={Hot_Sims}
        Title="CÁC GÓI SIM BÁN CHẠY NHẤT"
        Bgr="bg_white"
      />
      <SlideImg
        List_Card={ListComons}
        Title="CÁC GÓI SIM THÔNG DỤNG QUỐC TẾ"
        Bgr="bg_pink_700"
      />

      <section id="advantage" className="mb-5 mt-5">
        <div className="w-85">
          <div className="sim_header mb-4">
            <h4 className="txt_center txt_red">ƯU ĐIỂM CỦA SIM THẺ QUỐC TẾ</h4>
          </div>
          <div className="advantage_content">
            <Row>
              <Col xs={12} sm={12} md={6} xl={3} className="mb-2 mt-2">
                <div className="advantage_item bsd bdr-7">
                  <div className="item_icon">
                    <span className="material-symbols-outlined">contacts</span>
                  </div>
                  <div className="advantage_info">
                    <div className="item_title">
                      <h6 className="txt_center txt_bold">
                        GIỮ LIÊN LẠC VỚI <br /> NGƯỜI THÂN, BẠN BÈ
                      </h6>
                    </div>
                    <div className="advantage_txt">
                      <p className="txt_justify">
                        Thẻ sim quốc tế cho phép bạn sử dụng dịch vụ viễn thông
                        của quốc gia sở tại, có thể gọi điện hay nhắn tin với
                        người thân, bạn bè… ở Việt Nam hay người quen ở đất nước
                        bạn đến.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} xl={3} className="mb-2 mt-2">
                <div className="advantage_item bsd bdr-7">
                  <div className="item_icon">
                    <span className="material-symbols-outlined">
                      rocket_launch
                    </span>
                  </div>
                  <div className="advantage_info">
                    <div className="item_title">
                      <h6 className="txt_center txt_bold">
                        TRUY CẬP INTERNET,
                        <br />
                        LƯỚT WEB THOẢI MÁI
                      </h6>
                    </div>
                    <div className="advantage_txt">
                      <p className="txt_justify">
                        Thẻ sim quốc tế sẽ có sẵn dung lượng data 3G/ 4G để bạn
                        có thể truy cập internet, lướt web, gửi mail… mà không
                        cần đăng ký thông tin rườm rà, không phải mang theo cục
                        phát wifi hay sử dụng wifi công cộng.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} xl={3} className="mb-2 mt-2">
                <div className="advantage_item bsd bdr-7">
                  <div className="item_icon">
                    <span className="material-symbols-outlined">
                      travel_explore
                    </span>
                  </div>
                  <div className="advantage_info">
                    <div className="item_title">
                      <h6 className="txt_center txt_bold">
                        TRA CỨU THÔNG TIN,
                        <br />
                        ĐƯỜNG ĐI DỄ DÀNG
                      </h6>
                    </div>
                    <div className="advantage_txt">
                      <p className="txt_justify">
                        Có sim data quốc tế bạn có thể truy cập mạng, google
                        maps mọi lúc mọi nơi… giúp chuyến đi của bạn dễ dàng
                        hơn, không lo lắng lạc đường khi đi đến một đất nước xa
                        lạ.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} xl={3} className="mb-2 mt-2">
                <div className="advantage_item bsd bdr-7">
                  <div className="item_icon">
                    <span className="material-symbols-outlined">avg_pace</span>
                  </div>
                  <div className="advantage_info">
                    <div className="item_title">
                      <h6 className="txt_center txt_bold">
                        TIẾT KIỆM CHI PHÍ,
                        <br />
                        THỜI GIAN
                      </h6>
                    </div>
                    <div className="advantage_txt">
                      <p className="txt_justify">
                        Với Sim du lịch bạn chỉ cần gắn vào máy là có thể sử
                        dụng ngay không cần tốn thời gian đăng ký và xác nhận
                        thông tin. Sim có sẵn tiền và dữ liệu data có thể sử
                        dụng nghe gọi được ngay mà không tốn chi phí đăng ký
                        dịch vụ chuyển vùng quốc tế.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <section id="TRAVELSIMSHOP" className="mt-5 mb-5 p-5 bg_pink_700">
        <div className="w-80">
          <div className="sim_header mb-4">
            <h4 className="txt_center txt_red">
              ƯU ĐIỂM KHI MUA HÀNG TẠI TRAVELSIMSHOP
            </h4>
          </div>
          <div className="travel_content">
            <div className="travel_item  bsd bdr-7 bg_white">
              <div className="item_icon">
                <span className="material-symbols-outlined">
                  monetization_on
                </span>
              </div>
              <hr />
              <div className="item_title">
                <h6 className="txt_center txt_bold">
                  TIẾT KIỆM HƠN KHI MUA Ở NƯỚC NGOÀI
                </h6>
              </div>

              <div className="travel_info">
                <div className="item_txt">
                  <p className="txt_justify">
                    Mua Sim Quốc Tế ở Sim Station đảm bảo rẻ hơn tới 50% so với
                    khi mua sim ở nước ngoài. Sẵn sàng hoàn tiền 100% khi sim bị
                    lỗi, hỗ trợ tư vấn 24/7.
                  </p>
                </div>

                <img src={tietkiem} alt="tietkiem" className="w-80" />
              </div>
            </div>

            <div className="travel_item bsd bdr-7 bg_white">
              <div className="item_icon">
                <span className="material-symbols-outlined">
                  local_shipping
                </span>
              </div>
              <hr />
              <div className="item_title">
                <h6 className="txt_center txt_bold">GIAO HÀNG TẬN NƠI</h6>
              </div>

              <div className="travel_info">
                <div className="item_txt">
                  <p className="txt_justify">
                    Đặt và nhận Sim từ 1 - 3 ngày làm việc, giao hàng tận nhà,
                    thanh toán khi nhận hàng.
                  </p>
                </div>
                <img src={ship} alt="ship" className="w-95" />
              </div>
            </div>

            <div className="travel_item bsd bdr-7 bg_white">
              <div className="item_icon">
                <span className="material-symbols-outlined">overview</span>
              </div>
              <hr />
              <div className="item_title">
                <h6 className="txt_center txt_bold">THỦ TỤC ĐƠN GIẢN</h6>
              </div>
              <div className="travel_info">
                <div className="item_txt">
                  <p className="txt_justify">
                    Không cần đăng ký thông tin rườm rà, không cần Passport khi
                    mua, không lo bị đánh cắp thông tin. Chỉ cần liên hệ Sim
                    Station đặt mua đơn giản, lắp sim vào máy là kích hoạt dùng
                    ngay.
                  </p>
                </div>
                <img src={thutuc} alt="ship" className="w-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews">
        <div className="w-80">
          <div className="sim_header mb-4">
            <h4 className="txt_center txt_red">CHIA SẺ CỦA KHÁCH HÀNG</h4>
          </div>
          <SlideReviews />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
