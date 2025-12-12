import React, { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
    isRecording: boolean;
    audioStream?: MediaStream | null;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
    isRecording,
    audioStream,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();
    const analyserRef = useRef<AnalyserNode>();

    useEffect(() => {
        if (!isRecording || !audioStream) {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(audioStream);

        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            if (!analyser) return;

            animationRef.current = requestAnimationFrame(draw);

            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = 'rgb(249, 250, 251)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height;

                const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
                gradient.addColorStop(0, '#8b5cf6');
                gradient.addColorStop(1, '#3b82f6');

                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }
        };

        draw();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            audioContext.close();
        };
    }, [isRecording, audioStream]);

    return (
        <div className="my-6 relative">
            <canvas
                ref={canvasRef}
                width={600}
                height={150}
                className="w-full h-auto rounded-lg border-2 border-gray-200 bg-gray-50 shadow-inner"
            />
            {!isRecording && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-gray-200">
                    <p className="text-gray-500 text-center px-4">
                        🎵 Audio waveform will appear here when recording
                    </p>
                </div>
            )}
        </div>
    );
};
