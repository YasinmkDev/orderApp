/**
 * Premium Typography System
 * Uses Inter for UI clarity, with carefully tuned sizes
 * Optimized for mobile readability and visual hierarchy
 */
export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  fontSizes: {
    // Display - Hero text
    '5xl': 48,
    '4xl': 36,
    '3xl': 28,

    // Headings
    '2xl': 24,
    xl: 20,
    lg: 18,
    md: 16,

    // Body
    sm: 14,
    xs: 12,

    // Caption/Micro
    xxs: 10,
  },
  lineHeights: {
    tight: 1.15,
    snug: 1.25,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
  },
} as const;

// Pre-built text styles for common use cases
export const textStyles = {
  // Hero / Display
  hero: {
    fontSize: typography.fontSizes['5xl'],
    fontWeight: typography.fontWeights.bold,
    lineHeight: typography.fontSizes['5xl'] * typography.lineHeights.tight,
    letterSpacing: typography.letterSpacing.tight,
  },

  // Large titles
  displayLarge: {
    fontSize: typography.fontSizes['4xl'],
    fontWeight: typography.fontWeights.bold,
    lineHeight: typography.fontSizes['4xl'] * typography.lineHeights.tight,
  },

  // Section titles
  display: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.bold,
    lineHeight: typography.fontSizes['3xl'] * typography.lineHeights.tight,
  },

  // Card/Product titles
  headingLarge: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.semibold,
    lineHeight: typography.fontSizes['2xl'] * typography.lineHeights.snug,
  },

  // Section headers
  heading: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    lineHeight: typography.fontSizes.xl * typography.lineHeights.snug,
  },

  // Card titles
  titleMedium: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.medium,
    lineHeight: typography.fontSizes.lg * typography.lineHeights.normal,
  },

  // Body text
  bodyLarge: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.regular,
    lineHeight: typography.fontSizes.md * typography.lineHeights.relaxed,
  },

  body: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.regular,
    lineHeight: typography.fontSizes.sm * typography.lineHeights.relaxed,
  },

  bodySmall: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.regular,
    lineHeight: typography.fontSizes.xs * typography.lineHeights.normal,
  },

  // Labels and captions
  label: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    lineHeight: typography.fontSizes.sm * typography.lineHeights.normal,
    textTransform: 'uppercase' as const,
    letterSpacing: typography.letterSpacing.wide,
  },

  caption: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.regular,
    lineHeight: typography.fontSizes.xs * typography.lineHeights.normal,
  },

  captionSmall: {
    fontSize: typography.fontSizes.xxs,
    fontWeight: typography.fontWeights.medium,
    lineHeight: typography.fontSizes.xxs * typography.lineHeights.normal,
    letterSpacing: typography.letterSpacing.wide,
  },

  // Price styling
  priceLarge: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    lineHeight: typography.fontSizes['2xl'] * typography.lineHeights.tight,
  },

  price: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    lineHeight: typography.fontSizes.lg * typography.lineHeights.tight,
  },

  priceSmall: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.medium,
    lineHeight: typography.fontSizes.md * typography.lineHeights.tight,
  },
} as const;
