import { useEffect, useState } from 'react';
import Icon from './AppIcon';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration?: number;
}

interface ToastProps {
    message: ToastMessage;
    onClose: (id: string) => void;
}

const Toast = ({ message, onClose }: ToastProps) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const duration = message.duration || 5000;
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [message.duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose(message.id);
        }, 300);
    };

    const getToastStyles = () => {
        switch (message.type) {
            case 'success':
                return {
                    icon: 'CheckCircle2',
                    iconColor: 'text-success',
                    borderColor: 'border-success/50',
                    bgColor: 'bg-success/10'
                };
            case 'error':
                return {
                    icon: 'XCircle',
                    iconColor: 'text-error',
                    borderColor: 'border-error/50',
                    bgColor: 'bg-error/10'
                };
            case 'warning':
                return {
                    icon: 'AlertTriangle',
                    iconColor: 'text-warning',
                    borderColor: 'border-warning/50',
                    bgColor: 'bg-warning/10'
                };
            case 'info':
                return {
                    icon: 'Info',
                    iconColor: 'text-primary',
                    borderColor: 'border-primary/50',
                    bgColor: 'bg-primary/10'
                };
        }
    };

    const styles = getToastStyles();

    return (
        <div
            className={`
        glass-strong border ${styles.borderColor} rounded-lg shadow-primary p-4 min-w-[320px] max-w-md
        ${isExiting ? 'animate-slide-in-from-right' : 'animate-slide-in-from-right'}
      `}
            role="alert"
            aria-live="polite"
        >
            <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${styles.bgColor} flex items-center justify-center`}>
                    <Icon name={styles.icon} size={20} className={styles.iconColor} />
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-foreground text-sm mb-1">
                        {message.title}
                    </h4>
                    {message.description && (
                        <p className="font-caption text-sm text-muted-foreground">
                            {message.description}
                        </p>
                    )}
                </div>

                <button
                    onClick={handleClose}
                    className="flex-shrink-0 p-1 rounded hover:bg-muted/50 animate-spring-fast"
                    aria-label="Close notification"
                >
                    <Icon name="X" size={16} className="text-muted-foreground" />
                </button>
            </div>
        </div>
    );
};

interface ToastContainerProps {
    messages: ToastMessage[];
    onClose: (id: string) => void;
}

export const ToastContainer = ({ messages, onClose }: ToastContainerProps) => {
    return (
        <div className="fixed top-20 right-4 z-[400] flex flex-col gap-3 max-w-md">
            {messages.map((message) => (
                <Toast key={message.id} message={message} onClose={onClose} />
            ))}
        </div>
    );
};

export default Toast;