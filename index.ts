export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'electronics' | 'medical' | 'perfume';
  description: string;
  rating: number;
  imageColor: string;
  image: string;
  gender?: 'men' | 'women' | 'unisex';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserInfo {
  name: string;
  address: string;
  phone: string;
  email?: string;
  notes?: string;
}