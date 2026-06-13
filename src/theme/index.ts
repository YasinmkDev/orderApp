export { colors } from './colors';
export { spacing } from './spacing';
export { typography, textStyles } from './typography';
export { borderRadius } from './borders';
export { shadows } from './shadows';
export { animations, springs, timing, skeleton, stagger } from './animations';

import { colors } from './colors';
import { spacing } from './spacing';
import { typography, textStyles } from './typography';
import { borderRadius } from './borders';
import { shadows } from './shadows';
import { animations, springs, timing, skeleton, stagger } from './animations';

export const theme = {
  colors,
  spacing,
  typography,
  textStyles,
  borderRadius,
  shadows,
  animations,
  springs,
  timing,
  skeleton,
  stagger,
} as const;

export type Theme = typeof theme;

export type ColorToken = keyof typeof colors;
export type SpacingToken = keyof typeof spacing;
export type TypographyToken = keyof typeof typography;
export type BorderRadiusToken = keyof typeof borderRadius;
export type ShadowToken = keyof typeof shadows;
