import { useEffect, useState } from 'react';
import Icon from './AppIcon';

interface ProgressStep {
    id: string;
    label: string;
    status: 'pending' | 'active' | 'completed' | 'error';
}

interface ProgressIndicatorProps {
    steps: ProgressStep[];
    currentStep: number;
    estimatedTime?: number;
    onCancel?: () => void;
    className?: string;
}

const ProgressIndicator = ({
    steps,
    currentStep,
    estimatedTime,
    onCancel,
    className = ''
}: ProgressIndicatorProps) => {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        if (currentStep >= 0 && currentStep < steps.length) {
            const interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [currentStep, steps.length]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getStepIcon = (status: ProgressStep['status']) => {
        switch (status) {
            case 'completed':
                return 'CheckCircle2';
            case 'active':
                return 'Loader2';
            case 'error':
                return 'XCircle';
            default:
                return 'Circle';
        }
    };

    const getStepColor = (status: ProgressStep['status']) => {
        switch (status) {
            case 'completed':
                return 'text-success';
            case 'active':
                return 'text-primary';
            case 'error':
                return 'text-error';
            default:
                return 'text-muted-foreground';
        }
    };

    const progressPercentage = ((currentStep + 1) / steps.length) * 100;

    return (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[250] px-4 ${className}`}>
            <div className="glass-strong border border-border rounded-lg shadow-primary p-6 animate-slide-in-from-top">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <Icon name="Sparkles" size={20} className="text-primary" />
                        </div>
                        <div>
                            <h3 className="font-heading font-semibold text-foreground">
                                Processing Your Design
                            </h3>
                            <p className="text-sm font-caption text-muted-foreground">
                                {steps[currentStep]?.label || 'Initializing...'}
                            </p>
                        </div>
                    </div>
                    {onCancel && (
                        <button
                            onClick={onCancel}
                            className="p-2 rounded-lg hover:bg-muted/50 animate-spring-fast"
                            aria-label="Cancel process"
                        >
                            <Icon name="X" size={20} className="text-muted-foreground" />
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full animate-spring"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="font-caption text-muted-foreground">
                            Step {currentStep + 1} of {steps.length}
                        </span>
                        <div className="flex items-center gap-4">
                            {estimatedTime && (
                                <span className="font-data text-muted-foreground">
                                    Est. {formatTime(estimatedTime - elapsedTime)}
                                </span>
                            )}
                            <span className="font-data text-foreground">
                                {formatTime(elapsedTime)}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`
                  flex items-center gap-3 p-3 rounded-lg animate-spring-fast
                  ${index === currentStep ? 'bg-primary/10' : 'bg-transparent'}
                `}
                            >
                                <Icon
                                    name={getStepIcon(step.status)}
                                    size={18}
                                    className={`
                    ${getStepColor(step.status)}
                    ${step.status === 'active' ? 'animate-spin' : ''}
                  `}
                                />
                                <span className={`
                  flex-1 font-caption text-sm
                  ${step.status === 'completed' ? 'text-muted-foreground line-through' : 'text-foreground'}
                `}>
                                    {step.label}
                                </span>
                                {step.status === 'completed' && (
                                    <span className="text-xs font-caption text-success">
                                        Done
                                    </span>
                                )}
                                {step.status === 'error' && (
                                    <span className="text-xs font-caption text-error">
                                        Failed
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressIndicator;