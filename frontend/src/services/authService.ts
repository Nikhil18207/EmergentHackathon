const API_BASE = 'http://localhost:5000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  error?: string;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: string;
  createdAt: string;
}

// Token management
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success && data.data) {
        // Store token and user
        this.setToken(data.data.token);
        this.setUser(data.data.user);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Network error. Please check your connection.',
      };
    }
  },

  // Register new user
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success && data.data) {
        // Store token and user
        this.setToken(data.data.token);
        this.setUser(data.data.user);
      }

      return data;
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        error: 'Network error. Please check your connection.',
      };
    }
  },

  // Get user profile
  async getProfile(): Promise<AuthResponse> {
    try {
      const token = this.getToken();
      if (!token) {
        return {
          success: false,
          error: 'No authentication token found',
        };
      }

      const response = await fetch(`${API_BASE}/auth/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        error: 'Network error. Please check your connection.',
      };
    }
  },

  // Logout user
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },

  // Token management
  setToken(token: string, rememberMe: boolean = true): void {
    if (rememberMe) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
    }
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },

  // User management
  setUser(user: User, rememberMe: boolean = true): void {
    const userStr = JSON.stringify(user);
    if (rememberMe) {
      localStorage.setItem(USER_KEY, userStr);
    } else {
      sessionStorage.setItem(USER_KEY, userStr);
    }
  },

  getUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

export default authService;
