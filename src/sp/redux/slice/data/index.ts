import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { interFade_Data } from "../../../interfade";

const initialState: interFade_Data = {
  Categorys: [],
  Productions: [],
  Sims: [],
  Hot_Sim: [],
  Reviews: [],
};
const DataPublicSlice = createSlice({
  name: "Data_Public",
  initialState,
  reducers: {
    Load_Data_Pl_Success: (state, action: PayloadAction<any>) => {
      state.Categorys = action.payload.Categorys;
      state.Productions = action.payload.Productions;
      state.Sims = action.payload.Sims;
      state.Hot_Sim = action.payload.Hot_Sims;
      state.Reviews = action.payload.Reviews;
    },
  },
});

export const { Load_Data_Pl_Success } = DataPublicSlice.actions;

export const DataPublicSelector = {
  Categorys: (state: RootState) => state.DataPublic.Categorys,
  Productions: (state: RootState) => state.DataPublic.Productions,
  Sims: (state: RootState) => state.DataPublic.Sims,
  Hot_Sims: (state: RootState) => state.DataPublic.Hot_Sim,
  Reviews: (state: RootState) => state.DataPublic.Reviews,
};

export default DataPublicSlice;
