import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { Text } from './Text';
import { colors, spacing, borderRadius, shadows, typography } from '../../theme';
import { Variant } from '../../types/api';
import AnimatedPressable from './AnimatedPressable';

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant?: string;
  onVariantSelect: (variantId: string, priceAdjustment: number) => void;
  title?: string;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onVariantSelect,
  title = 'Select Size',
}) => {
  if (!variants || variants.length === 0) return null;

  return (
    <Animated.View entering={FadeInDown.delay(200)} layout={Layout.springify()} style={styles.container}>
      <Text variant="titleMedium" weight="bold" style={styles.title}>
        {title}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
      >
        {variants.map((variant, index) => {
          const isSelected = selectedVariant === variant.id;
          const priceAdjustment = variant.priceAdjustment || 0;

          return (
            <Animated.View
              key={variant.id}
              entering={FadeInDown.delay(300 + index * 50)}
              layout={Layout.springify()}
            >
              <AnimatedPressable
                onPress={() => onVariantSelect(variant.id, priceAdjustment)}
                style={[
                  styles.variantCard,
                  isSelected && styles.variantCardSelected,
                ]}
              >
                {/* Gradient background for selected state */}
                {isSelected && <View style={styles.selectedGradientBg} />}

                {/* Icon */}
                {variant.icon && (
                  <Text variant="display" style={styles.icon}>
                    {variant.icon}
                  </Text>
                )}

                {/* Variant name */}
                <Text
                  variant="titleSmall"
                  weight="bold"
                  style={[
                    styles.variantName,
                    isSelected && styles.variantNameSelected,
                  ]}
                >
                  {variant.name}
                </Text>

                {/* Description */}
                {variant.description && (
                  <Text
                    variant="caption"
                    style={[
                      styles.variantDescription,
                      isSelected && styles.variantDescriptionSelected,
                    ]}
                  >
                    {variant.description}
                  </Text>
                )}

                {/* Price adjustment badge */}
                {priceAdjustment > 0 && (
                  <View style={styles.priceBadge}>
                    <Text variant="caption" weight="semibold" style={styles.priceText}>
                      +${priceAdjustment.toFixed(2)}
                    </Text>
                  </View>
                )}

                {/* Selection indicator dot */}
                {isSelected && <View style={styles.selectionDot} />}
              </AnimatedPressable>
            </Animated.View>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
    color: colors.text,
    fontSize: 18,
  },
  scrollContent: {
    paddingHorizontal: spacing.xs,
    gap: spacing.md,
  },
  variantCard: {
    width: 140,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.gray200,
    alignItems: 'center',
    justifyContent: 'flex-start',
    ...shadows.sm,
    position: 'relative',
    overflow: 'hidden',
  },
  variantCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  selectedGradientBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  icon: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  variantName: {
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xxs,
  },
  variantNameSelected: {
    color: colors.white,
  },
  variantDescription: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    fontSize: 11,
  },
  variantDescriptionSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  priceBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.full,
    marginBottom: spacing.xs,
  },
  priceText: {
    color: colors.white,
    fontSize: 10,
  },
  selectionDot: {
    width: 10,
    height: 10,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: spacing.xs,
    right: spacing.xs,
  },
});
