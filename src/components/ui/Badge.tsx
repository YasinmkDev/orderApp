import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, borderRadius, typography } from '../../theme';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default', size = 'md' }) => {
  const getStyles = () => {
    switch (variant) {
      case 'primary': return { backgroundColor: colors.primaryLight, color: colors.primary };
      case 'success': return { backgroundColor: colors.successLight, color: colors.success };
      case 'warning': return { backgroundColor: colors.warningLight, color: colors.warning };
      case 'danger': return { backgroundColor: colors.errorLight, color: colors.error };
      default: return { backgroundColor: colors.surfaceElevated, color: colors.textSecondary };
    }
  };
  const styles = getStyles();
  const padding = {
    paddingHorizontal: size === 'sm' ? 6 : 8,
    paddingVertical: size === 'sm' ? 2 : 4,
  };
  return (
    <View style={[badgeStyles.container, { backgroundColor: styles.backgroundColor }, padding]}>
      <Text style={[badgeStyles.text, { color: styles.color }]}>{label}</Text>
    </View>
  );
};

const badgeStyles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
  },
});
