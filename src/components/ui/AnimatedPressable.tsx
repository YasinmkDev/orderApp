import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { springs } from '../../theme';

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

interface AnimatedPressableProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  activeScale?: number;
  children?: React.ReactNode;
}

const AnimatedPressable = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  AnimatedPressableProps
>(({ onPressIn, onPressOut, activeScale = 0.96, style, children, ...rest }, ref) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (e: Parameters<NonNullable<PressableProps['onPressIn']>>[0]) => {
    scale.value = withSpring(activeScale, springs.snappy);
    onPressIn?.(e);
  };

  const handlePressOut = (e: Parameters<NonNullable<PressableProps['onPressOut']>>[0]) => {
    scale.value = withSpring(1, springs.bouncy);
    onPressOut?.(e);
  };

  return (
    <AnimatedPressableBase
      ref={ref}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, style as any]}
      {...rest}
    >
      {children}
    </AnimatedPressableBase>
  );
});

AnimatedPressable.displayName = 'AnimatedPressable';

export default AnimatedPressable;
