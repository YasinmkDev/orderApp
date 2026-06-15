import React from 'react';
import { View, Text } from 'react-native';

type DietaryTag = 'vegan' | 'vegetarian' | 'spicy' | 'glutenFree';

interface DietaryBadgeProps {
  tags: DietaryTag[];
  size?: 'sm' | 'md';
}

const dietaryConfig: Record<
  DietaryTag,
  {
    label: string;
    icon: string;
    bgColor: string;
    textColor: string;
  }
> = {
  vegan: {
    label: 'Vegan',
    icon: '🌱',
    bgColor: '#10B981',
    textColor: '#FFFFFF',
  },
  vegetarian: {
    label: 'Vegetarian',
    icon: '🥗',
    bgColor: '#22C55E',
    textColor: '#FFFFFF',
  },
  spicy: {
    label: 'Spicy',
    icon: '🌶️',
    bgColor: '#F97316',
    textColor: '#FFFFFF',
  },
  glutenFree: {
    label: 'GF',
    icon: '🛜',
    bgColor: '#3B82F6',
    textColor: '#FFFFFF',
  },
};

export const DietaryBadge: React.FC<DietaryBadgeProps> = ({
  tags,
  size = 'md',
}) => {
  if (!tags || tags.length === 0) return null;

  const sizeStyles = {
    sm: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      fontSize: 11,
    },
    md: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      fontSize: 13,
    },
  };

  const selectedSize = sizeStyles[size];

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 6,
        flexWrap: 'wrap',
      }}
    >
      {tags.map((tag) => {
        const config = dietaryConfig[tag];
        return (
          <View
            key={tag}
            style={{
              backgroundColor: config.bgColor,
              borderRadius: 6,
              paddingHorizontal: selectedSize.paddingHorizontal,
              paddingVertical: selectedSize.paddingVertical,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Text
              style={{
                fontSize: selectedSize.fontSize,
                color: config.textColor,
                fontWeight: '600',
              }}
            >
              {config.icon} {config.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
