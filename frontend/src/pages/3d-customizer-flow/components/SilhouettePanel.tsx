import { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import { SilhouetteControl } from '../types';

interface SilhouettePanelProps {
    silhouetteControls: SilhouetteControl[];
    onControlChange: (id: string, value: number) => void;
    onReset: () => void;
    className?: string;
}

const SilhouettePanel = ({
    silhouetteControls,
    onControlChange,
    onReset,
    className = ''
}: SilhouettePanelProps) => {
    const [activeControl, setActiveControl] = useState<string | null>(null);

    const handleSliderChange = (id: string, value: number) => {
        onControlChange(id, value);
        setActiveControl(id);
    };

    const getControlIcon = (name: string) => {
        const iconMap: Record<string, string> = {
            'Fit': 'Maximize2',
            'Length': 'ArrowUpDown',
            'Shoulder Width': 'ArrowLeftRight',
            'Waist': 'Minimize2',
            'Sleeve Length': 'ArrowRight',
            'Hem Width': 'ArrowsOutSimple'
        };
        return iconMap[name] || 'Sliders';
    };

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="flex items-center justify-between">
                <label className="text-sm font-caption text-muted-foreground uppercase tracking-wide">
                    Adjust Silhouette
                </label>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    iconName="RotateCcw"
                    iconPosition="left"
                >
                    Reset All
                </Button>
            </div>

            <div className="space-y-4">
                {silhouetteControls.map((control) => (
                    <div
                        key={control.id}
                        className={`
              glass-strong p-4 rounded-lg animate-spring-fast
              ${activeControl === control.id ? 'border-2 border-primary' : 'border border-border'}
            `}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Icon name={getControlIcon(control.name)} size={18} className="text-primary" />
                                <span className="font-caption text-sm text-foreground font-medium">
                                    {control.name}
                                </span>
                            </div>
                            <span className="font-data text-sm text-accent">
                                {control.value}{control.unit}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <input
                                type="range"
                                min={control.min}
                                max={control.max}
                                value={control.value}
                                onChange={(e) => handleSliderChange(control.id, Number(e.target.value))}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                style={{
                                    background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((control.value - control.min) / (control.max - control.min)) * 100}%, var(--color-muted) ${((control.value - control.min) / (control.max - control.min)) * 100}%, var(--color-muted) 100%)`
                                }}
                            />
                            <div className="flex items-center justify-between text-xs font-caption text-muted-foreground">
                                <span>{control.min}{control.unit}</span>
                                <span>{control.max}{control.unit}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-strong p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2 mb-2">
                    <Icon name="Info" size={18} className="text-primary" />
                    <h4 className="font-heading font-semibold text-foreground">Silhouette Tips</h4>
                </div>
                <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm font-caption text-muted-foreground">
                        <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Adjust fit for comfort and style preference</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm font-caption text-muted-foreground">
                        <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Length changes affect overall proportions</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm font-caption text-muted-foreground">
                        <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                        <span>Extreme values may affect manufacturability</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SilhouettePanel;