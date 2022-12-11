import { Product, User } from "@/types/types";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  getSelectedCategory(state: State): string;
  getIsloading(state: State): boolean;
  getProducts(state: State): Product[];
  getUser(state: State): User | null;
  getErrorMsg(state: State): string | null;
};

export const getters: GetterTree<State, State> & Getters = {
  getSelectedCategory(state) {
    return state.selectedCategory;
  },
  getIsloading(state: State) {
    return state.isLoading;
  },
  getProducts(state: State) {
    return state.products;
  },
  getUser(state: State) {
    if (state.user) return state.user;
    return null;
  },
  getErrorMsg(state: State) {
    if (state.errorMsg) return state.errorMsg;
    return null;
  },
};
