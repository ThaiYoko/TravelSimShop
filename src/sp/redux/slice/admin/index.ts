import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { interFade_Data_Admin, interFade_User } from "../../../interfade";

const initialState: interFade_Data_Admin = {
  Admin: {} as interFade_User,
  accesstoken: "",
  Orders: [],
  User_Count: 0,
};
const AdminSlice = createSlice({
  name: "AdminSlice",
  initialState,
  reducers: {
    Sign_In_Admin_Success: (state, action: PayloadAction<any>) => {
      state.Admin = action.payload.Admin;
      state.accesstoken = action.payload.accesstoken;
    },
    Sign_Out_Success: (state, action: PayloadAction<any>) => {
      state.Admin = {} as interFade_User;
      state.accesstoken = "";
      state.Orders = [];
    },
    Refresh_Token_Success: (state, action: PayloadAction<any>) => {
      state.accesstoken = action.payload;
    },
    Edit_User_Success: (state, action: PayloadAction<any>) => {
      state.Admin = action.payload;
    },
    Load_Data_Admin_Success: (state, action: PayloadAction<any>) => {
      state.Orders = action.payload.Orders;
      state.User_Count = action.payload.User_Count;
    },
    Reload_Order_Success: (state, action: PayloadAction<any>) => {
      state.Orders = action.payload;
    },
  },
});

export const {
  Sign_In_Admin_Success,
  Sign_Out_Success,
  Refresh_Token_Success,
  Edit_User_Success,
  Load_Data_Admin_Success,
  Reload_Order_Success,
} = AdminSlice.actions;

export const AdminSelector = {
  User: (state: RootState) => state.AdminSlice.Admin,
  accestoken: (state: RootState) => state.AdminSlice.accesstoken,
  Orders: (state: RootState) => state.AdminSlice.Orders,
  User_Count: (state: RootState) => state.AdminSlice.User_Count,
};

export default AdminSlice;
