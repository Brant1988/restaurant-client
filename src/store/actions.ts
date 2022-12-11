import { apiClient } from "@/http/axios.config";
import { ActionContext, ActionPayload, ActionTree } from "vuex";
import { Category, LoginForm, Product } from "../types/types";
import { MutationType } from "./mutations";
import { State } from "./state";

export enum ActionTypes {
  GET_PRODUCTS = "GET_PRODUCTS",
  GET_CATEGORIES = "GET_CATEGORIES",
  SELECT_CATEGORY = "SELECT_CATEGORY",
  REGISTER_USER = "REGISTER_USER",
  LOGIN_USER = "LOGIN_USER",
  LOGOUT = "LOGOUT",
}

export type Actions = {
  [ActionTypes.GET_PRODUCTS](
    state: ActionContext<State, State>,
    payload: string | null
  ): void;
  [ActionTypes.GET_CATEGORIES](
    state: ActionContext<State, State>,
    payload: ActionPayload
  ): void;
  [ActionTypes.SELECT_CATEGORY](
    state: ActionContext<State, State>,
    payload: string
  ): void;
  [ActionTypes.REGISTER_USER](
    state: ActionContext<State, State>,
    payload: LoginForm
  ): void;
  [ActionTypes.LOGIN_USER](
    state: ActionContext<State, State>,
    payload: LoginForm
  ): void;
  [ActionTypes.LOGOUT](state: ActionContext<State, State>): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GET_PRODUCTS]({ commit }, payload) {
    commit(MutationType.SET_LOADING, true);
    const response = await apiClient.get<Product[]>("/product", {
      params: {
        categoryId: payload,
      },
    });
    commit(MutationType.SET_PRODUCTS, response.data);
    commit(MutationType.SET_LOADING, false);
  },
  async [ActionTypes.GET_CATEGORIES]({ commit }) {
    commit(MutationType.SET_LOADING, true);
    const response = await apiClient.get<Category[]>(`/category/`);
    commit(MutationType.SET_CATEGORIES, response.data);
    commit(MutationType.SET_LOADING, false);
  },
  async [ActionTypes.REGISTER_USER]({ commit }, loginForm) {
    try {
      const response = await apiClient.post("/register", {
        email: loginForm.email,
        password: loginForm.password,
      });
      commit(MutationType.REGISTER_USER, response.data.token);
    } catch (error: any) {
      commit(MutationType.REGISTER_USER, error.response.data.message);
    }
  },
  async [ActionTypes.LOGIN_USER]({ commit }, loginForm) {
    try {
      const response = await apiClient.post("/login", {
        email: loginForm.email,
        password: loginForm.password,
      });

      commit(MutationType.LOGIN_USER, response.data.token);
    } catch (error: any) {
      commit(MutationType.LOGIN_USER, error.response.data.message);
    }
  },
  [ActionTypes.LOGOUT]({ commit }) {
    commit(MutationType.LOGOUT);
  },
  [ActionTypes.SELECT_CATEGORY]({ commit }, value) {
    commit(MutationType.SELECT_CATEGORY, value);
  },
};
