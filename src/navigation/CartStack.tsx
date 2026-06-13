import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartStackParamList } from './types';
import { CartScreen } from '../screens/cart/CartScreen';
import { CheckoutScreen } from '../screens/checkout/CheckoutScreen';
import { ConfirmationScreen } from '../screens/checkout/ConfirmationScreen';

const Stack = createNativeStackNavigator<CartStackParamList>();

export const CartStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CartMain" component={CartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} />
    <Stack.Screen name="CheckoutConfirmation" component={ConfirmationScreen} />
  </Stack.Navigator>
);
