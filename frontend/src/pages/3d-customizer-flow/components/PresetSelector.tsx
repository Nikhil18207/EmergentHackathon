import Icon from '../../../components/ui/AppIcon';
import Image from '../../../components/ui/AppImage';
import { PresetCombination } from '../types';

interface PresetSelectorProps {
    onPresetSelect: (preset: PresetCombination) => void;
    className?: string;
}

const PresetSelector = ({ onPresetSelect, className = '' }: PresetSelectorProps) => {
    const presets: PresetCombination[] = [
        {
            id: 'streetwear',
            name: 'Streetwear Classic',
            description: 'Bold colors with urban edge',
            thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_106d2a040-1765093902575.png",
            alt: 'Black oversized hoodie with purple accents and street style details',
            colors: { primary: '#000000', secondary: '#8B5CF6', accent: '#F59E0B' },
            material: 'cotton',
            features: ['pockets', 'hood', 'embroidery']
        },
        {
            id: 'minimalist',
            name: 'Minimalist Chic',
            description: 'Clean lines and neutral tones',
            thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1ecf066a9-1764655136077.png",
            alt: 'White minimalist t-shirt with clean lines and simple design',
            colors: { primary: '#FFFFFF', secondary: '#000000', accent: '#6B7280' },
            material: 'cotton',
            features: ['buttons']
        },
        {
            id: 'luxury',
            name: 'Luxury Premium',
            description: 'High-end materials and details',
            thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_11f5f9b19-1765090079597.png",
            alt: 'Black leather jacket with premium finish and gold hardware details',
            colors: { primary: '#000000', secondary: '#F59E0B', accent: '#FFFFFF' },
            material: 'leather',
            features: ['zipper', 'lining', 'patches']
        },
        {
            id: 'athletic',
            name: 'Athletic Performance',
            description: 'Tech fabrics for active wear',
            thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_181e7eac0-1764649791120.png",
            alt: 'Blue athletic wear with moisture-wicking fabric and ergonomic design',
            colors: { primary: '#3B82F6', secondary: '#000000', accent: '#10B981' },
            material: 'polyester',
            features: ['pockets', 'drawstring']
        }];


    return (
        <div className={`space-y-4 ${className}`}>
            <div className="flex items-center gap-2">
                <Icon name="Sparkles" size={20} className="text-primary" />
                <h3 className="font-heading font-semibold text-foreground">Quick Start Presets</h3>
            </div>
            <p className="text-sm font-caption text-muted-foreground">
                Start with a curated combination and customize from there
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {presets.map((preset) =>
                    <button
                        key={preset.id}
                        onClick={() => onPresetSelect(preset)}
                        className="group relative overflow-hidden rounded-lg border border-border hover:border-primary/50 animate-spring-fast">

                        <div className="aspect-[4/3] overflow-hidden">
                            <Image
                                src={preset.thumbnail}
                                alt={preset.alt}
                                className="w-full h-full object-cover group-hover:scale-110 animate-spring" />

                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                            <h4 className="font-heading font-semibold text-foreground">
                                {preset.name}
                            </h4>
                            <p className="text-sm font-caption text-muted-foreground">
                                {preset.description}
                            </p>
                            <div className="flex items-center gap-2">
                                {Object.values(preset.colors).map((color, index) =>
                                    <div
                                        key={index}
                                        className="w-6 h-6 rounded-full border border-border"
                                        style={{ backgroundColor: color }} />

                                )}
                            </div>
                        </div>
                    </button>
                )}
            </div>
        </div>);

};

export default PresetSelector;