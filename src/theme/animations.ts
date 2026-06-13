/**
 * Animation Presets for Premium Micro-interactions
 * Used with react-native-reanimated for smooth 60fps animations
 */

// Timing curves
export const timing = {
  instant: 50,
  fast: 150,
  normal: 250,
  slow: 400,
  slower: 600,
} as const;

// Spring configs for natural feel
export const springs = {
  // Quick, snappy response
  snappy: {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
  },
  // Default smooth
  smooth: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  // Bouncy, playful
  bouncy: {
    damping: 12,
    stiffness: 180,
    mass: 0.9,
  },
  // Gentle, floaty
  gentle: {
    damping: 20,
    stiffness: 100,
    mass: 1.2,
  },
} as const;

// Common animation patterns
export const animations = {
  // Scale animations
  scale: {
    pressIn: 0.95,
    pressOut: 1,
    hover: 1.02,
    active: 1.05,
    pop: 1.15,
  },

  // Opacity animations
  opacity: {
    hidden: 0,
    visible: 1,
    disabled: 0.4,
    secondary: 0.6,
    overlay: 0.7,
  },

  // Position offsets
  offset: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
  },

  // Rotation
  rotation: {
    none: '0deg',
    slight: '3deg',
    moderate: '10deg',
    half: '180deg',
    full: '360deg',
  },
} as const;

// Skeleton animation config
export const skeleton = {
  duration: 1200,
  baseOpacity: 0.1,
  highlightOpacity: 0.3,
} as const;

// Stagger delays for list animations
export const stagger = {
  fast: 30,
  normal: 50,
  slow: 80,
} as const;
