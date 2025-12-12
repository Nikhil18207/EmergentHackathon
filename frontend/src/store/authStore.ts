import { proxy } from 'valtio';
import authService, { User } from '../services/authService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Initialize state from stored data
const initialUser = authService.getUser();

export const authStore = proxy<AuthState>({
  user: initialUser,
  isAuthenticated: !!initialUser,
  isLoading: false,
});

// Auth actions
export const authActions = {
  setUser(user: User | null) {
    authStore.user = user;
    authStore.isAuthenticated = !!user;
  },

  setLoading(loading: boolean) {
    authStore.isLoading = loading;
  },

  logout() {
    authService.logout();
    authStore.user = null;
    authStore.isAuthenticated = false;
  },

  // Initialize auth state on app load
  async initAuth() {
    const token = authService.getToken();
    if (!token) {
      authStore.user = null;
      authStore.isAuthenticated = false;
      return;
    }

    // Verify token is still valid by fetching profile
    try {
      const response = await authService.getProfile();
      if (response.success && response.data) {
        authStore.user = response.data.user;
        authStore.isAuthenticated = true;
      } else {
        // Token is invalid, clear auth
        authService.logout();
        authStore.user = null;
        authStore.isAuthenticated = false;
      }
    } catch (error) {
      // Error verifying token, clear auth
      authService.logout();
      authStore.user = null;
      authStore.isAuthenticated = false;
    }
  },
};

export default authStore;
