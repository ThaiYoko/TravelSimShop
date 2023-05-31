import { toast } from "react-toastify";
import { CreateAxiosInstance, root_axios } from "../../config";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";

export const authen_api = {
  Register: async (
    username: string,
    password: string,
    email: string,
    phone: string,
    key_admin: string,
    navigate: NavigateFunction
  ) => {
    const toast_id = toast.loading("Please wait...");
    await root_axios({
      method: "post",
      url: "/admin/authen/register",
      data: {
        username,
        password,
        email,
        phone,
        key_admin,
      },
    })
      .then((res) => {
        toast.update(toast_id, {
          render: res.data.mess,
          type: "success",
          isLoading: false,
        });
        navigate("/admin");
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
  Login: async (
    username: string,
    password: string,
    key_admin: string,
    navigate: NavigateFunction,
    dispatch: AppDispatch,
    Sign_In_Admin_Success: any
  ) => {
    const toast_id = toast.loading("Please wait...");
    await root_axios({
      method: "post",
      url: "/admin/authen/login",
      data: {
        username,
        password,
        key_admin,
      },
    })
      .then((res) => {
        toast.update(toast_id, {
          render: res.data.mess,
          type: "success",
          isLoading: false,
        });
        dispatch(Sign_In_Admin_Success(res.data));
        navigate("/admin/dashboard", { replace: true });
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
  Logout: async (
    navigate: NavigateFunction,
    dispatch: AppDispatch,
    Sign_Out_Success: any
  ) => {
    await root_axios({
      method: "get",
      url: "/admin/authen/logout",
    })
      .then((res) => {
        toast.success(res.data.mess);
        dispatch(Sign_Out_Success());
        navigate("/admin", { replace: true });
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else {
          toast.error(err);
        }
      });
  },
  Edit: async (
    dispatch: AppDispatch,
    accesstoken: string,
    email: string,
    phone: string,
    id: number,
    Edit_User_Success: any
  ) => {
    const toast_id = toast.loading("Please wait...");
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    await axiosJwt({
      method: "put",
      url: `/admin/authen/edit/${id}`,
      data: {
        email,
        phone,
      },
      headers: {
        accesstoken: "Bearner " + accesstoken,
      },
    })
      .then((res) => {
        dispatch(Edit_User_Success(res.data.Admin));
        toast.update(toast_id, {
          render: res.data.mess,
          type: "success",
          isLoading: false,
        });
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
  ChangePassword: async (
    dispatch: AppDispatch,
    accesstoken: string,
    old_pass: string,
    new_pass: string,
    id: number
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    const toast_id = toast.loading("Please wait...");
    await axiosJwt({
      method: "put",
      url: `/admin/authen/change_password/${id}`,
      data: {
        old_pass,
        new_pass,
      },
      headers: {
        accesstoken: "Bearner " + accesstoken,
      },
    })
      .then((res) => {
        toast.update(toast_id, {
          render: res.data.mess,
          type: "success",
          isLoading: false,
        });
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
