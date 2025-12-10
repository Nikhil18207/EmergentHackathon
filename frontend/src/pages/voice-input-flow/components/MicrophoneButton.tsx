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
    const getButtonState = () => {
        if (isProcessing) return 'processing';
        if (isRecording) return 'recording';
        return 'idle';
    };

    const getButtonText = () => {
        if (isProcessing) return 'Processing...';
        if (isRecording) return 'Stop Recording';
        return 'Start Recording';
    };

    const state = getButtonState();

    return (
        <div className="microphone-button-container">
            <button
                className={`microphone-button ${state}`}
                onClick={onToggleRecording}
                disabled={disabled || isProcessing}
            >
                <div className="mic-icon-wrapper">
                    {isRecording && <div className="pulse-ring" />}
                    <span className="mic-icon">🎤</span>
                </div>
            </button>
            <p className="button-label">{getButtonText()}</p>
            {isRecording && (
                <p className="recording-hint">Speak clearly into your microphone</p>
            )}
        </div>
    );
};
