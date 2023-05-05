export interface interFade_User {
  readonly id: number;
  username: string;
  password: string;
  refreshToken: string;
  avatar: string;
  email: string;
  phone: string;
}
export interface interFade_Category {
  readonly id: number;
  name: string;
}
export interface interFade_Production {
  readonly id: number;
  name: string;
  idCate: number;
  avatar: string;
  Category: interFade_Category[];
}

export interface interFade_Sim {
  readonly id: number;
  name: string;
  expiry: number;
  size_data: string;
  telco: string;
  limit: string;
  wifi_hostpot: boolean;
  call: boolean;
  size_sim: string;
  idProduct: number;
  avatar: string;
  Production: interFade_Production;
  order: number;
  inventory: number;
  selled: number;
  common: boolean;
}

export interface interFade_Review {
  readonly id: number;
  name: string;
  rating: number;
  avatar: string;
  text: string;
}
export interface interFade_Data_Admin {
  Admin: interFade_User;
  accesstoken: string;
}

export interface interFade_Data {
  Categorys: interFade_Category[];
  Productions: interFade_Production[];
  Sims: interFade_Sim[];
  Hot_Sim: interFade_Sim[];
  Reviews: interFade_Review[];
}
