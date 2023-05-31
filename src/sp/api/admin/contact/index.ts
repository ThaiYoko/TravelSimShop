import { toast } from "react-toastify";
import { AppDispatch } from "../../../redux/store";
import { CreateAxiosInstance } from "../../config";
import { interFade_TravelSimShop_Contact } from "../../../interfade";

export const admin_contact_api = {
  Edit: async (
    dispatch: AppDispatch,
    accesstoken: string,
    data: interFade_TravelSimShop_Contact
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    await axiosJwt({
      method: "put",
      url: "/admin/contact/edit",
      data: data,
      headers: {
        accesstoken: "Bearner " + accesstoken,
      },
    })
      .then((res) => {
        toast.success(res.data.mess);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else {
          toast.error(err);
        }
      });
  },
};
