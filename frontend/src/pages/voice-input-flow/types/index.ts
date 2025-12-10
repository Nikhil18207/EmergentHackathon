export interface VoiceRecording {
    id: string;
    audioBlob: Blob;
    duration: number;
    timestamp: Date;
    transcription?: string;
}

export interface RecordingState {
    isRecording: boolean;
    isPaused: boolean;
    isProcessing: boolean;
    hasPermission: boolean | null;
    audioStream: MediaStream | null;
    currentRecording: VoiceRecording | null;
}

export interface TranscriptionResult {
    text: string;
    confidence: number;
    language?: string;
}

export interface AudioPermissionStatus {
    granted: boolean;
    denied: boolean;
    prompt: boolean;
}

export interface RecordingSettings {
    maxDuration: number; // in seconds
    sampleRate: number;
    channelCount: number;
    echoCancellation: boolean;
    noiseSuppression: boolean;
}

export interface VoiceCommand {
    command: string;
    timestamp: Date;
    confidence: number;
    action?: string;
}

export type RecordingStatus = 'idle' | 'recording' | 'paused' | 'processing' | 'completed';
