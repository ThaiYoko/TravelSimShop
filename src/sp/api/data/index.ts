import { root_axios } from "../config";
import { AppDispatch } from "../../redux/store";

export const data_api = {
  load_data: async (dispatch: AppDispatch, Load_Data_Pl_Success: any) => {
    await root_axios({
      method: "get",
      url: "/data",
    })
      .then((res) => {
        dispatch(Load_Data_Pl_Success(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  },
  reload_data: async (
    type_data: string,
    dispatch: AppDispatch,
    Action_Success: any
  ) => {
    await root_axios({
      method: "get",
      url: `/data/${type_data}`,
    })
      .then((res) => {
        dispatch(Action_Success(res.data.Result));
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
