/**
 * Premium Spacing System
 * Based on 8px grid with generous whitespace
 * Promotes breathing room and premium feel
 */
export const spacing = {
  // Micro spacing
  xxxs: 2,
  xxs: 4,
  xs: 8,

  // Standard spacing
  sm: 12,
  md: 16,
  lg: 20,

  // Large spacing
  xl: 24,
  xxl: 32,
  xxxl: 48,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
  '6xl': 80,
} as const;

export type SpacingToken = keyof typeof spacing;
