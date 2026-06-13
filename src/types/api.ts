export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  token: string;
  expiration?: string;
}

export interface LoginResponse {
  id?: string;
  name?: string;
  email?: string;
  token: string;
  expiration?: string;
}

export interface Item {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId?: string;
  categoryName?: string;
  branchId?: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
  sku?: string;
  unit?: string;
  // Food-specific fields
  restaurantName?: string;
  shortDescription?: string;
  dietaryTags?: ('vegan' | 'vegetarian' | 'spicy' | 'glutenFree')[];
  deliveryTime?: number; // in minutes
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
  branchId?: string;
  itemCount?: number;
}

export interface CartItem {
  item: Item;
  quantity: number;
}

export interface SaleOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
  lines: SaleOrderLine[];
  paymentStatus?: string;
  deliveryAddress?: CustomerAddress;
}

export interface SaleOrderLine {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  price: number;
  total: number;
  image?: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
}

export interface CustomerAddress {
  id: string;
  label: string;
  address: string;
  city: string;
  state?: string;
  zipCode?: string;
  isDefault?: boolean;
  branchId?: string;
}

export interface PaymentType {
  id: string;
  name: string;
  description?: string;
  isCash?: boolean;
  isCard?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrderAmount?: number;
  validFrom?: string;
  validTo?: string;
  isActive: boolean;
}

export interface Price {
  id: string;
  name: string;
  amount: number;
  itemId?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
