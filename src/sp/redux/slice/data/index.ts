import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { interFade_Data } from "../../../interfade";

const initialState: interFade_Data = {
  Banners: [],
  Categorys: [],
  Productions: [],
  Sims: [],
  Hot_Sim: [],
  Reviews: [],
  Store: [],
};
const DataPublicSlice = createSlice({
  name: "Data_Public",
  initialState,
  reducers: {
    Load_Data_Pl_Success: (state, action: PayloadAction<any>) => {
      state.Banners = action.payload.Banners;
      state.Categorys = action.payload.Categorys;
      state.Productions = action.payload.Productions;
      state.Sims = action.payload.Sims;
      state.Hot_Sim = action.payload.Hot_Sims;
      state.Reviews = action.payload.Reviews;
    },
    //Store
    Choose_Sim_Success: (state, actions: PayloadAction<any>) => {
      const index = state.Store.findIndex(
        (item) => item.sim.id === actions.payload.sim.id
      );
      if (index !== -1) {
        state.Store[index].count += 1;
      } else {
        state.Store.push(actions.payload);
      }
    },
  },
});

export const { Load_Data_Pl_Success, Choose_Sim_Success } =
  DataPublicSlice.actions;

export const DataPublicSelector = {
  Banners: (state: RootState) => state.DataPublic.Banners,
  Categorys: (state: RootState) => state.DataPublic.Categorys,
  Productions: (state: RootState) => state.DataPublic.Productions,
  Sims: (state: RootState) => state.DataPublic.Sims,
  Hot_Sims: (state: RootState) => state.DataPublic.Hot_Sim,
  Reviews: (state: RootState) => state.DataPublic.Reviews,
  Store: (state: RootState) => state.DataPublic.Store,
};

export default DataPublicSlice;
