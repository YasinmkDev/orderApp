import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { Home, ShoppingBag, ClipboardList, User } from 'lucide-react-native';

interface TabBarIconProps {
  name: string;
  focused: boolean;
}

const iconMap: Record<string, React.FC<{ size: number; color: string; strokeWidth: number }>> = {
  Home: Home,
  Orders: ClipboardList,
  Cart: ShoppingBag,
  Profile: User,
};

export const TabBarIcon: React.FC<TabBarIconProps> = ({ name, focused }) => {
  const Icon = iconMap[name];
  if (!Icon) return null;

  return (
    <View style={styles.container}>
      <Icon
        size={22}
        color={focused ? theme.colors.primary : theme.colors.textTertiary}
        strokeWidth={focused ? 2.2 : 1.8}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
