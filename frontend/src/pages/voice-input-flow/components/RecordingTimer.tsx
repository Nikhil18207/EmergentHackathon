import React, { useEffect, useState } from 'react';

interface RecordingTimerProps {
    isRecording: boolean;
    maxDuration?: number; // in seconds
    onMaxDurationReached?: () => void;
}

export const RecordingTimer: React.FC<RecordingTimerProps> = ({
    isRecording,
    maxDuration = 300, // 5 minutes default
    onMaxDurationReached,
}) => {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        if (!isRecording) {
            setElapsedTime(0);
            return;
        }

        const interval = setInterval(() => {
            setElapsedTime((prev) => {
                const newTime = prev + 1;
                if (newTime >= maxDuration && onMaxDurationReached) {
                    onMaxDurationReached();
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRecording, maxDuration, onMaxDurationReached]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getProgressPercentage = (): number => {
        return (elapsedTime / maxDuration) * 100;
    };

    if (!isRecording && elapsedTime === 0) {
        return null;
    }

    return (
        <div className="recording-timer">
            <div className="timer-display">
                {isRecording && <span className="recording-dot">●</span>}
                <span className="time-text">{formatTime(elapsedTime)}</span>
                <span className="max-time-text">/ {formatTime(maxDuration)}</span>
            </div>
            <div className="timer-progress-bar">
                <div
                    className="timer-progress-fill"
                    style={{ width: `${getProgressPercentage()}%` }}
                />
            </div>
        </div>
    );
};
