import Icon from '../../../components/ui/AppIcon';
import { MaterialOption } from '../types';

interface MaterialPanelProps {
    selectedMaterial: MaterialOption | null;
    onMaterialSelect: (material: MaterialOption) => void;
    className?: string;
}

const MaterialPanel = ({ selectedMaterial, onMaterialSelect, className = '' }: MaterialPanelProps) => {
    const materials: MaterialOption[] = [
        {
            id: 'cotton',
            name: 'Premium Cotton',
            type: 'Natural',
            texture: 'Soft, breathable weave',
            price: 0,
            properties: {
                weight: 'Medium (180 GSM)',
                stretch: 'Low (5%)',
                durability: 'High'
            }
        },
        {
            id: 'denim',
            name: 'Raw Denim',
            type: 'Natural',
            texture: 'Rugged, textured finish',
            price: 15,
            properties: {
                weight: 'Heavy (320 GSM)',
                stretch: 'Medium (15%)',
                durability: 'Very High'
            }
        },
        {
            id: 'leather',
            name: 'Genuine Leather',
            type: 'Natural',
            texture: 'Smooth, luxurious grain',
            price: 50,
            properties: {
                weight: 'Heavy (400 GSM)',
                stretch: 'None',
                durability: 'Excellent'
            }
        },
        {
            id: 'polyester',
            name: 'Tech Polyester',
            type: 'Synthetic',
            texture: 'Smooth, moisture-wicking',
            price: 10,
            properties: {
                weight: 'Light (140 GSM)',
                stretch: 'High (25%)',
                durability: 'Medium'
            }
        },
        {
            id: 'silk',
            name: 'Pure Silk',
            type: 'Natural',
            texture: 'Ultra-smooth, lustrous',
            price: 75,
            properties: {
                weight: 'Light (120 GSM)',
                stretch: 'Low (8%)',
                durability: 'Medium'
            }
        },
        {
            id: 'wool',
            name: 'Merino Wool',
            type: 'Natural',
            texture: 'Soft, insulating',
            price: 40,
            properties: {
                weight: 'Medium (220 GSM)',
                stretch: 'Medium (12%)',
                durability: 'High'
            }
        }
    ];

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="space-y-3">
                <label className="text-sm font-caption text-muted-foreground uppercase tracking-wide">
                    Select Material
                </label>
                <div className="space-y-3">
                    {materials.map((material) => (
                        <button
                            key={material.id}
                            onClick={() => onMaterialSelect(material)}
                            className={`
                w-full p-4 rounded-lg text-left animate-spring-fast
                ${selectedMaterial?.id === material.id
                                    ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/50 border border-border hover:border-primary/50'
                                }
              `}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <h4 className="font-heading font-semibold text-foreground mb-1">
                                        {material.name}
                                    </h4>
                                    <p className="text-sm font-caption text-muted-foreground">
                                        {material.texture}
                                    </p>
                                </div>
                                {material.price > 0 && (
                                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-data rounded">
                                        +${material.price}
                                    </span>
                                )}
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-3">
                                <div className="space-y-1">
                                    <span className="text-xs font-caption text-muted-foreground">Weight</span>
                                    <p className="text-xs font-data text-foreground">{material.properties.weight}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs font-caption text-muted-foreground">Stretch</span>
                                    <p className="text-xs font-data text-foreground">{material.properties.stretch}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs font-caption text-muted-foreground">Durability</span>
                                    <p className="text-xs font-data text-foreground">{material.properties.durability}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {selectedMaterial && (
                <div className="glass-strong p-4 rounded-lg space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                        <Icon name="Info" size={18} className="text-primary" />
                        <h4 className="font-heading font-semibold text-foreground">Material Details</h4>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-caption text-muted-foreground">Type</span>
                            <span className="text-sm font-data text-foreground">{selectedMaterial.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-caption text-muted-foreground">Texture</span>
                            <span className="text-sm font-data text-foreground">{selectedMaterial.texture}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-caption text-muted-foreground">Additional Cost</span>
                            <span className="text-sm font-data text-accent">
                                {selectedMaterial.price > 0 ? `+$${selectedMaterial.price}` : 'Included'}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaterialPanel;