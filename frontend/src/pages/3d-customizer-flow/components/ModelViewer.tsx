import { useState, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import CanvasModel from '../../../components/3d/CanvasModel';
import state from '../../../store';

interface ModelViewerProps {
    selectedModel?: {
        id: string;
        name: string;
        category: string;
        basePrice: number;
        thumbnail: string;
        alt: string;
        modelFile?: string;
    } | null;
    selectedColors?: {
        primary: { hex: string } | null;
        secondary: { hex: string } | null;
        accent: { hex: string } | null;
    };
    selectedMaterial?: {
        roughness: number;
        metalness: number;
        textureFile?: string;
    } | null;
    selectedFeatures?: any[];
    onRotate: (angle: number) => void;
    onZoom: (level: number) => void;
    className?: string;
}

const ModelViewer = ({
    selectedModel,
    selectedColors,
    onRotate,
    onZoom,
    className = ''
}: ModelViewerProps) => {
    const snap = useSnapshot(state);
    const [zoom, setZoom] = useState(1);
    const [lighting, setLighting] = useState<'studio' | 'outdoor' | 'neon'>('studio');

    // Update global state when garment model changes
    useEffect(() => {
        if (selectedModel?.modelFile) {
            console.log('🔄 Loading model:', selectedModel.modelFile);
            state.modelPath = selectedModel.modelFile;
        }
    }, [selectedModel]);

    // Update global state when colors change
    useEffect(() => {
        if (selectedColors?.primary?.hex) {
            state.color = selectedColors.primary.hex;
        }
    }, [selectedColors]);

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 0.2, 3));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 0.2, 0.5));
    };

    const handleReset = () => {
        setZoom(1);
    };

    useEffect(() => {
        onZoom(zoom);
    }, [zoom, onZoom]);

    return (
        <div className={`relative h-full bg-muted/20 rounded-lg overflow-hidden ${className}`}>
            <CanvasModel enableOrbitControls={true} />

            {/* Controls overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleZoomIn}
                    iconName="ZoomIn"
                    className="glass-strong"
                    aria-label="Zoom in"
                />
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleZoomOut}
                    iconName="ZoomOut"
                    className="glass-strong"
                    aria-label="Zoom out"
                />
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleReset}
                    iconName="RotateCcw"
                    className="glass-strong"
                    aria-label="Reset view"
                />
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-strong px-4 py-2 rounded-lg">
                <div className="flex items-center gap-3">
                    <Icon name="MousePointer2" size={16} className="text-muted-foreground" />
                    <span className="font-caption text-sm text-foreground">
                        Move mouse to rotate • Scroll to zoom
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ModelViewer;