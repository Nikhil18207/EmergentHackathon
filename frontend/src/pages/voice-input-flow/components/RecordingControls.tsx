import React from 'react';

interface RecordingControlsProps {
    isRecording: boolean;
    isPaused: boolean;
    onToggleRecording: () => void;
    onPauseResume: () => void;
    onCancel: () => void;
    onSave: () => void;
    disabled?: boolean;
}

export const RecordingControls: React.FC<RecordingControlsProps> = ({
    isRecording,
    isPaused,
    onToggleRecording,
    onPauseResume,
    onCancel,
    onSave,
    disabled = false,
}) => {
    return (
        <div className="recording-controls">
            {!isRecording ? (
                <button
                    className="control-btn start-btn"
                    onClick={onToggleRecording}
                    disabled={disabled}
                >
                    <span className="btn-icon">▶️</span>
                    <span>Start Recording</span>
                </button>
            ) : (
                <>
                    <button
                        className="control-btn pause-btn"
                        onClick={onPauseResume}
                        disabled={disabled}
                    >
                        <span className="btn-icon">{isPaused ? '▶️' : '⏸️'}</span>
                        <span>{isPaused ? 'Resume' : 'Pause'}</span>
                    </button>

                    <button
                        className="control-btn stop-btn"
                        onClick={onToggleRecording}
                        disabled={disabled}
                    >
                        <span className="btn-icon">⏹️</span>
                        <span>Stop</span>
                    </button>

                    <button
                        className="control-btn cancel-btn"
                        onClick={onCancel}
                        disabled={disabled}
                    >
                        <span className="btn-icon">❌</span>
                        <span>Cancel</span>
                    </button>
                </>
            )}

            {!isRecording && (
                <button
                    className="control-btn save-btn"
                    onClick={onSave}
                    disabled={disabled}
                >
                    <span className="btn-icon">💾</span>
                    <span>Save & Continue</span>
                </button>
            )}
        </div>
    );
};
