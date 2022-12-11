import { Category, Product, User } from "@/types/types";

export type State = {
  isLoading: boolean;
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  user: User | null;
  errorMsg: string | null;
};

export const state: State = {
  isLoading: false,
  products: [],
  categories: [],
  selectedCategory: "",
  user: null,
  errorMsg: null,
};
