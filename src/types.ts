export type Brand = 'Nike' | 'Adidas' | 'Puma';

export type Category = 
  | 'All'
  | 'Lifestyle & Terrace'
  | 'Running & Performance'
  | 'High-Tops & Basketball'
  | 'Retro Classics';

export type Gender = 'Unisex' | 'Men' | 'Women';

export interface ShoeProduct {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  gender: Gender;
  price: number;
  originalPrice?: number;
  colorway: string;
  styleCode: string;
  image: string;
  badge?: string; // e.g. "Exclusive Release", "Curator's Choice", "Limited Restock"
  description: string;
  materials: string[];
  technology: string;
  sizes: number[]; // US sizes like 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: ShoeProduct;
  selectedSize: number;
  quantity: number;
}

export interface OrderItem {
  id: string;
  name: string;
  brand: Brand;
  size: number;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'card' | 'cod' | 'apple_pay';
  estimatedDelivery: string;
  status: 'Confirmed' | 'Preparing' | 'Shipped' | 'Delivered';
}
