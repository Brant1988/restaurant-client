import {
  CommitOptions,
  createStore,
  DispatchOptions,
  Store as VuexStore,
} from "vuex";
import createPersistedState from "vuex-persistedstate";
import { Actions, actions } from "./actions";
import { Getters, getters } from "./getters";
import { Mutations, mutations } from "./mutations";
import { state, State } from "./state";

export const store = createStore<State>({
  state,
  mutations,
  actions,
  getters,
  plugins: [
    createPersistedState({
      paths: ["user", "categories"],
    }),
  ],
});

export const useStore = () => {
  return store as Store;
};

export type Store = Omit<
  VuexStore<State>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
