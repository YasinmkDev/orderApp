import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';
import { HomeScreen, CategoryScreen } from '../screens/home';
import { ProductDetailScreen } from '../screens/product/ProductDetailScreen';
import { SearchScreen } from '../screens/home/SearchScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="CategoryDetail" component={CategoryScreen} />
  </Stack.Navigator>
);
