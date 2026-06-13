import apiClient from './api';
import { LoginRequest, LoginResponse } from '../types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Step 1: Get bearer token from CreateTokenByKey endpoint
    const { data: token } = await apiClient.get<string>(
      '/security/CreateTokenByKey/APIKey123',
      { headers: {} }, // No auth header for this call
    );

    // Step 2: Authenticate user with the bearer token
    const { data } = await apiClient.get<LoginResponse>('/user/LoginBackend', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        username: credentials.username,
        password: credentials.password,
      },
    });

    return { ...data, token };
  },
};
