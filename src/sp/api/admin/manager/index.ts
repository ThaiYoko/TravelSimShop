import { toast } from "react-toastify";
import { CreateAxiosInstance } from "../../config";
import { AppDispatch } from "../../../redux/store";
import {
  interFade_Banner,
  interFade_Category,
  interFade_Order,
  interFade_Production,
  interFade_Sim,
} from "../../../interfade";

export const category_api = {
  Add: async (name: string, dispatch: AppDispatch, accesstoken: string) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    await axiosJwt({
      method: "post",
      url: "/admin/manage/categorys/add",
      data: {
        name: name,
      },
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
  Delete: async (
    cate: interFade_Category,
    dispatch: AppDispatch,
    accesstoken: string
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    await axiosJwt({
      method: "delete",
      url: `/admin/manage/categorys/delete/${cate.id}`,
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
  Edit: async (
    cate: interFade_Category,
    name: string,
    dispatch: AppDispatch,
    accesstoken: string
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    await axiosJwt({
      method: "put",
      url: `/admin/manage/categorys/edit/${cate.id}`,
      data: {
        name,
      },
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

export const productions_api = {
  Add: async (
    new_name: string,
    new_url: string,
    idCate: number,
    photo: any,
    dispatch: AppDispatch,
    accesstoken: string
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    const form_data = new FormData();
    form_data.append("idCate", idCate.toString());
    form_data.append("url", new_url);
    form_data.append("name", new_name);
    form_data.append("photo", photo);
    await axiosJwt({
      method: "post",
      url: "/admin/manage/productions/add",
      data: form_data,
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
  Delete: async (
    product: interFade_Production,
    dispatch: AppDispatch,
    accesstoken: string
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    await axiosJwt({
      method: "delete",
      url: `/admin/manage/productions/delete/${product.id}`,
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
  Edit: async (
    product: interFade_Production,
    name: string,
    url: string,
    photo: any,
    dispatch: AppDispatch,
    accesstoken: string
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    const form_data = new FormData();
    form_data.append("url", url);
    form_data.append("name", name);
    form_data.append("photo", photo);
    await axiosJwt({
      method: "put",
      url: `/admin/manage/productions/edit/${product.id}`,
      data: form_data,
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

export const sims_api = {
  Create: async (
    idProduct: number,
    url: string,
    name: string,
    total_data: number,
    price: string,
    discount: number,
    speed_data: string,
    advantage: string,
    expiry: number,
    active: boolean,
    telco: string,
    size_sim: string,
    limit: string,
    hotspot: boolean,
    call: boolean,
    surplus: string,
    use_call: string,
    use_data: string,
    use_manual: string,
    common: boolean,
    number_selled: number,
    number_order: number,
    number_inventory: number,
    dispatch: AppDispatch,
    accesstoken: string
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    await axiosJwt({
      method: "post",
      url: "/admin/manage/sims/create",
      data: {
        idProduct,
        url,
        name,
        total_data,
        price,
        discount,
        speed_data,
        advantage,
        expiry,
        active,
        telco,
        size_sim,
        limit,
        hotspot,
        call,
        surplus,
        use_call,
        use_data,
        use_manual,
        common,
        number_selled,
        number_order,
        number_inventory,
      },
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
  Delete: async (
    sim: interFade_Sim,
    dispatch: AppDispatch,
    accesstoken: string
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    await axiosJwt({
      method: "delete",
      url: `/admin/manage/sims/delete/${sim.id}`,
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
  Edit: async (
    id: number,
    url: string,
    name: string,
    total_data: number,
    price: string,
    discount: number,
    speed_data: string,
    advantage: string,
    expiry: number,
    active: boolean,
    telco: string,
    size_sim: string,
    limit: string,
    hotspot: boolean,
    call: boolean,
    surplus: string,
    use_call: string,
    use_data: string,
    use_manual: string,
    common: boolean,
    number_selled: number,
    number_order: number,
    number_inventory: number,
    dispatch: AppDispatch,
    accesstoken: string
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    await axiosJwt({
      method: "put",
      url: `/admin/manage/sims/edit/${id}`,
      data: {
        url,
        name,
        total_data,
        price,
        discount,
        speed_data,
        advantage,
        expiry,
        active,
        telco,
        size_sim,
        limit,
        hotspot,
        call,
        surplus,
        use_call,
        use_data,
        use_manual,
        common,
        number_selled,
        number_order,
        number_inventory,
      },
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

export const order_admin_api = {
  Handle: async (
    order: interFade_Order,
    action: string,
    dispatch: AppDispatch,
    accesstoken: string
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    await axiosJwt({
      method: "post",
      url: `/admin/manage/orders/${order.id}/${action}`,
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

export const banner_admin_api = {
  Add: async (photo: any, dispatch: AppDispatch, accesstoken: string) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    const form_data = new FormData();
    form_data.append("photo", photo);
    await axiosJwt({
      method: "post",
      url: "/admin/manage/banners/add",
      data: form_data,
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
  Delete: async (
    banner: interFade_Banner,
    accesstoken: string,
    dispatch: AppDispatch
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    await axiosJwt({
      method: "delete",
      url: `/admin/manage/banners/delete/${banner.id}`,
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
  Edit: async (
    photo: any,
    banner: interFade_Banner,
    accesstoken: string,
    dispatch: AppDispatch
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    const form_data = new FormData();
    form_data.append("photo", photo);
    await axiosJwt({
      method: "put",
      url: `/admin/manage/banners/edit/${banner.id}`,
      data: form_data,
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

export const contact_admin_api = {
  Edit_Contact: async () => {},
  Edit_Logo: async (
    dispatch: AppDispatch,
    accesstoken: string,
    id: number,
    photo: any,
    name: string
  ) => {
    const axiosJwt = CreateAxiosInstance(dispatch, accesstoken);
    const forrmData = new FormData();
    forrmData.append("photo", photo);
    forrmData.append("name", name);
    await axiosJwt({
      method: "put",
      url: `/admin/manage/logo/edit/${id}`,
      data: forrmData,
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
