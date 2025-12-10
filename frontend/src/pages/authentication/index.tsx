import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToast } from '../../hooks/useToast';
import { ToastContainer } from '../../components/ui/Toast';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import WalletProviders from './components/WalletProviders';
import { AuthFormData, AuthFormErrors, WalletProvider, ValidationRule } from './types';

const Authentication = () => {
    const navigate = useNavigate();
    const { messages, closeToast, success, error } = useToast();

    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [isWalletConnecting, setIsWalletConnecting] = useState(false);
    const [formData, setFormData] = useState<AuthFormData>({
        email: '',
        password: '',
        confirmPassword: '',
        displayName: '',
        role: '',
        rememberMe: false
    });
    const [errors, setErrors] = useState<AuthFormErrors>({});

    const walletProviders: WalletProvider[] = [
        {
            id: 'metamask',
            name: 'MetaMask',
            icon: 'Wallet',
            description: 'Connect with MetaMask wallet'
        },
        {
            id: 'walletconnect',
            name: 'WalletConnect',
            icon: 'Link',
            description: 'Connect with WalletConnect'
        }
    ];

    const mockCredentials = {
        email: 'creator@virtualtwin.ai',
        password: 'Fashion2024!'
    };

    const validateEmail = (email: string): string | undefined => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'Email is required';
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return undefined;
    };

    const validatePassword = (password: string): string | undefined => {
        const rules: ValidationRule[] = [
            { test: (p) => p.length >= 8, message: 'Password must be at least 8 characters' },
            { test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p), message: 'Password must contain uppercase and lowercase letters' },
            { test: (p) => /\d/.test(p), message: 'Password must contain at least one number' },
            { test: (p) => /[^a-zA-Z0-9]/.test(p), message: 'Password must contain at least one special character' }
        ];

        if (!password) return 'Password is required';

        for (const rule of rules) {
            if (!rule.test(password)) return rule.message;
        }

        return undefined;
    };

    const validateLoginForm = (): boolean => {
        const newErrors: AuthFormErrors = {};

        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateRegisterForm = (): boolean => {
        const newErrors: AuthFormErrors = {};

        if (!formData.displayName || formData.displayName.trim().length < 2) {
            newErrors.displayName = 'Display name must be at least 2 characters';
        }

        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;

        if (!formData.role) {
            newErrors.role = 'Please select your role';
        }

        const passwordError = validatePassword(formData.password);
        if (passwordError) newErrors.password = passwordError;

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateLoginForm()) return;

        setIsLoading(true);
        setErrors({});

        setTimeout(() => {
            if (
                formData.email === mockCredentials.email &&
                formData.password === mockCredentials.password
            ) {
                success('Login Successful', 'Welcome back to VirtualTwin!');
                setTimeout(() => {
                    navigate('/multi-input-selection');
                }, 1500);
            } else {
                setErrors({
                    general: `Invalid credentials. Use email: ${mockCredentials.email} and password: ${mockCredentials.password}`
                });
                error('Login Failed', 'Please check your credentials and try again');
            }
            setIsLoading(false);
        }, 1500);
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateRegisterForm()) return;

        setIsLoading(true);
        setErrors({});

        setTimeout(() => {
            success('Account Created', 'Welcome to VirtualTwin! Redirecting to onboarding...');
            setTimeout(() => {
                navigate('/multi-input-selection');
            }, 1500);
            setIsLoading(false);
        }, 2000);
    };

    const handleWalletConnect = async (providerId: string) => {
        setIsWalletConnecting(true);

        setTimeout(() => {
            success(
                'Wallet Connected',
                `Successfully connected with ${providerId === 'metamask' ? 'MetaMask' : 'WalletConnect'}`
            );
            setTimeout(() => {
                navigate('/multi-input-selection');
            }, 1500);
            setIsWalletConnecting(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    background: 'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)'
                }}
            />

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="relative">
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="drop-shadow-lg"
                                >
                                    <defs>
                                        <linearGradient id="authLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#8B5CF6" />
                                            <stop offset="100%" stopColor="#3B82F6" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="20" cy="20" r="18" fill="url(#authLogoGradient)" opacity="0.2" />
                                    <path
                                        d="M12 14L20 8L28 14V26L20 32L12 26V14Z"
                                        stroke="url(#authLogoGradient)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                    <path
                                        d="M20 8V20M20 20L12 26M20 20L28 26"
                                        stroke="url(#authLogoGradient)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <h1 className="font-heading font-bold text-2xl text-foreground">
                                VirtualTwin
                            </h1>
                        </div>
                        <p className="text-muted-foreground font-caption">
                            Transform fashion trends into reality in 3 minutes
                        </p>
                    </div>

                    <div className="glass-strong border border-border rounded-2xl shadow-primary p-6 sm:p-8">
                        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                        {activeTab === 'login' ? (
                            <LoginForm
                                formData={formData}
                                errors={errors}
                                isLoading={isLoading}
                                setFormData={setFormData}
                                onSubmit={handleLogin}
                            />
                        ) : (
                            <RegisterForm
                                formData={formData}
                                errors={errors}
                                isLoading={isLoading}
                                setFormData={setFormData}
                                onSubmit={handleRegister}
                            />
                        )}

                        <div className="mt-6">
                            <WalletProviders
                                providers={walletProviders}
                                isConnecting={isWalletConnecting}
                                onConnect={handleWalletConnect}
                            />
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm font-caption text-muted-foreground">
                            {activeTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                            <button
                                onClick={() => {
                                    setActiveTab(activeTab === 'login' ? 'register' : 'login');
                                    setErrors({});
                                    setFormData({
                                        email: '',
                                        password: '',
                                        confirmPassword: '',
                                        displayName: '',
                                        role: '',
                                        rememberMe: false
                                    });
                                }}
                                className="text-primary hover:text-primary/80 font-medium animate-spring-fast"
                            >
                                {activeTab === 'login' ? 'Register now' : 'Login here'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <ToastContainer messages={messages} onClose={closeToast} />
        </div>
    );
};

export default Authentication;