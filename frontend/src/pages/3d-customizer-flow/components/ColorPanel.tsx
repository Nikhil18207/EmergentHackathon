import { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import { ColorOption } from '../types';

interface ColorPanelProps {
    selectedColors: {
        primary: ColorOption | null;
        secondary: ColorOption | null;
        accent: ColorOption | null;
    };
    onColorSelect: (type: 'primary' | 'secondary' | 'accent', color: ColorOption) => void;
    className?: string;
}

const ColorPanel = ({ selectedColors, onColorSelect, className = '' }: ColorPanelProps) => {
    const [activeColorType, setActiveColorType] = useState<'primary' | 'secondary' | 'accent'>('primary');
    const [customColor, setCustomColor] = useState('#8B5CF6');

    const solidColors: ColorOption[] = [
        { id: 'black', name: 'Black', hex: '#000000', category: 'solid' },
        { id: 'white', name: 'White', hex: '#FFFFFF', category: 'solid' },
        { id: 'purple', name: 'Purple', hex: '#8B5CF6', category: 'solid' },
        { id: 'blue', name: 'Blue', hex: '#3B82F6', category: 'solid' },
        { id: 'red', name: 'Red', hex: '#EF4444', category: 'solid' },
        { id: 'green', name: 'Green', hex: '#10B981', category: 'solid' },
        { id: 'yellow', name: 'Yellow', hex: '#F59E0B', category: 'solid' },
        { id: 'pink', name: 'Pink', hex: '#EC4899', category: 'solid' }
    ];

    const gradientColors: ColorOption[] = [
        { id: 'sunset', name: 'Sunset', hex: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)', category: 'gradient' },
        { id: 'ocean', name: 'Ocean', hex: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)', category: 'gradient' },
        { id: 'forest', name: 'Forest', hex: 'linear-gradient(135deg, #134E5E 0%, #71B280 100%)', category: 'gradient' },
        { id: 'fire', name: 'Fire', hex: 'linear-gradient(135deg, #F2994A 0%, #F2C94C 100%)', category: 'gradient' }
    ];

    const handleCustomColorApply = () => {
        const customColorOption: ColorOption = {
            id: `custom-${Date.now()}`,
            name: 'Custom Color',
            hex: customColor,
            category: 'solid'
        };
        onColorSelect(activeColorType, customColorOption);
    };

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="space-y-3">
                <label className="text-sm font-caption text-muted-foreground uppercase tracking-wide">
                    Select Color Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {(['primary', 'secondary', 'accent'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveColorType(type)}
                            className={`
                px-4 py-3 rounded-lg font-caption text-sm capitalize animate-spring-fast
                ${activeColorType === type
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted/50 text-foreground hover:bg-muted'
                                }
              `}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-caption text-muted-foreground uppercase tracking-wide">
                    Solid Colors
                </label>
                <div className="grid grid-cols-4 gap-3">
                    {solidColors.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => onColorSelect(activeColorType, color)}
                            className={`
                relative w-full aspect-square rounded-lg animate-spring-fast
                ${selectedColors[activeColorType]?.id === color.id
                                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:scale-105'
                                }
              `}
                            style={{ backgroundColor: color.hex }}
                            aria-label={`Select ${color.name}`}
                        >
                            {selectedColors[activeColorType]?.id === color.id && (
                                <Icon name="Check" size={20} className="absolute inset-0 m-auto text-white drop-shadow-lg" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-caption text-muted-foreground uppercase tracking-wide">
                    Gradient Colors
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {gradientColors.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => onColorSelect(activeColorType, color)}
                            className={`
                relative w-full h-20 rounded-lg animate-spring-fast
                ${selectedColors[activeColorType]?.id === color.id
                                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:scale-105'
                                }
              `}
                            style={{ background: color.hex }}
                            aria-label={`Select ${color.name} gradient`}
                        >
                            {selectedColors[activeColorType]?.id === color.id && (
                                <Icon name="Check" size={20} className="absolute inset-0 m-auto text-white drop-shadow-lg" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-caption text-muted-foreground uppercase tracking-wide">
                    Custom Color
                </label>
                <div className="flex gap-2">
                    <input
                        type="color"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="w-16 h-12 rounded-lg cursor-pointer"
                    />
                    <input
                        type="text"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="flex-1 px-4 py-2 bg-muted/50 border border-border rounded-lg font-data text-sm text-foreground"
                        placeholder="#000000"
                    />
                    <Button
                        variant="outline"
                        onClick={handleCustomColorApply}
                        iconName="Check"
                        iconPosition="left"
                    >
                        Apply
                    </Button>
                </div>
            </div>

            <div className="glass-strong p-4 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-caption text-muted-foreground">Primary</span>
                    <div
                        className="w-8 h-8 rounded border border-border"
                        style={{ background: selectedColors.primary?.hex || '#6B7280' }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-caption text-muted-foreground">Secondary</span>
                    <div
                        className="w-8 h-8 rounded border border-border"
                        style={{ background: selectedColors.secondary?.hex || '#6B7280' }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-caption text-muted-foreground">Accent</span>
                    <div
                        className="w-8 h-8 rounded border border-border"
                        style={{ background: selectedColors.accent?.hex || '#6B7280' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ColorPanel;