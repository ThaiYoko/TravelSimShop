import { NavigateFunction } from "react-router-dom";
import { interFade_Store } from "../../interfade";
import { AppDispatch } from "../../redux/store";
import { root_axios } from "../config";
import { toast } from "react-toastify";

export const order_api = {
  Create: async (
    store: interFade_Store[],
    name: string,
    adress: string,
    phone: string,
    dateline: string,
    email: string,
    note: string,
    code_bill: string,
    photo: any,
    set_photo: any,
    setName: any,
    setAdress: any,
    setPhone: any,
    setDate: any,
    setEmail: any,
    setNote: any,
    setShow: any,
    dispatch: AppDispatch,
    Clear_Store_Success: any,
    navigate: NavigateFunction
  ) => {
    const toast_id = toast.loading("Please waiting...");
    const str = JSON.stringify(store);
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("store", str);
    formData.append("name", name);
    formData.append("adress", adress);
    formData.append("phone", phone);
    formData.append("dateline", dateline);
    formData.append("email", email);
    formData.append("note", note);
    formData.append("code_bill", code_bill);
    await root_axios({
      method: "post",
      url: "/orders/create",
      data: formData,
    })
      .then((res) => {
        toast.update(toast_id, {
          render: res.data.mess,
          type: "success",
          isLoading: false,
        });
        setName("");
        setAdress("");
        setPhone("");
        setDate("");
        setEmail("");
        setNote("");
        set_photo("");
        setShow(false);
        dispatch(Clear_Store_Success());
        navigate("/");
        setTimeout(() => {
          toast.dismiss(toast_id);
        }, 2000);
      })
      .catch((err) => {
        if (err.response) {
          toast.update(toast_id, {
            render: err.response.data.error,
            type: "error",
            isLoading: false,
          });
          setTimeout(() => {
            toast.dismiss(toast_id);
          }, 2000);
        } else {
          toast.update(toast_id, {
            render: err,
            type: "error",
            isLoading: false,
          });
          setTimeout(() => {
            toast.dismiss(toast_id);
          }, 2000);
        }
      });
  },
};
