import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors, borderRadius, typography } from '../../theme';
import { Image } from 'expo-image';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: number;
  style?: any;
}

export const Avatar: React.FC<AvatarProps> = ({ source, name, size = 40, style }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      {source ? (
        <Image source={{ uri: source }} style={[styles.image, { borderRadius: size / 2 }]} />
      ) : name ? (
        <Text style={[styles.text, { fontSize: size * 0.4 }]}>{getInitials(name)}</Text>
      ) : (
        <Text style={[styles.text, { fontSize: size * 0.4 }]}>?</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: colors.textSecondary,
    fontWeight: typography.fontWeights.semibold,
  },
});
