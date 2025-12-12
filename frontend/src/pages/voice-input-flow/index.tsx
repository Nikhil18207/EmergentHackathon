import React, { useState, useRef } from 'react';
import { PermissionPrompt } from './components/PermissionPrompt';
import { MicrophoneButton } from './components/MicrophoneButton';
import { WaveformVisualizer } from './components/WaveformVisualizer';
import { RecordingTimer } from './components/RecordingTimer';
import { RecordingControls } from './components/RecordingControls';
import { TranscriptionEditor } from './components/TranscriptionEditor';
import { RecordingState } from './types';

export const VoiceInputFlow: React.FC = () => {
    const [recordingState, setRecordingState] = useState<RecordingState>({
        isRecording: false,
        isPaused: false,
        isProcessing: false,
        hasPermission: null,
        audioStream: null,
        currentRecording: null,
    });

    const [transcription, setTranscription] = useState('');
    const [isRequestingPermission, setIsRequestingPermission] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const requestMicrophonePermission = async () => {
        setIsRequestingPermission(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                },
            });
            setRecordingState((prev) => ({
                ...prev,
                hasPermission: true,
                audioStream: stream,
            }));
        } catch (error) {
            console.error('Microphone permission denied:', error);
            setRecordingState((prev) => ({
                ...prev,
                hasPermission: false,
            }));
        } finally {
            setIsRequestingPermission(false);
        }
    };

    const handleSkipPermission = () => {
        // Navigate to next page or show alternative input method
        console.log('Skipped microphone permission');
    };

    const startRecording = () => {
        if (!recordingState.audioStream) return;

        audioChunksRef.current = [];
        const mediaRecorder = new MediaRecorder(recordingState.audioStream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            processRecording(audioBlob);
        };

        mediaRecorder.start();
        setRecordingState((prev) => ({ ...prev, isRecording: true, isPaused: false }));
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && recordingState.isRecording) {
            mediaRecorderRef.current.stop();
            setRecordingState((prev) => ({ ...prev, isRecording: false, isPaused: false }));
        }
    };

    const toggleRecording = () => {
        if (recordingState.isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const handlePauseResume = () => {
        if (!mediaRecorderRef.current) return;

        if (recordingState.isPaused) {
            mediaRecorderRef.current.resume();
            setRecordingState((prev) => ({ ...prev, isPaused: false }));
        } else {
            mediaRecorderRef.current.pause();
            setRecordingState((prev) => ({ ...prev, isPaused: true }));
        }
    };

    const handleCancel = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            audioChunksRef.current = [];
            setRecordingState((prev) => ({
                ...prev,
                isRecording: false,
                isPaused: false,
            }));
            setTranscription('');
        }
    };

    const processRecording = async (audioBlob: Blob) => {
        setRecordingState((prev) => ({ ...prev, isProcessing: true }));

        // Simulate transcription processing
        // In production, you would send the audio to a speech-to-text API
        setTimeout(() => {
            const mockTranscription = 'This is a sample transcription of your voice recording. In production, this would be the actual transcribed text from your speech.';
            setTranscription(mockTranscription);
            setRecordingState((prev) => ({ ...prev, isProcessing: false }));
        }, 2000);
    };

    const handleSave = () => {
        console.log('Saving transcription:', transcription);
        // TODO: Save transcription and navigate to next step
    };

    const handleMaxDurationReached = () => {
        stopRecording();
        alert('Maximum recording duration reached');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Voice Input</h1>
                    <p className="text-lg text-gray-600">Speak your design ideas and we'll transcribe them for you</p>
                </div>

                {recordingState.hasPermission === null || recordingState.hasPermission === false ? (
                    <PermissionPrompt
                        onRequestPermission={requestMicrophonePermission}
                        onSkip={handleSkipPermission}
                        hasPermission={recordingState.hasPermission}
                        isRequesting={isRequestingPermission}
                    />
                ) : (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <MicrophoneButton
                                isRecording={recordingState.isRecording}
                                isProcessing={recordingState.isProcessing}
                                onToggleRecording={toggleRecording}
                            />

                            <RecordingTimer
                                isRecording={recordingState.isRecording}
                                maxDuration={300}
                                onMaxDurationReached={handleMaxDurationReached}
                            />

                            <WaveformVisualizer
                                isRecording={recordingState.isRecording}
                                audioStream={recordingState.audioStream}
                            />

                            <RecordingControls
                                isRecording={recordingState.isRecording}
                                isPaused={recordingState.isPaused}
                                onToggleRecording={toggleRecording}
                                onPauseResume={handlePauseResume}
                                onCancel={handleCancel}
                                onSave={handleSave}
                                disabled={recordingState.isProcessing}
                            />
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <TranscriptionEditor
                                transcription={transcription}
                                onTranscriptionChange={setTranscription}
                                isEditable={true}
                                isProcessing={recordingState.isProcessing}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VoiceInputFlow;
