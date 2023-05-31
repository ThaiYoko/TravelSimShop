export interface interFade_User {
  readonly id: number;
  username: string;
  password: string;
  avatar: string;
  email: string;
  phone: string;
  lever: number;
}
export interface interFade_Category {
  id: number;
  name: string;
  url: string;
  Productions: interFade_Production[];
}
export interface interFade_Production {
  id: number;
  name: string;
  idCate: number;
  avatar: string;
  url: string;
  Category: interFade_Category[];
  Sims: interFade_Sim[];
}

export interface interFade_Sim {
  id: number;
  idProduct: number;
  url: string;
  name: string;
  total_data: number;
  price: string;
  discount: string;
  speed_data: string;
  advantage: string;
  expiry: number;
  active: boolean;
  telco: string;
  size_sim: string;
  limit: string;
  hotspot: boolean;
  call: boolean;
  surplus: string;
  use_call: string;
  use_data: string;
  use_manual: string;
  common: boolean;
  number_selled: number;
  number_order: number;
  number_inventory: number;
  Production: interFade_Production;
}

export interface interFade_Review {
  readonly id: number;
  name: string;
  rating: number;
  avatar: string;
  text: string;
}

export interface interFade_Order {
  id: number;
  name: string;
  adress: string;
  email: string;
  phone: string;
  dateline: string;
  note: string;
  bill: string;
  code_bill: string;
  fees_ship: string;
  total_vat: string;
  total_price: string;
  total: string;
  status: string;
  url_image: string;
  createdAt: string;
}
export interface interFade_Data_Admin {
  Admin: interFade_User;
  accesstoken: string;
  Orders: interFade_Order[];
  User_Count: number;
}
export interface interFade_Banner {
  id: number;
  url: string;
  filename: string;
}

export interface interFade_Store {
  sim: interFade_Sim;
  count: number;
}

export interface interFade_Logo {
  id: number;
  filename: string;
  url: string;
  name: string;
}

export interface interFade_TravelSimShop_Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  facebook: string;
  zalo: string;
  website: string;
  adress: string;
  serevices: string;
}
export interface interFade_Data {
  Banners: interFade_Banner[];
  Categorys: interFade_Category[];
  Productions: interFade_Production[];
  Sims: interFade_Sim[];
  Hot_Sim: interFade_Sim[];
  Reviews: interFade_Review[];
  Store: interFade_Store[];
  Logos: interFade_Logo[];
  TravelSimShop_Contact: interFade_TravelSimShop_Contact;
}
