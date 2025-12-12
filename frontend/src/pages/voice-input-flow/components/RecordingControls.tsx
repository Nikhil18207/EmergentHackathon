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
        <div className="flex flex-wrap gap-3 justify-center mt-6">
            {!isRecording ? (
                <button
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    onClick={onToggleRecording}
                    disabled={disabled}
                >
                    <span className="text-xl">▶️</span>
                    <span>Start Recording</span>
                </button>
            ) : (
                <>
                    <button
                        className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        onClick={onPauseResume}
                        disabled={disabled}
                    >
                        <span className="text-xl">{isPaused ? '▶️' : '⏸️'}</span>
                        <span>{isPaused ? 'Resume' : 'Pause'}</span>
                    </button>

                    <button
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        onClick={onToggleRecording}
                        disabled={disabled}
                    >
                        <span className="text-xl">⏹️</span>
                        <span>Stop</span>
                    </button>

                    <button
                        className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        onClick={onCancel}
                        disabled={disabled}
                    >
                        <span className="text-xl">❌</span>
                        <span>Cancel</span>
                    </button>
                </>
            )}

            {!isRecording && (
                <button
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    onClick={onSave}
                    disabled={disabled}
                >
                    <span className="text-xl">💾</span>
                    <span>Save & Continue</span>
                </button>
            )}
        </div>
    );
};
