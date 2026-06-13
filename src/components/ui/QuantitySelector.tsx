import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius, springs } from '../../theme';
import { Text } from './Text';
import { Plus, Minus } from 'lucide-react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
  maxQuantity?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
  maxQuantity = 99,
  size = 'md',
}) => {
  const canDecrease = quantity > minQuantity;
  const canIncrease = quantity < maxQuantity;

  const decreaseScale = useSharedValue(1);
  const increaseScale = useSharedValue(1);

  const decreaseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: decreaseScale.value }],
  }));

  const increaseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: increaseScale.value }],
  }));

  const handleDecreasePressIn = () => {
    if (canDecrease) {
      decreaseScale.value = withSpring(0.9, springs.snappy);
    }
  };

  const handleDecreasePressOut = () => {
    decreaseScale.value = withSpring(1, springs.bouncy);
  };

  const handleIncreasePressIn = () => {
    if (canIncrease) {
      increaseScale.value = withSpring(0.9, springs.snappy);
    }
  };

  const handleIncreasePressOut = () => {
    increaseScale.value = withSpring(1, springs.bouncy);
  };

  const buttonSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      <AnimatedPressable
        onPress={onDecrease}
        onPressIn={handleDecreasePressIn}
        onPressOut={handleDecreasePressOut}
        disabled={!canDecrease}
        style={[
          styles.button,
          { width: buttonSize, height: buttonSize },
          !canDecrease && styles.disabled,
          decreaseAnimatedStyle,
        ]}
      >
        <Minus size={iconSize} color={canDecrease ? colors.text : colors.textTertiary} />
      </AnimatedPressable>

      <Text
        variant={size === 'sm' ? 'body' : size === 'lg' ? 'titleMedium' : 'bodyLarge'}
        weight="semibold"
        style={[styles.quantity, { minWidth: buttonSize }]}
      >
        {quantity}
      </Text>

      <AnimatedPressable
        onPress={onIncrease}
        onPressIn={handleIncreasePressIn}
        onPressOut={handleIncreasePressOut}
        disabled={!canIncrease}
        style={[
          styles.button,
          styles.buttonActive,
          { width: buttonSize, height: buttonSize },
          !canIncrease && styles.disabled,
          increaseAnimatedStyle,
        ]}
      >
        <Plus size={iconSize} color={canIncrease ? colors.black : colors.textTertiary} />
      </AnimatedPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xxs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceElevated,
  },
  buttonActive: {
    backgroundColor: colors.primary,
  },
  disabled: {
    opacity: 0.4,
  },
  quantity: {
    textAlign: 'center',
  },
});
