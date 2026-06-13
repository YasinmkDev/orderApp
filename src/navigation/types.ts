import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  HomeMain: undefined;
  ProductDetail: { productId: string };
  Search: undefined;
};

export type CartStackParamList = {
  CartMain: undefined;
  Checkout: undefined;
  CheckoutConfirmation: { orderId: string };
};

export type OrdersStackParamList = {
  OrdersMain: undefined;
  OrderDetail: { orderId: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Addresses: undefined;
};

export type TabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  OrdersTab: NavigatorScreenParams<OrdersStackParamList>;
  CartTab: NavigatorScreenParams<CartStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  Auth: undefined;
};
