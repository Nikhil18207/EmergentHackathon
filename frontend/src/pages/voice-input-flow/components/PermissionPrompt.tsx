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
            <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Microphone Access Granted</h3>
                <p className="text-green-700">You're all set to use voice input!</p>
            </div>
        );
    }

    if (hasPermission === false) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border-2 border-red-200">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-red-800 mb-2">Microphone Access Denied</h3>
                <p className="text-red-700 mb-4 text-center max-w-md">
                    To use voice input, please enable microphone access in your browser settings.
                </p>
                <button
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    onClick={onRequestPermission}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg border-2 border-gray-200 shadow-lg max-w-md mx-auto">
            <div className="text-6xl mb-4">🎤</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Enable Voice Input</h3>
            <p className="text-gray-600 mb-6 text-center">
                We need access to your microphone to enable voice commands.
                Your audio is processed locally and never stored.
            </p>
            <div className="flex flex-col gap-3 w-full">
                <button
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onRequestPermission}
                    disabled={isRequesting}
                >
                    {isRequesting ? 'Requesting...' : 'Enable Microphone'}
                </button>
                <button
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                    onClick={onSkip}
                >
                    Skip for Now
                </button>
            </div>
            <div className="flex items-center gap-2 mt-6 text-sm text-gray-500">
                <span className="text-xl">🔒</span>
                <span>Your privacy is protected. We don't record or store your voice.</span>
            </div>
        </div>
    );
};
