import { useMemo } from 'react';
import { PasswordStrength } from '../types';

interface PasswordStrengthIndicatorProps {
    password: string;
}

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
    const strength: PasswordStrength = useMemo(() => {
        let score = 0;

        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        if (score <= 1) return { score, label: 'Weak', color: 'bg-error' };
        if (score <= 3) return { score, label: 'Fair', color: 'bg-warning' };
        if (score <= 4) return { score, label: 'Good', color: 'bg-primary' };
        return { score, label: 'Strong', color: 'bg-success' };
    }, [password]);

    return (
        <div className="mt-2 space-y-2">
            <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 flex-1 rounded-full animate-spring ${index < strength.score ? strength.color : 'bg-muted'
                            }`}
                    />
                ))}
            </div>
            <p className="text-xs font-caption text-muted-foreground">
                Password strength: <span className="font-medium text-foreground">{strength.label}</span>
            </p>
        </div>
    );
};

export default PasswordStrengthIndicator;