export interface GarmentModel {
    id: string;
    name: string;
    category: string;
    basePrice: number;
    thumbnail: string;
    alt: string;
}

export interface ColorOption {
    id: string;
    name: string;
    hex: string;
    category: 'solid' | 'gradient' | 'pattern';
}

export interface MaterialOption {
    id: string;
    name: string;
    type: string;
    texture: string;
    price: number;
    properties: {
        weight: string;
        stretch: string;
        durability: string;
    };
}

export interface FeatureOption {
    id: string;
    name: string;
    category: string;
    icon: string;
    price: number;
    enabled: boolean;
}

export interface SilhouetteControl {
    id: string;
    name: string;
    min: number;
    max: number;
    value: number;
    unit: string;
}

export interface CustomizationState {
    selectedModel: GarmentModel | null;
    selectedColors: {
        primary: ColorOption | null;
        secondary: ColorOption | null;
        accent: ColorOption | null;
    };
    selectedMaterial: MaterialOption | null;
    selectedFeatures: FeatureOption[];
    silhouetteControls: SilhouetteControl[];
}

export interface PresetCombination {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    alt: string;
    garmentId?: string; // Optional: ID of the garment model to use (e.g., 'oversized-hoodie')
    colors: {
        primary: string;
        secondary: string;
        accent: string;
    };
    material: string;
    features: string[];
}

export type TabType = 'colors' | 'materials' | 'features' | 'silhouette';

export interface HistoryState {
    past: CustomizationState[];
    present: CustomizationState;
    future: CustomizationState[];
}