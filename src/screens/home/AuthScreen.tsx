import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Text } from '../../components/ui/Text';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/auth';
import { Mail, Lock } from 'lucide-react-native';

export const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) return;
    await login({ username: username.trim(), password });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text variant="h1" weight="bold" style={styles.logo}>CIZARO</Text>
            <Text variant="h3" style={styles.welcome}>
              {isLogin ? 'Welcome back' : 'Create account'}
            </Text>
            <Text variant="body" color="secondary">
              {isLogin
                ? 'Sign in to continue ordering'
                : 'Sign up to start your journey'}
            </Text>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="your@email.com"
              value={username}
              onChangeText={(text) => { setUsername(text); clearError(); }}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Mail size={18} color={colors.textTertiary} />}
              error={error ?? undefined}
            />
            <Input
              label="Password"
              placeholder="Enter password"
              value={password}
              onChangeText={(text) => { setPassword(text); clearError(); }}
              isPassword
              leftIcon={<Lock size={18} color={colors.textTertiary} />}
            />

            <Button
              title={isLogin ? 'Sign In' : 'Create Account'}
              onPress={handleSubmit}
              loading={isLoading}
              size="lg"
              style={styles.submitButton}
            />

            <View style={styles.switchRow}>
              <Text variant="body" color="secondary">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
              </Text>
              <Text
                variant="body"
                color="primary"
                onPress={() => { setIsLogin(!isLogin); clearError(); }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    fontSize: typography.fontSizes['4xl'],
    letterSpacing: 2,
    marginBottom: spacing.lg,
  },
  welcome: {
    marginBottom: spacing.sm,
  },
  form: {
    gap: spacing.sm,
  },
  submitButton: {
    marginTop: spacing.md,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});
