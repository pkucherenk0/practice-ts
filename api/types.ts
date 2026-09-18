// Types generated from FakeStoreAPI OpenAPI spec (components.schemas).

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartProductRef {
  id: number;
}

export interface Cart {
  id: number;
  userId: number;
  products: CartProductRef[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
