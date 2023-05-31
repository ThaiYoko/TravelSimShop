import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import {
  interFade_Data,
  interFade_TravelSimShop_Contact,
} from "../../../interfade";

const initialState: interFade_Data = {
  Banners: [],
  Categorys: [],
  Productions: [],
  Sims: [],
  Hot_Sim: [],
  Reviews: [],
  Store: [],
  Logos: [],
  TravelSimShop_Contact: {} as interFade_TravelSimShop_Contact,
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
      state.Logos = action.payload.Logos;
      state.TravelSimShop_Contact = action.payload.TravelSimShopContact;
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
    Add_Sim_Success: (state, actions: PayloadAction<any>) => {
      const index = state.Store.findIndex(
        (item) => item.sim.id === actions.payload.sim.id
      );
      if (index !== -1) {
        state.Store[index].count += 1;
      } else {
        return;
      }
    },
    Remove_Sim_Success: (state, actions: PayloadAction<any>) => {
      const index = state.Store.findIndex(
        (item) => item.sim.id === actions.payload.sim.id
      );
      if (index !== -1) {
        if (state.Store[index].count > 1) {
          state.Store[index].count -= 1;
        } else {
          state.Store.splice(index, 1);
        }
      } else {
        return;
      }
    },
    Delete_Sim_Success: (state, actions: PayloadAction<any>) => {
      const index = state.Store.findIndex(
        (item) => item.sim.id === actions.payload.sim.id
      );
      if (index !== -1) {
        console.log(index);
        state.Store.splice(index, 1);
      } else {
        return;
      }
    },
    Clear_Store_Success: (state, actions: PayloadAction<any>) => {
      state.Store = [];
    },
    //Reload
    Reload_Categorys_Success: (state, actions: PayloadAction<any>) => {
      state.Categorys = actions.payload;
    },
    Reload_Productions_Success: (state, actions: PayloadAction<any>) => {
      state.Productions = actions.payload;
    },
    Reload_Sims_Success: (state, actions: PayloadAction<any>) => {
      state.Sims = actions.payload;
    },
    Reload_Banners_Success: (state, actions: PayloadAction<any>) => {
      state.Banners = actions.payload;
    },
    Reload_TravelSimShopContact_Success: (
      state,
      actions: PayloadAction<any>
    ) => {
      state.TravelSimShop_Contact = actions.payload;
    },
    Reload_Logo_Success: (state, actions: PayloadAction<any>) => {
      state.Logos = actions.payload;
    },
  },
});

export const {
  Load_Data_Pl_Success,
  Choose_Sim_Success,
  Add_Sim_Success,
  Remove_Sim_Success,
  Delete_Sim_Success,
  Clear_Store_Success,
  //Reload
  Reload_Categorys_Success,
  Reload_Productions_Success,
  Reload_Sims_Success,
  Reload_Banners_Success,
  Reload_TravelSimShopContact_Success,
  Reload_Logo_Success,
} = DataPublicSlice.actions;

export const DataPublicSelector = {
  Banners: (state: RootState) => state.DataPublic.Banners,
  Categorys: (state: RootState) => state.DataPublic.Categorys,
  Productions: (state: RootState) => state.DataPublic.Productions,
  Sims: (state: RootState) => state.DataPublic.Sims,
  Hot_Sims: (state: RootState) => state.DataPublic.Hot_Sim,
  Reviews: (state: RootState) => state.DataPublic.Reviews,
  Store: (state: RootState) => state.DataPublic.Store,
  Logos: (state: RootState) => state.DataPublic.Logos,
  TravelSimShopContact: (state: RootState) =>
    state.DataPublic.TravelSimShop_Contact,
};

export default DataPublicSlice;
