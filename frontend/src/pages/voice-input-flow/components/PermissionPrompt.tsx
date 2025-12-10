import React from 'react';

interface PermissionPromptProps {
    onRequestPermission: () => void;
    onSkip: () => void;
    hasPermission: boolean | null;
    isRequesting: boolean;
}

export const PermissionPrompt: React.FC<PermissionPromptProps> = ({
    onRequestPermission,
    onSkip,
    hasPermission,
    isRequesting,
}) => {
    if (hasPermission === true) {
        return (
            <div className="permission-granted">
                <div className="success-icon">✓</div>
                <h3>Microphone Access Granted</h3>
                <p>You're all set to use voice input!</p>
            </div>
        );
    }

    if (hasPermission === false) {
        return (
            <div className="permission-denied">
                <div className="error-icon">⚠️</div>
                <h3>Microphone Access Denied</h3>
                <p>
                    To use voice input, please enable microphone access in your browser settings.
                </p>
                <button className="btn-retry" onClick={onRequestPermission}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="permission-prompt">
            <div className="prompt-icon">🎤</div>
            <h3>Enable Voice Input</h3>
            <p>
                We need access to your microphone to enable voice commands.
                Your audio is processed locally and never stored.
            </p>
            <div className="permission-actions">
                <button
                    className="btn-primary"
                    onClick={onRequestPermission}
                    disabled={isRequesting}
                >
                    {isRequesting ? 'Requesting...' : 'Enable Microphone'}
                </button>
                <button className="btn-secondary" onClick={onSkip}>
                    Skip for Now
                </button>
            </div>
            <div className="privacy-note">
                <span className="lock-icon">🔒</span>
                <span>Your privacy is protected. We don't record or store your voice.</span>
            </div>
        </div>
    );
};
