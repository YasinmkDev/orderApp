import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginRequest, Customer } from '../types';
import { mockCustomer } from '../data/mockData';

const USE_MOCK = true;

interface AuthState {
  token: string | null;
  userId: string | null;
  customer: Customer | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  fetchCustomer: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: USE_MOCK ? 'mock-token' : null,
      userId: USE_MOCK ? 'demo-user' : null,
      customer: USE_MOCK ? mockCustomer : null,
      isLoading: false,
      error: null,

      login: async (credentials: LoginRequest) => {
        if (USE_MOCK) {
          set({ token: 'mock-token', userId: 'demo-user', customer: mockCustomer, isLoading: false, error: null });
          return;
        }
        set({ isLoading: true, error: null });
        try {
          const { authService } = await import('../services/auth');
          const response = await authService.login(credentials);
          set({ token: response.token, userId: response.id || credentials.username, isLoading: false });
          await get().fetchCustomer();
        } catch (err: any) {
          const message = err?.response?.data?.message || err?.message || 'Invalid credentials. Please try again.';
          set({ error: message, isLoading: false });
        }
      },

      logout: () => {
        set({ token: null, userId: null, customer: null, error: null });
      },

      fetchCustomer: async () => {
        if (USE_MOCK) {
          set({ customer: mockCustomer });
          return;
        }
        const { userId } = get();
        if (!userId) return;
        try {
          const { customersService } = await import('../services/customers');
          const customer = await customersService.getById(userId);
          set({ customer });
        } catch {
          // Silently fail - customer data is non-critical at login
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ token: state.token, userId: state.userId }),
    },
  ),
);
