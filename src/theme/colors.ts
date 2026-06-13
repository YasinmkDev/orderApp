/**
 * Premium Color Palette
 * Designed for food delivery / e-commerce apps
 * Warm, appetizing colors with excellent contrast ratios
 */
export const colors = {
  // Core backgrounds - deep, luxurious dark theme
  background: '#0A0A0F',
  backgroundAlternate: '#12121A',
  surface: '#18181F',
  surfaceElevated: '#1E1E28',
  surfaceHighest: '#242432',

  // Primary - Rich amber gold (trust, premium, appetite)
  primary: '#F5A623',
  primaryLight: 'rgba(245, 166, 35, 0.15)',
  primaryMedium: 'rgba(245, 166, 35, 0.3)',
  primaryDark: '#C78510',

  // Secondary - Warm terracotta (energy, appetite)
  secondary: '#E86F4A',
  secondaryLight: 'rgba(232, 111, 74, 0.15)',

  // Accent - Soft copper glow
  accent: '#D4956A',
  accentLight: 'rgba(212, 149, 106, 0.15)',

  // Text hierarchy - carefully tuned for readability
  text: '#FAFAFA',
  textSecondary: '#A0A0B0',
  textTertiary: '#606078',
  textQuaternary: '#404058',

  // Borders - subtle depth
  border: '#2A2A3A',
  borderLight: '#3A3A4A',
  borderStrong: '#484858',

  // Overlays
  overlayLight: 'rgba(10, 10, 15, 0.5)',
  overlayMedium: 'rgba(10, 10, 15, 0.7)',
  overlayDark: 'rgba(10, 10, 15, 0.85)',
  overlay: 'rgba(0, 0, 0, 0.6)',

  // Status colors - vibrant and clear
  success: '#22C55E',
  successLight: 'rgba(34, 197, 94, 0.15)',
  successMedium: 'rgba(34, 197, 94, 0.3)',

  warning: '#F59E0B',
  warningLight: 'rgba(245, 158, 11, 0.15)',
  warningMedium: 'rgba(245, 158, 11, 0.3)',

  error: '#EF4444',
  errorLight: 'rgba(239, 68, 68, 0.15)',
  errorMedium: 'rgba(239, 68, 68, 0.3)',

  info: '#3B82F6',
  infoLight: 'rgba(59, 130, 246, 0.15)',

  // Dietary badges - food-specific colors
  vegan: '#10B981',
  veganLight: 'rgba(16, 185, 129, 0.15)',
  vegetarian: '#22C55E',
  vegetarianLight: 'rgba(34, 197, 94, 0.15)',
  spicy: '#F97316',
  spicyLight: 'rgba(249, 115, 22, 0.15)',
  glutenFree: '#3B82F6',
  glutenFreeLight: 'rgba(59, 130, 246, 0.15)',

  // Gradients - for premium effects
  gradientStart: '#F5A623',
  gradientEnd: '#E86F4A',

  // Pure colors
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorToken = keyof typeof colors;
