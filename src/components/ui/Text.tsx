import React from 'react';
import { Text as RNText, StyleSheet, TextStyle, TextProps as RNTextProps } from 'react-native';
import { colors, typography } from '../../theme';

type TextVariant =
  | 'hero'
  | 'displayLarge'
  | 'display'
  | 'headingLarge'
  | 'heading'
  | 'titleMedium'
  | 'bodyLarge'
  | 'body'
  | 'bodySmall'
  | 'label'
  | 'caption'
  | 'captionSmall'
  | 'captionMedium'
  | 'priceLarge'
  | 'price'
  | 'priceSmall'
  // Legacy variants for backward compatibility
  | 'h1'
  | 'h2'
  | 'h3';

type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'
  | 'danger'
  | 'info';

type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  weight?: TextWeight;
  align?: 'left' | 'center' | 'right' | 'auto' | 'justify';
  children: React.ReactNode;
}

const getStyleForVariant = (variant: TextVariant): TextStyle => {
  const sizes = typography.fontSizes;
  const weights = typography.fontWeights;
  const heights = typography.lineHeights;

  const variants: Record<TextVariant, TextStyle> = {
    hero: {
      fontSize: sizes['5xl'],
      fontWeight: weights.bold,
      lineHeight: sizes['5xl'] * heights.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    displayLarge: {
      fontSize: sizes['4xl'],
      fontWeight: weights.bold,
      lineHeight: sizes['4xl'] * heights.tight,
    },
    display: {
      fontSize: sizes['3xl'],
      fontWeight: weights.bold,
      lineHeight: sizes['3xl'] * heights.tight,
    },
    headingLarge: {
      fontSize: sizes['2xl'],
      fontWeight: weights.semibold,
      lineHeight: sizes['2xl'] * heights.snug,
    },
    heading: {
      fontSize: sizes.xl,
      fontWeight: weights.semibold,
      lineHeight: sizes.xl * heights.snug,
    },
    titleMedium: {
      fontSize: sizes.lg,
      fontWeight: weights.medium,
      lineHeight: sizes.lg * heights.normal,
    },
    bodyLarge: {
      fontSize: sizes.md,
      fontWeight: weights.regular,
      lineHeight: sizes.md * heights.relaxed,
    },
    body: {
      fontSize: sizes.sm,
      fontWeight: weights.regular,
      lineHeight: sizes.sm * heights.relaxed,
    },
    bodySmall: {
      fontSize: sizes.xs,
      fontWeight: weights.regular,
      lineHeight: sizes.xs * heights.normal,
    },
    label: {
      fontSize: sizes.xs,
      fontWeight: weights.medium,
      lineHeight: sizes.xs * heights.normal,
      textTransform: 'uppercase',
      letterSpacing: typography.letterSpacing.wide,
    },
    caption: {
      fontSize: sizes.xs,
      fontWeight: weights.regular,
      lineHeight: sizes.xs * heights.normal,
    },
    captionSmall: {
      fontSize: sizes.xxs,
      fontWeight: weights.medium,
      lineHeight: sizes.xxs * heights.normal,
      letterSpacing: typography.letterSpacing.wide,
    },
    captionMedium: {
      fontSize: sizes.sm,
      fontWeight: weights.medium,
      lineHeight: sizes.sm * heights.normal,
    },
    priceLarge: {
      fontSize: sizes['2xl'],
      fontWeight: weights.bold,
      lineHeight: sizes['2xl'] * heights.tight,
    },
    price: {
      fontSize: sizes.lg,
      fontWeight: weights.semibold,
      lineHeight: sizes.lg * heights.tight,
    },
    priceSmall: {
      fontSize: sizes.md,
      fontWeight: weights.medium,
      lineHeight: sizes.md * heights.tight,
    },
    // Legacy variants
    h1: {
      fontSize: sizes['3xl'],
      fontWeight: weights.bold,
      lineHeight: sizes['3xl'] * heights.tight,
    },
    h2: {
      fontSize: sizes['2xl'],
      fontWeight: weights.bold,
      lineHeight: sizes['2xl'] * heights.snug,
    },
    h3: {
      fontSize: sizes.xl,
      fontWeight: weights.semibold,
      lineHeight: sizes.xl * heights.snug,
    },
  };

  return variants[variant];
};

const getColorValue = (color: TextColor): string => {
  const colorMap: Record<TextColor, string> = {
    primary: colors.text,
    secondary: colors.textSecondary,
    tertiary: colors.textTertiary,
    quaternary: colors.textQuaternary,
    brand: colors.primary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    danger: colors.error,
    info: colors.info,
  };
  return colorMap[color];
};

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  weight,
  align,
  style,
  children,
  numberOfLines,
  ellipsizeMode,
  ...props
}) => {
  const baseStyle = getStyleForVariant(variant);
  const colorValue = getColorValue(color);

  const textStyle: TextStyle = {
    ...baseStyle,
    color: colorValue,
    ...(weight && { fontWeight: typography.fontWeights[weight] }),
    ...(align && { textAlign: align }),
  };

  return (
    <RNText
      style={[textStyle, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...props}
    >
      {children}
    </RNText>
  );
};
