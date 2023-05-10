import axios from "axios";

export const base_url = "http://localhost:3005";
// export const base_url = "https://events.travelsimshop.vn";
export const root_axios = axios.create({
  baseURL: base_url + "/api/v1",
});
