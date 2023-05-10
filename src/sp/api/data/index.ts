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
  get_list_sim_by_id: async (id: number) => {
    await root_axios({
      method: "get",
      url: "/data/sims",
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  },
};
