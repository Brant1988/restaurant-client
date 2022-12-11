import { Category, Product, User } from "@/types/types";
import jwtDecode from "jwt-decode";
import { MutationTree } from "vuex";
import { State } from "./state";

export enum MutationType {
  SET_LOADING = "SET_LOADING",
  SELECT_CATEGORY = "SELECT_CATEGORY",
  SET_PRODUCTS = "GET_PRODUCTS",
  SET_CATEGORIES = "SET_CATEGORIES",
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
  LOGOUT = "LOGOUT",
}

export type Mutations = {
  [MutationType.SET_LOADING](state: State, value: boolean): void;
  [MutationType.SELECT_CATEGORY](state: State, value: string): void;
  [MutationType.SET_PRODUCTS](state: State, products: Product[]): void;
  [MutationType.SET_CATEGORIES](state: State, categories: Category[]): void;
  [MutationType.REGISTER_USER](state: State, data: string): void;
  [MutationType.LOGIN_USER](state: State, data: string): void;
  [MutationType.LOGOUT](state: State): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_LOADING](state, value) {
    state.isLoading = value;
  },
  [MutationType.SELECT_CATEGORY](state, value) {
    state.selectedCategory = value;
  },
  [MutationType.SET_PRODUCTS](state, products) {
    state.products = products;
  },
  [MutationType.SET_CATEGORIES](state, categories) {
    state.categories = categories;
  },
  [MutationType.REGISTER_USER](state, data) {
    try {
      const userData: User = jwtDecode(data);
      localStorage.setItem("token", data);
      state.user = userData;
      state.errorMsg = null;
    } catch (error) {
      state.errorMsg = data;
    }
  },
  [MutationType.LOGIN_USER](state, data) {
    try {
      const userData: User = jwtDecode(data);
      localStorage.setItem("token", data);
      state.user = userData;
      state.errorMsg = null;
    } catch (error) {
      state.errorMsg = data;
    }
  },
  [MutationType.LOGOUT](state) {
    state.user = null;
    localStorage.clear();
  },
};
