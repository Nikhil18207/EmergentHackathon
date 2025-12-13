import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import { AuthFormData, AuthFormErrors } from '../types';

interface LoginFormProps {
    formData: AuthFormData;
    errors: AuthFormErrors;
    isLoading: boolean;
    setFormData: Dispatch<SetStateAction<AuthFormData>>;
    onSubmit: (e: React.FormEvent) => void;
}

const LoginForm = ({ formData, errors, isLoading, setFormData, onSubmit }: LoginFormProps) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Input
                type="email"
                label="Email Address"
                placeholder="creator@trendpilot.ai"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                error={errors.email}
                required
                disabled={isLoading}
            />

            <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                error={errors.password}
                required
                disabled={isLoading}
            />

            {errors.general && (
                <div className="p-3 rounded-lg bg-error/10 border border-error/50">
                    <p className="text-sm font-caption text-error">{errors.general}</p>
                </div>
            )}

            <div className="flex items-center justify-between">
                <Checkbox
                    label="Remember me"
                    checked={formData.rememberMe || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                    disabled={isLoading}
                />
                <Link
                    to="/forgot-password"
                    className="text-sm font-caption text-primary hover:text-primary/80 animate-spring-fast"
                >
                    Forgot password?
                </Link>
            </div>

            <Button
                type="submit"
                variant="default"
                fullWidth
                loading={isLoading}
                iconName="LogIn"
                iconPosition="right"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
                Login to TrendPilot
            </Button>
        </form>
    );
};

export default LoginForm;