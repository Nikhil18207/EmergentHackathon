import { useState, useCallback } from 'react';
import { ToastMessage, ToastType } from '../components/ui/Toast';

export const useToast = () => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    const showToast = useCallback((
        type: ToastType,
        title: string,
        description?: string,
        duration?: number
    ) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const newMessage: ToastMessage = {
            id,
            type,
            title,
            description,
            duration
        };

        setMessages(prev => [...prev, newMessage]);
    }, []);

    const closeToast = useCallback((id: string) => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
    }, []);

    const success = useCallback((title: string, description?: string, duration?: number) => {
        showToast('success', title, description, duration);
    }, [showToast]);

    const error = useCallback((title: string, description?: string, duration?: number) => {
        showToast('error', title, description, duration);
    }, [showToast]);

    const warning = useCallback((title: string, description?: string, duration?: number) => {
        showToast('warning', title, description, duration);
    }, [showToast]);

    const info = useCallback((title: string, description?: string, duration?: number) => {
        showToast('info', title, description, duration);
    }, [showToast]);

    return {
        messages,
        closeToast,
        success,
        error,
        warning,
        info
    };
};