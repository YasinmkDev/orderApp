import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';
import { Text } from './Text';
import { VariantSelector } from './VariantSelector';
import { ModifierSelector } from './ModifierSelector';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import { Variant, ModifierGroup } from '../../types/api';

interface CustomizationPanelProps {
  variants?: Variant[];
  modifierGroups?: ModifierGroup[];
  basePrice: number;
  onCustomizationChange?: (customization: CustomizationState) => void;
}

export interface CustomizationState {
  selectedVariantId?: string;
  variantPriceAdjustment: number;
  selectedModifiers: { [modifierId: string]: boolean };
  totalModifierPrice: number;
  totalPrice: number;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  variants,
  modifierGroups,
  basePrice,
  onCustomizationChange,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    variants?.find(v => v.isDefault)?.id || variants?.[0]?.id
  );
  const [variantPriceAdjustment, setVariantPriceAdjustment] = useState(
    variants?.find(v => v.isDefault || v.id === selectedVariant)?.priceAdjustment || 0
  );
  const [selectedModifiers, setSelectedModifiers] = useState<{ [modifierId: string]: boolean }>({});
  const [totalModifierPrice, setTotalModifierPrice] = useState(0);

  const totalPrice = basePrice + variantPriceAdjustment + totalModifierPrice;

  const handleVariantSelect = (variantId: string, priceAdjustment: number) => {
    setSelectedVariant(variantId);
    setVariantPriceAdjustment(priceAdjustment);

    const newState: CustomizationState = {
      selectedVariantId: variantId,
      variantPriceAdjustment: priceAdjustment,
      selectedModifiers,
      totalModifierPrice,
      totalPrice: basePrice + priceAdjustment + totalModifierPrice,
    };
    onCustomizationChange?.(newState);
  };

  const handleModifierToggle = (modifierId: string, isSelected: boolean, price: number) => {
    const updatedModifiers = { ...selectedModifiers };

    if (isSelected) {
      updatedModifiers[modifierId] = true;
      setTotalModifierPrice(totalModifierPrice + price);
    } else {
      delete updatedModifiers[modifierId];
      setTotalModifierPrice(totalModifierPrice - price);
    }

    setSelectedModifiers(updatedModifiers);

    const newState: CustomizationState = {
      selectedVariantId: selectedVariant,
      variantPriceAdjustment,
      selectedModifiers: updatedModifiers,
      totalModifierPrice: isSelected ? totalModifierPrice + price : totalModifierPrice - price,
      totalPrice: basePrice + variantPriceAdjustment + (isSelected ? totalModifierPrice + price : totalModifierPrice - price),
    };
    onCustomizationChange?.(newState);
  };

  // Check if there are any customizations available
  const hasVariants = variants && variants.length > 0;
  const hasModifiers = modifierGroups && modifierGroups.length > 0;

  if (!hasVariants && !hasModifiers) return null;

  return (
    <Animated.View entering={FadeIn.delay(500)} layout={Layout.springify()} style={styles.container}>
      {/* Header with juicy design */}
      <View style={styles.headerGradient}>
        <Text variant="heading" weight="bold" style={styles.headerTitle}>
          Customize Your Order
        </Text>
        <Text variant="body" style={styles.headerSubtitle}>
          Make it exactly how you like it
        </Text>
      </View>

      {/* Customization content */}
      <View style={styles.content}>
        {/* Variants Section */}
        {hasVariants && (
          <VariantSelector
            variants={variants!}
            selectedVariant={selectedVariant}
            onVariantSelect={handleVariantSelect}
            title="Choose Your Size"
          />
        )}

        {/* Modifiers Section */}
        {hasModifiers && (
          <ModifierSelector
            modifierGroups={modifierGroups!}
            selectedModifiers={selectedModifiers}
            onModifierToggle={handleModifierToggle}
          />
        )}
      </View>

      {/* Price Summary Card */}
      <View style={styles.priceCard}>
        <View style={styles.priceRow}>
          <Text variant="body" style={styles.priceLabel}>
            Base Price
          </Text>
          <Text variant="body" weight="semibold" style={styles.priceValue}>
            ${basePrice.toFixed(2)}
          </Text>
        </View>

        {variantPriceAdjustment > 0 && (
          <View style={styles.priceRow}>
            <Text variant="body" style={styles.priceLabel}>
              Size Adjustment
            </Text>
            <Text variant="body" weight="semibold" style={styles.priceValue}>
              +${variantPriceAdjustment.toFixed(2)}
            </Text>
          </View>
        )}

        {totalModifierPrice > 0 && (
          <View style={styles.priceRow}>
            <Text variant="body" style={styles.priceLabel}>
              Extras
            </Text>
            <Text variant="body" weight="semibold" style={styles.priceValue}>
              +${totalModifierPrice.toFixed(2)}
            </Text>
          </View>
        )}

        {/* Divider */}
        {(variantPriceAdjustment > 0 || totalModifierPrice > 0) && (
          <View style={styles.divider} />
        )}

        {/* Total */}
        <View style={[styles.priceRow, styles.totalRow]}>
          <Text variant="titleMedium" weight="bold" style={styles.totalLabel}>
            Total
          </Text>
          <Text variant="headingLarge" weight="bold" style={styles.totalPrice}>
            ${totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  headerGradient: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 22,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  content: {
    // paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  priceCard: {
    // marginHorizontal: spacing.lg,
    marginBottom: 0,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    backgroundColor: 'rgba(255, 100, 50, 0.08)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  totalRow: {
    marginTop: spacing.sm,
  },
  priceLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  priceValue: {
    color: colors.text,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  totalLabel: {
    color: colors.text,
    fontSize: 16,
  },
  totalPrice: {
    color: colors.primary,
    fontSize: 24,
  },
});
