export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  emoji: string;
  categoryId: number;
  category?: Category;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  emoji: string;
  qty: number;
}
