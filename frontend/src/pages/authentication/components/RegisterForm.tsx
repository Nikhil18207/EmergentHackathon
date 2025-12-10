import { Dispatch, SetStateAction } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import { AuthFormData, AuthFormErrors } from '../types';

interface RegisterFormProps {
    formData: AuthFormData;
    errors: AuthFormErrors;
    isLoading: boolean;
    setFormData: Dispatch<SetStateAction<AuthFormData>>;
    onSubmit: (e: React.FormEvent) => void;
}

const RegisterForm = ({ formData, errors, isLoading, setFormData, onSubmit }: RegisterFormProps) => {
    const roleOptions = [
        { value: 'creator', label: 'Fashion Creator', description: 'Design and launch fashion products' },
        { value: 'influencer', label: 'Influencer', description: 'Monetize your fashion sense' },
        { value: 'designer', label: 'Designer', description: 'Professional fashion designer' },
        { value: 'entrepreneur', label: 'Entrepreneur', description: 'Build your fashion brand' }
    ];

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <Input
                type="text"
                label="Display Name"
                placeholder="Your creative name"
                value={formData.displayName || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                error={errors.displayName}
                required
                disabled={isLoading}
            />

            <Input
                type="email"
                label="Email Address"
                placeholder="creator@virtualtwin.ai"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                error={errors.email}
                required
                disabled={isLoading}
            />

            <Select
                label="Your Role"
                placeholder="Select your role"
                options={roleOptions}
                value={formData.role || ''}
                onChange={(value) => setFormData(prev => ({ ...prev, role: value as string }))}
                error={errors.role}
                required
                disabled={isLoading}
            />

            <div>
                <Input
                    type="password"
                    label="Password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    error={errors.password}
                    required
                    disabled={isLoading}
                />
                {formData.password && <PasswordStrengthIndicator password={formData.password} />}
            </div>

            <Input
                type="password"
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                error={errors.confirmPassword}
                required
                disabled={isLoading}
            />

            {errors.general && (
                <div className="p-3 rounded-lg bg-error/10 border border-error/50">
                    <p className="text-sm font-caption text-error">{errors.general}</p>
                </div>
            )}

            <Button
                type="submit"
                variant="default"
                fullWidth
                loading={isLoading}
                iconName="UserPlus"
                iconPosition="right"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
                Create Account
            </Button>

            <p className="text-xs font-caption text-muted-foreground text-center">
                By registering, you agree to our{' '}
                <a href="/terms" className="text-primary hover:text-primary/80 animate-spring-fast">
                    Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary hover:text-primary/80 animate-spring-fast">
                    Privacy Policy
                </a>
            </p>
        </form>
    );
};

export default RegisterForm;