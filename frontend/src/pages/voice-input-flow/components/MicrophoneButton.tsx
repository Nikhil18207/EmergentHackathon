import React from 'react';

interface MicrophoneButtonProps {
    isRecording: boolean;
    isProcessing: boolean;
    onToggleRecording: () => void;
    disabled?: boolean;
}

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
    isRecording,
    isProcessing,
    onToggleRecording,
    disabled = false,
}) => {
    const getButtonText = () => {
        if (isProcessing) return 'Processing...';
        if (isRecording) return 'Stop Recording';
        return 'Start Recording';
    };

    return (
        <div className="flex flex-col items-center justify-center mb-8">
            <button
                className={`relative w-32 h-32 rounded-full flex items-center justify-center text-6xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isRecording
                        ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50 animate-pulse'
                        : isProcessing
                            ? 'bg-yellow-500 cursor-wait'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    }`}
                onClick={onToggleRecording}
                disabled={disabled || isProcessing}
            >
                {isRecording && (
                    <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75" />
                )}
                <span className="relative z-10">🎤</span>
            </button>
            <p className="mt-4 text-lg font-semibold text-gray-800">{getButtonText()}</p>
            {isRecording && (
                <p className="mt-2 text-sm text-gray-600 animate-pulse">Speak clearly into your microphone</p>
            )}
        </div>
    );
};
