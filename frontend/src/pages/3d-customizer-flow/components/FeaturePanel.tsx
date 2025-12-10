import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/ui/AppIcon';
import { FeatureOption } from '../types';

interface FeaturePanelProps {
    selectedFeatures: FeatureOption[];
    onFeatureToggle: (feature: FeatureOption) => void;
    className?: string;
}

const FeaturePanel = ({ selectedFeatures, onFeatureToggle, className = '' }: FeaturePanelProps) => {
    const features: FeatureOption[] = [
        { id: 'pockets', name: 'Side Pockets', category: 'Functional', icon: 'Square', price: 5, enabled: false },
        { id: 'zipper', name: 'Front Zipper', category: 'Functional', icon: 'Minus', price: 8, enabled: false },
        { id: 'buttons', name: 'Custom Buttons', category: 'Decorative', icon: 'Circle', price: 3, enabled: false },
        { id: 'hood', name: 'Detachable Hood', category: 'Functional', icon: 'Triangle', price: 12, enabled: false },
        { id: 'embroidery', name: 'Custom Embroidery', category: 'Decorative', icon: 'Sparkles', price: 15, enabled: false },
        { id: 'patches', name: 'Designer Patches', category: 'Decorative', icon: 'Star', price: 10, enabled: false },
        { id: 'drawstring', name: 'Adjustable Drawstring', category: 'Functional', icon: 'Minus', price: 4, enabled: false },
        { id: 'lining', name: 'Premium Lining', category: 'Functional', icon: 'Layers', price: 20, enabled: false }
    ];

    const isFeatureSelected = (featureId: string) => {
        return selectedFeatures.some(f => f.id === featureId);
    };

    const getTotalFeatureCost = () => {
        return selectedFeatures.reduce((total, feature) => total + feature.price, 0);
    };

    const functionalFeatures = features.filter(f => f.category === 'Functional');
    const decorativeFeatures = features.filter(f => f.category === 'Decorative');

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-caption text-muted-foreground uppercase tracking-wide">
                        Functional Features
                    </label>
                    <span className="text-xs font-caption text-muted-foreground">
                        {functionalFeatures.filter(f => isFeatureSelected(f.id)).length} selected
                    </span>
                </div>
                <div className="space-y-2">
                    {functionalFeatures.map((feature) => (
                        <div
                            key={feature.id}
                            className="glass-strong p-3 rounded-lg hover:border-primary/50 border border-border animate-spring-fast"
                        >
                            <Checkbox
                                checked={isFeatureSelected(feature.id)}
                                onChange={() => onFeatureToggle(feature)}
                                label={
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            <Icon name={feature.icon} size={16} className="text-primary" />
                                            <span className="font-caption text-sm text-foreground">{feature.name}</span>
                                        </div>
                                        <span className="text-xs font-data text-accent">+${feature.price}</span>
                                    </div>
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-caption text-muted-foreground uppercase tracking-wide">
                        Decorative Features
                    </label>
                    <span className="text-xs font-caption text-muted-foreground">
                        {decorativeFeatures.filter(f => isFeatureSelected(f.id)).length} selected
                    </span>
                </div>
                <div className="space-y-2">
                    {decorativeFeatures.map((feature) => (
                        <div
                            key={feature.id}
                            className="glass-strong p-3 rounded-lg hover:border-primary/50 border border-border animate-spring-fast"
                        >
                            <Checkbox
                                checked={isFeatureSelected(feature.id)}
                                onChange={() => onFeatureToggle(feature)}
                                label={
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            <Icon name={feature.icon} size={16} className="text-primary" />
                                            <span className="font-caption text-sm text-foreground">{feature.name}</span>
                                        </div>
                                        <span className="text-xs font-data text-accent">+${feature.price}</span>
                                    </div>
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-strong p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2 mb-2">
                    <Icon name="DollarSign" size={18} className="text-accent" />
                    <h4 className="font-heading font-semibold text-foreground">Feature Cost Summary</h4>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-caption text-muted-foreground">Selected Features</span>
                        <span className="text-sm font-data text-foreground">{selectedFeatures.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-caption text-muted-foreground">Additional Cost</span>
                        <span className="text-lg font-data text-accent font-semibold">
                            ${getTotalFeatureCost()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturePanel;