import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { colors, typography, borderRadius, spacing, springs } from '../../theme';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const scale = useSharedValue(1);
  const isDisabled = disabled || loading;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, springs.snappy);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springs.snappy);
  };

  const getBackgroundColor = (): string => {
    if (isDisabled) return colors.surfaceElevated;
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.surface;
      case 'outline':
      case 'ghost':
        return 'transparent';
      case 'danger':
        return colors.error;
      default:
        return colors.primary;
    }
  };

  const getTextColor = (): string => {
    if (isDisabled) return colors.textTertiary;
    switch (variant) {
      case 'primary':
        return colors.black;
      case 'secondary':
        return colors.text;
      case 'outline':
      case 'ghost':
        return colors.text;
      case 'danger':
        return colors.white;
      default:
        return colors.black;
    }
  };

  const getSizeStyles = (): { paddingVertical: number; paddingHorizontal: number; minHeight: number } => {
    switch (size) {
      case 'sm':
        return { paddingVertical: spacing.xs, paddingHorizontal: spacing.md, minHeight: 36 };
      case 'md':
        return { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, minHeight: 44 };
      case 'lg':
        return { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, minHeight: 52 };
      case 'xl':
        return { paddingVertical: spacing.lg, paddingHorizontal: spacing['2xl'], minHeight: 60 };
      default:
        return { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, minHeight: 44 };
    }
  };

  const sizeStyles = getSizeStyles();
  const backgroundColor = getBackgroundColor();
  const textColor = getTextColor();

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[
        styles.base,
        animatedStyle,
        {
          backgroundColor,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          minHeight: sizeStyles.minHeight,
        },
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {leftIcon}
          <Text
            variant={size === 'sm' ? 'bodySmall' : size === 'xl' ? 'titleMedium' : 'body'}
            weight="semibold"
            color="primary"
            style={[{ color: textColor }, textStyle]}
          >
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  fullWidth: {
    width: '100%',
  },
});
