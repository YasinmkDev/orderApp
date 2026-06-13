import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { useAuthStore } from '../../store/auth';
import {
  User,
  MapPin,
  Package,
  CreditCard,
  Heart,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<ProfileStackParamList>;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  onPress: () => void;
  danger?: boolean;
}

interface MenuSection {
  items: MenuItem[];
}

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const customer = useAuthStore(s => s.customer);
  const logout = useAuthStore(s => s.logout);

  const menuSections: MenuSection[] = [
    {
      items: [
        {
          icon: <User size={18} color={theme.colors.textSecondary} />,
          label: 'Edit Profile',
          subtitle: 'Name, email, phone',
          onPress: () => navigation.navigate('EditProfile'),
        },
        {
          icon: <MapPin size={18} color={theme.colors.textSecondary} />,
          label: 'Addresses',
          subtitle: 'Delivery addresses',
          onPress: () => navigation.navigate('Addresses'),
        },
      ],
    },
    {
      items: [
        {
          icon: <Package size={18} color={theme.colors.textSecondary} />,
          label: 'Orders',
          subtitle: 'View order history',
          onPress: () => navigation.getParent()?.navigate('OrdersTab', { screen: 'OrdersMain' }),
        },
        {
          icon: <CreditCard size={18} color={theme.colors.textSecondary} />,
          label: 'Payment Methods',
          subtitle: 'Manage payment options',
          onPress: () => {},
        },
        {
          icon: <Heart size={18} color={theme.colors.textSecondary} />,
          label: 'Favorites',
          subtitle: 'Items you love',
          onPress: () => {},
        },
      ],
    },
    {
      items: [
        {
          icon: <Bell size={18} color={theme.colors.textSecondary} />,
          label: 'Notifications',
          onPress: () => {},
        },
        {
          icon: <HelpCircle size={18} color={theme.colors.textSecondary} />,
          label: 'Help & Support',
          onPress: () => {},
        },
      ],
    },
    {
      items: [
        {
          icon: <LogOut size={18} color={theme.colors.error} />,
          label: 'Sign Out',
          onPress: logout,
          danger: true,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Avatar name={customer?.name || 'User'} size={64} />
          <Text variant="h3" style={styles.name}>{customer?.name || 'Guest'}</Text>
          <Text variant="body" color="secondary">{customer?.email || ''}</Text>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, si) => (
          <Card key={si} padding="none" style={styles.menuSection}>
            {section.items.map((item, ii) => (
              <TouchableOpacity
                key={ii}
                style={[styles.menuItem, ii < section.items.length - 1 && styles.menuItemBorder]}
                onPress={item.onPress}
                activeOpacity={0.75}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIcon}>{item.icon}</View>
                  <View>
                    <Text
                      variant="body"
                      color={item.danger ? 'danger' : 'primary'}
                    >
                      {item.label}
                    </Text>
                    {item.subtitle && (
                      <Text variant="caption" color="secondary">{item.subtitle}</Text>
                    )}
                  </View>
                </View>
                <ChevronRight size={16} color={theme.colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </Card>
        ))}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  profileHeader: {
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
  },
  name: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  menuSection: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  menuIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomPadding: { height: 40 },
});
