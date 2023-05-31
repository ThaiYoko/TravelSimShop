import { toast } from "react-toastify";
import { CreateAxiosInstance } from "../../config";
import { AppDispatch } from "../../../redux/store";

export const admin_data_api = {
  load_data: async (
    dispatch: AppDispatch,
    Load_Data_Admin_Success: any,
    accesstoken: string
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    await axiosJwt({
      method: "get",
      url: "/admin/data",
      headers: {
        accesstoken: "Bearner " + accesstoken,
      },
    })
      .then((res) => {
        dispatch(Load_Data_Admin_Success(res.data));
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else {
          toast.error(err);
        }
      });
  },
  reload_data: async (
    type_data: string,
    dispatch: AppDispatch,
    Action_Success: any,
    accesstoken: string
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    await axiosJwt({
      method: "get",
      url: `/admin/data/reload/${type_data}`,
      headers: {
        accesstoken: "Bearner " + accesstoken,
      },
    })
      .then((res) => {
        dispatch(Action_Success(res.data.Result));
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
