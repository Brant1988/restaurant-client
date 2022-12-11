export type Product = {
  id: number;
  name: string;
  img: string;
  description: string;
  price: string;
  categoryId: number | null;
};

export type ProductForm = {
  file: string | Blob;
  name: string;
  description: string;
  price: string;
  category: {
    id: string;
    name: string;
  };
};

export type ProductDelete = {
  id: number | null;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};

export type CategoryForm = {
  id: string;
  name: string;
};

export type User = {
  id: number | null;
  email: string;
  role: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type ErrorMsg = {
  status: number;
  message: string;
};
