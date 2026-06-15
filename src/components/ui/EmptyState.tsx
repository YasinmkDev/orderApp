import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { colors, spacing, borderRadius } from '../../theme';
import { Text } from './Text';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => (
  <View style={styles.container}>
    <Animated.View entering={FadeIn.delay(100)} style={styles.iconContainer}>
      <View style={styles.iconBackground}>
        {icon}
      </View>
    </Animated.View>

    <Animated.View entering={FadeInDown.delay(200)}>
      <Text variant="heading" align="center" style={styles.title}>
        {title}
      </Text>

      {description && (
        <Text variant="body" color="secondary" align="center" style={styles.description}>
          {description}
        </Text>
      )}

      {action && (
        <View style={styles.actionContainer}>
          <Button
            title={action.label}
            onPress={action.onPress}
            variant="primary"
            size="lg"
          />
        </View>
      )}
    </Animated.View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['3xl'],
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
  },
  title: {
    marginBottom: spacing.sm,
  },
  description: {
    marginBottom: spacing.xl,
  },
  actionContainer: {
    minWidth: 200,
  },
});
