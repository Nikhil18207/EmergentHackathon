import { GarmentModel } from '../types';
import Icon from '../../../components/ui/AppIcon';

interface GarmentSelectorProps {
    garments: GarmentModel[];
    selectedGarment: GarmentModel | null;
    onSelect: (garment: GarmentModel) => void;
}

const GarmentSelector = ({ garments, selectedGarment, onSelect }: GarmentSelectorProps) => {
    if (garments.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg text-foreground">
                Select Garment Type
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {garments.map((garment) => (
                    <button
                        key={garment.id}
                        onClick={() => onSelect(garment)}
                        className={`
                            relative p-4 rounded-lg border-2 animate-spring-fast
                            ${selectedGarment?.id === garment.id
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50 bg-muted/20'
                            }
                        `}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                <Icon name="Shirt" size={24} className="text-primary" />
                            </div>
                            <div className="text-center">
                                <p className="font-caption text-sm font-medium text-foreground">
                                    {garment.name}
                                </p>
                                <p className="font-data text-xs text-muted-foreground">
                                    ${garment.basePrice.toFixed(2)}
                                </p>
                            </div>
                        </div>
                        {selectedGarment?.id === garment.id && (
                            <div className="absolute top-2 right-2">
                                <Icon name="Check" size={16} className="text-primary" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GarmentSelector;
