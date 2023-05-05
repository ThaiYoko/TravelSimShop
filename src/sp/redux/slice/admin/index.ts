import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { interFade_Data_Admin, interFade_User } from "../../../interfade";

const initialState: interFade_Data_Admin = {
  Admin: {} as interFade_User,
  accesstoken: "",
};
const AdminSlice = createSlice({
  name: "AdminSlice",
  initialState,
  reducers: {
    Sign_In_Success: (state, action: PayloadAction<any>) => {
      state.Admin = action.payload.Admin;
      state.accesstoken = action.payload.accesstoken;
    },
  },
});

export const { Sign_In_Success } = AdminSlice.actions;

export const AdminSelector = {
  User: (state: RootState) => state.AdminSlice.Admin,
  accestoken: (state: RootState) => state.AdminSlice.accesstoken,
};

export default AdminSlice;
