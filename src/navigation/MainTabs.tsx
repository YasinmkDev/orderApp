import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { TabParamList } from './types';
import { HomeStack } from './HomeStack';
import { CartStack } from './CartStack';
import { OrdersStack } from './OrdersStack';
import { ProfileStack } from './ProfileStack';
import { TabBarIcon } from './TabBarIcon';
import { useCartStore } from '../store/cart';
import { Badge } from '../components/ui/Badge';

const Tab = createBottomTabNavigator<TabParamList>();

export const MainTabs: React.FC = () => {
  const itemCount = useCartStore(s => s.getItemCount());

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon name="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStack}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ focused }) => <TabBarIcon name="Orders" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ focused }) => (
            <View>
              <TabBarIcon name="Cart" focused={focused} />
              {itemCount > 0 && (
                <View style={styles.cartBadge}>
                  <Badge label={String(itemCount)} variant="danger" size="sm" />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon name="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
    height: 64,
    paddingBottom: 8,
    paddingTop: 4,
  },
  tabLabel: {
    fontSize: theme.typography.fontSizes.xs,
    fontWeight: theme.typography.fontWeights.medium,
    marginTop: -2,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -12,
  },
});
