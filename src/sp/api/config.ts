import axios from "axios";
import jwt from "jwt-decode";
import { AppDispatch } from "../redux/store";
import { Refresh_Token_Success, Sign_Out_Success } from "../redux/slice/admin";
import { toast } from "react-toastify";
export const base_url = "https://events.travelsimshop.vn";
export const root_axios = axios.create({
  baseURL: base_url + "/api/v1",
  withCredentials: true,
});

const handleRefreshToken = async (
  dispatch: AppDispatch,
  Sign_Out_Success: any
) => {
  try {
    const res = await root_axios({
      method: "post",
      url: "/admin/token/refreshtoken",
    });
    return res.data;
  } catch (error) {
    toast.error("Hết phiên đăng nhập!");
    dispatch(Sign_Out_Success());
  }
};
export const CreateAxiosInstance = (
  dispatch: AppDispatch,
  accesstoken: string
) => {
  const instance = axios.create({
    baseURL: base_url + "/api/v1",
  });

  instance.interceptors.request.use(
    async (config: any) => {
      const d = new Date();
      if (accesstoken) {
        const decoToken: any = jwt(accesstoken);
        if (decoToken.exp - d.getTime() / 1000 < 0) {
          const data = await handleRefreshToken(dispatch, Sign_Out_Success);
          dispatch(Refresh_Token_Success(data.accesstoken));
          config.headers["accesstoken"] = "Bearner " + data.accesstoken;
        }
        return config;
      } else {
        dispatch(Sign_Out_Success(null));
      }
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return instance;
};
