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
        // Reset to original transcription if needed
    };

    if (isProcessing) {
        return (
            <div className="transcription-editor processing">
                <div className="processing-indicator">
                    <div className="spinner" />
                    <p>Transcribing your voice...</p>
                </div>
            </div>
        );
    }

    if (!transcription && !isEditing) {
        return (
            <div className="transcription-editor empty">
                <p className="empty-message">
                    Your transcription will appear here after recording
                </p>
            </div>
        );
    }

    return (
        <div className="transcription-editor">
            <div className="editor-header">
                <h3>Transcription</h3>
                {isEditable && !isEditing && (
                    <button className="edit-btn" onClick={handleEdit}>
                        ✏️ Edit
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="editor-content editing">
                    <textarea
                        className="transcription-textarea"
                        value={transcription}
                        onChange={(e) => onTranscriptionChange(e.target.value)}
                        placeholder="Edit your transcription..."
                        rows={8}
                    />
                    <div className="editor-actions">
                        <button className="btn-save" onClick={handleSave}>
                            Save
                        </button>
                        <button className="btn-cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="editor-content viewing">
                    <div className="transcription-text">{transcription}</div>
                    <div className="transcription-meta">
                        <span className="word-count">
                            {transcription.split(/\s+/).filter(Boolean).length} words
                        </span>
                        <span className="char-count">
                            {transcription.length} characters
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
