import { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import { GarmentModel } from '../types';

interface ModelViewerProps {
    selectedModel: GarmentModel | null;
    onRotate: (angle: number) => void;
    onZoom: (level: number) => void;
    className?: string;
}

const ModelViewer = ({ selectedModel, onRotate, onZoom, className = '' }: ModelViewerProps) => {
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const viewerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onRotate(rotation);
    }, [rotation, onRotate]);

    useEffect(() => {
        onZoom(zoom);
    }, [zoom, onZoom]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - dragStart.x;
        setRotation(prev => prev + deltaX * 0.5);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleZoomIn = () => {
        setZoom(prev => Math.min(prev + 0.2, 3));
    };

    const handleZoomOut = () => {
        setZoom(prev => Math.max(prev - 0.2, 0.5));
    };

    const handleReset = () => {
        setRotation(0);
        setZoom(1);
    };

    return (
        <div className={`relative h-full bg-muted/20 rounded-lg overflow-hidden ${className}`}>
            <div
                ref={viewerRef}
                className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {selectedModel ? (
                    <div
                        className="relative animate-spring"
                        style={{
                            transform: `rotateY(${rotation}deg) scale(${zoom})`,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <div className="w-80 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                            <div className="text-center space-y-4">
                                <Icon name="Shirt" size={120} className="text-primary mx-auto" />
                                <div className="space-y-2">
                                    <h3 className="font-heading font-semibold text-xl text-foreground">
                                        {selectedModel.name}
                                    </h3>
                                    <p className="font-caption text-sm text-muted-foreground">
                                        3D Model Preview
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-4">
                        <Icon name="Box" size={80} className="text-muted-foreground mx-auto opacity-50" />
                        <p className="font-caption text-muted-foreground">
                            Select a garment to begin customization
                        </p>
                    </div>
                )}
            </div>

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

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-strong px-4 py-2 rounded-lg">
                <div className="flex items-center gap-3">
                    <Icon name="MousePointer2" size={16} className="text-muted-foreground" />
                    <span className="font-caption text-sm text-foreground">
                        Drag to rotate • Scroll to zoom
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ModelViewer;