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
        <div className="my-6">
            <div className="flex items-center justify-center gap-3 mb-2">
                {isRecording && <span className="text-red-500 text-2xl animate-pulse">●</span>}
                <span className="text-3xl font-mono font-bold text-gray-800">{formatTime(elapsedTime)}</span>
                <span className="text-lg text-gray-500">/ {formatTime(maxDuration)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-300 ${getProgressPercentage() > 80 ? 'bg-red-500' : 'bg-blue-600'
                        }`}
                    style={{ width: `${getProgressPercentage()}%` }}
                />
            </div>
        </div>
    );
};
