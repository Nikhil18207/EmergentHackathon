import React, { useState } from 'react';

interface TranscriptionEditorProps {
    transcription: string;
    onTranscriptionChange: (text: string) => void;
    isEditable?: boolean;
    isProcessing?: boolean;
}

export const TranscriptionEditor: React.FC<TranscriptionEditorProps> = ({
    transcription,
    onTranscriptionChange,
    isEditable = true,
    isProcessing = false,
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    if (isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center p-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
                <p className="text-lg text-gray-700 font-medium">Transcribing your voice...</p>
            </div>
        );
    }

    if (!transcription && !isEditing) {
        return (
            <div className="flex items-center justify-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500 text-center">
                    Your transcription will appear here after recording
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Transcription</h3>
                {isEditable && !isEditing && transcription && (
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        onClick={handleEdit}
                    >
                        <span>✏️</span>
                        <span>Edit</span>
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-3">
                    <textarea
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none font-sans"
                        value={transcription}
                        onChange={(e) => onTranscriptionChange(e.target.value)}
                        placeholder="Edit your transcription..."
                        rows={8}
                    />
                    <div className="flex gap-3">
                        <button
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 leading-relaxed">
                        {transcription}
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                        <span className="font-medium">
                            📝 {transcription.split(/\s+/).filter(Boolean).length} words
                        </span>
                        <span className="font-medium">
                            🔤 {transcription.length} characters
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TranscriptionEditor;
