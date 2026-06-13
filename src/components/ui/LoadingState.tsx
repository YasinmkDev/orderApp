import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius } from '../../theme';
import { Text } from './Text';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

// Loading dot component with animation
const LoadingDot: React.FC<{ delay: number }> = ({ delay }) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withDelay(delay, withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(0.3, { duration: 400 })
      )),
      -1,
      false
    );
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.dot,
        animatedStyle,
      ]}
    />
  );
};

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading...',
  fullScreen = false,
}) => (
  <Animated.View
    entering={FadeIn}
    style={[styles.container, fullScreen && styles.fullScreen]}
  >
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
      <View style={styles.loadingDots}>
        <LoadingDot delay={0} />
        <LoadingDot delay={100} />
        <LoadingDot delay={200} />
      </View>
    </View>
    {message && (
      <Animated.View entering={FadeInDown.delay(200)}>
        <Text variant="body" color="secondary" align="center" style={styles.message}>
          {message}
        </Text>
      </Animated.View>
    )}
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['5xl'],
  },
  fullScreen: {
    flex: 1,
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
  },
  message: {
    marginTop: spacing.md,
  },
});
