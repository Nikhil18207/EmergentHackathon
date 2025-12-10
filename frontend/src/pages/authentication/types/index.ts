export interface AuthFormData {
    email: string;
    password: string;
    confirmPassword?: string;
    displayName?: string;
    role?: string;
    rememberMe?: boolean;
}

export interface AuthFormErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
    displayName?: string;
    role?: string;
    general?: string;
}

export interface WalletProvider {
    id: string;
    name: string;
    icon: string;
    description: string;
}

export interface AuthState {
    isLoading: boolean;
    isWalletConnecting: boolean;
    activeTab: 'login' | 'register';
    formData: AuthFormData;
    errors: AuthFormErrors;
}

export interface ValidationRule {
    test: (value: string) => boolean;
    message: string;
}

export interface PasswordStrength {
    score: number;
    label: string;
    color: string;
}