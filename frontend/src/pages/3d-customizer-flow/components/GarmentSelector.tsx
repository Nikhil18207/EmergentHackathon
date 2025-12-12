import { useState, useRef } from 'react';
import { GarmentModel } from '../types';
import Icon from '../../../components/ui/AppIcon';

interface GarmentSelectorProps {
    garments: GarmentModel[];
    selectedGarment: GarmentModel | null;
    onSelect: (garment: GarmentModel) => void;
}

const GarmentSelector = ({ garments, selectedGarment, onSelect }: GarmentSelectorProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    if (garments.length === 0) {
        return null;
    }

    const itemsPerView = 4; // Show 4 items at a time
    const maxIndex = Math.max(0, garments.length - itemsPerView);

    const handlePrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    const canGoPrevious = currentIndex > 0;
    const canGoNext = currentIndex < maxIndex;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-lg text-foreground">
                    Select Garment Type
                </h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrevious}
                        disabled={!canGoPrevious}
                        className={`p-2 rounded-full transition-all ${canGoPrevious
                                ? 'bg-primary/10 hover:bg-primary/20 text-primary'
                                : 'bg-muted/20 text-muted-foreground cursor-not-allowed opacity-50'
                            }`}
                        aria-label="Previous garments"
                    >
                        <Icon name="ChevronLeft" size={20} />
                    </button>
                    <span className="text-sm text-muted-foreground font-caption">
                        {currentIndex + 1}-{Math.min(currentIndex + itemsPerView, garments.length)} of {garments.length}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={!canGoNext}
                        className={`p-2 rounded-full transition-all ${canGoNext
                                ? 'bg-primary/10 hover:bg-primary/20 text-primary'
                                : 'bg-muted/20 text-muted-foreground cursor-not-allowed opacity-50'
                            }`}
                        aria-label="Next garments"
                    >
                        <Icon name="ChevronRight" size={20} />
                    </button>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div
                    ref={carouselRef}
                    className="flex gap-3 transition-transform duration-500 ease-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
                    }}
                >
                    {garments.map((garment) => (
                        <button
                            key={garment.id}
                            onClick={() => onSelect(garment)}
                            className={`
                                relative p-4 rounded-lg border-2 animate-spring-fast flex-shrink-0
                                ${selectedGarment?.id === garment.id
                                    ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                                    : 'border-border hover:border-primary/50 bg-muted/20 hover:shadow-md'
                                }
                            `}
                            style={{
                                width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 12 / itemsPerView}px)`
                            }}
                        >
                            <div className="flex flex-col items-center gap-3">
                                {/* Garment Image */}
                                <div className="w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
                                    <img
                                        src={garment.thumbnail}
                                        alt={garment.alt || garment.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Garment Info */}
                                <div className="text-center w-full">
                                    <p className="font-caption text-sm font-medium text-foreground truncate">
                                        {garment.name}
                                    </p>
                                    <p className="font-data text-xs text-muted-foreground">
                                        ${garment.basePrice.toFixed(2)}
                                    </p>
                                    <p className="font-caption text-xs text-muted-foreground/70 mt-1">
                                        {garment.category}
                                    </p>
                                </div>
                            </div>

                            {/* Selected Indicator */}
                            {selectedGarment?.id === garment.id && (
                                <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                                    <Icon name="Check" size={16} className="text-primary-foreground" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Carousel Dots Indicator */}
            <div className="flex items-center justify-center gap-2 mt-4">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${index === currentIndex
                                ? 'w-8 bg-primary'
                                : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default GarmentSelector;
