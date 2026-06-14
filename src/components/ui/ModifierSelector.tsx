import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { Text } from './Text';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import { ModifierGroup, Modifier } from '../../types/api';
import AnimatedPressable from './AnimatedPressable';

interface ModifierSelectorProps {
  modifierGroups: ModifierGroup[];
  selectedModifiers: { [modifierId: string]: boolean };
  onModifierToggle: (modifierId: string, isSelected: boolean, price: number) => void;
}

export const ModifierSelector: React.FC<ModifierSelectorProps> = ({
  modifierGroups,
  selectedModifiers,
  onModifierToggle,
}) => {
  if (!modifierGroups || modifierGroups.length === 0) return null;

  return (
    <Animated.View entering={FadeInDown.delay(300)} layout={Layout.springify()} style={styles.container}>
      <Text variant="titleMedium" weight="bold" style={styles.mainTitle}>
        Add Extras (Optional)
      </Text>

      {modifierGroups.map((group, groupIndex) => (
        <Animated.View
          key={group.id}
          entering={FadeInDown.delay(400 + groupIndex * 100)}
          layout={Layout.springify()}
          style={styles.groupContainer}
        >
          <Text variant="titleSmall" weight="semibold" style={styles.groupTitle}>
            {group.name}
            {group.isRequired && <Text style={styles.required}> *</Text>}
          </Text>

          {group.modifiers.map((modifier, modifierIndex) => {
            const isSelected = selectedModifiers[modifier.id] || false;

            return (
              <Animated.View
                key={modifier.id}
                entering={FadeInDown.delay(450 + groupIndex * 100 + modifierIndex * 30)}
                layout={Layout.springify()}
              >
                <AnimatedPressable
                  onPress={() => onModifierToggle(modifier.id, !isSelected, modifier.price)}
                  style={[
                    styles.modifierItem,
                    isSelected && styles.modifierItemSelected,
                  ]}
                >
                  {/* Icon */}
                  {modifier.icon && (
                    <Text variant="body" style={styles.modifierIcon}>
                      {modifier.icon}
                    </Text>
                  )}

                  {/* Content */}
                  <View style={styles.modifierContent}>
                    <Text
                      variant="body"
                      weight="semibold"
                      style={[
                        styles.modifierName,
                        isSelected && styles.modifierNameSelected,
                      ]}
                    >
                      {modifier.name}
                    </Text>
                  </View>

                  {/* Price */}
                  <Text
                    variant="body"
                    weight="semibold"
                    style={[
                      styles.modifierPrice,
                      isSelected && styles.modifierPriceSelected,
                    ]}
                  >
                    +${modifier.price.toFixed(2)}
                  </Text>

                  {/* Checkbox */}
                  <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                    {isSelected && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </AnimatedPressable>
              </Animated.View>
            );
          })}
        </Animated.View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  mainTitle: {
    marginBottom: spacing.md,
    color: colors.text,
    fontSize: 18,
  },
  groupContainer: {
    marginBottom: spacing.lg,
  },
  groupTitle: {
    color: colors.text,
    marginBottom: spacing.md,
    fontSize: 16,
  },
  required: {
    color: colors.primary,
  },
  modifierItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.gray200,
    ...shadows.sm,
  },
  modifierItemSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(255, 100, 50, 0.05)',
  },
  modifierIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  modifierContent: {
    flex: 1,
  },
  modifierName: {
    color: colors.text,
    fontSize: 15,
  },
  modifierNameSelected: {
    color: colors.primary,
  },
  modifierPrice: {
    color: colors.textSecondary,
    marginRight: spacing.md,
    fontSize: 14,
    fontWeight: '600',
  },
  modifierPriceSelected: {
    color: colors.primary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.gray300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
