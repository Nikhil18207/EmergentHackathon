import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/AppIcon';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import ModelViewer from './components/ModelViewer';
import ColorPanel from './components/ColorPanel';
import MaterialPanel from './components/MaterialPanel';
import FeaturePanel from './components/FeaturePanel';
import SilhouettePanel from './components/SilhouettePanel';
import PresetSelector from './components/PresetSelector';
import GarmentSelector from './components/GarmentSelector';
import api from '../../services/api';
import {
    GarmentModel,
    ColorOption,
    MaterialOption,
    FeatureOption,
    SilhouetteControl,
    CustomizationState,
    TabType,
    PresetCombination,
    HistoryState
} from
    './types';

const ThreeDCustomizerFlow = () => {
    const navigate = useNavigate();
    const { messages, closeToast, success, error, info } = useToast();

    const [activeTab, setActiveTab] = useState<TabType>('colors');
    const [showPresets, setShowPresets] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [availableGarments, setAvailableGarments] = useState<GarmentModel[]>([]);
    const [availableMaterials, setAvailableMaterials] = useState<MaterialOption[]>([]);
    const [availableFeatures, setAvailableFeatures] = useState<FeatureOption[]>([]);

    // Fetch data from API
    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const [garmentsRes, materialsRes, featuresRes] = await Promise.all([
                    api.garments.getAll(),
                    api.materials.getAll(),
                    api.features.getAll()
                ]);

                if (garmentsRes.success && garmentsRes.data) {
                    setAvailableGarments(garmentsRes.data);
                }
                if (materialsRes.success && materialsRes.data) {
                    setAvailableMaterials(materialsRes.data);
                }
                if (featuresRes.success && featuresRes.data) {
                    setAvailableFeatures(featuresRes.data);
                }

                success('Data Loaded', `${garmentsRes.data?.length || 0} garments, ${materialsRes.data?.length || 0} materials, ${featuresRes.data?.length || 0} features loaded`);
            } catch (err) {
                error('Failed to Load Data', 'Could not connect to backend. Using default data.');
                console.error('Error fetching data:', err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [success, error]);

    const initialModel: GarmentModel = availableGarments[0] || {
        id: 'basic-tee',
        name: 'Basic T-Shirt',
        category: 'Tops',
        basePrice: 29.99,
        thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_183de6656-1764667408601.png",
        alt: 'White basic t-shirt on neutral background with clean design'
    };

    const initialSilhouetteControls: SilhouetteControl[] = [
        { id: 'fit', name: 'Fit', min: 0, max: 100, value: 50, unit: '%' },
        { id: 'length', name: 'Length', min: 60, max: 90, value: 75, unit: 'cm' },
        { id: 'shoulder', name: 'Shoulder Width', min: 40, max: 60, value: 50, unit: 'cm' },
        { id: 'waist', name: 'Waist', min: 70, max: 110, value: 90, unit: 'cm' },
        { id: 'sleeve', name: 'Sleeve Length', min: 15, max: 30, value: 22, unit: 'cm' },
        { id: 'hem', name: 'Hem Width', min: 40, max: 60, value: 50, unit: 'cm' }];


    const [customizationState, setCustomizationState] = useState<CustomizationState>({
        selectedModel: initialModel,
        selectedColors: {
            primary: null,
            secondary: null,
            accent: null
        },
        selectedMaterial: null,
        selectedFeatures: [],
        silhouetteControls: initialSilhouetteControls
    });

    const [history, setHistory] = useState<HistoryState>({
        past: [],
        present: customizationState,
        future: []
    });

    const updateHistory = useCallback((newState: CustomizationState) => {
        setHistory((prev) => ({
            past: [...prev.past, prev.present],
            present: newState,
            future: []
        }));
        setCustomizationState(newState);
    }, []);

    const handleGarmentSelect = useCallback((garment: GarmentModel) => {
        const newState = {
            ...customizationState,
            selectedModel: garment
        };
        updateHistory(newState);
        success('Garment Selected', `${garment.name} loaded`);
    }, [customizationState, updateHistory, success]);


    const handleUndo = useCallback(() => {
        if (history.past.length === 0) return;

        const previous = history.past[history.past.length - 1];
        const newPast = history.past.slice(0, -1);

        setHistory({
            past: newPast,
            present: previous,
            future: [history.present, ...history.future]
        });
        setCustomizationState(previous);
        info('Undo', 'Previous change reverted');
    }, [history, info]);

    const handleRedo = useCallback(() => {
        if (history.future.length === 0) return;

        const next = history.future[0];
        const newFuture = history.future.slice(1);

        setHistory({
            past: [...history.past, history.present],
            present: next,
            future: newFuture
        });
        setCustomizationState(next);
        info('Redo', 'Change reapplied');
    }, [history, info]);

    const handleColorSelect = useCallback((type: 'primary' | 'secondary' | 'accent', color: ColorOption) => {
        const newState = {
            ...customizationState,
            selectedColors: {
                ...customizationState.selectedColors,
                [type]: color
            }
        };
        updateHistory(newState);
        success('Color Applied', `${color.name} set as ${type} color`);
    }, [customizationState, updateHistory, success]);

    const handleMaterialSelect = useCallback((material: MaterialOption) => {
        const newState = {
            ...customizationState,
            selectedMaterial: material
        };
        updateHistory(newState);
        success('Material Selected', `${material.name} applied to garment`);
    }, [customizationState, updateHistory, success]);

    const handleFeatureToggle = useCallback((feature: FeatureOption) => {
        const isSelected = customizationState.selectedFeatures.some((f) => f.id === feature.id);
        const newFeatures = isSelected ?
            customizationState.selectedFeatures.filter((f) => f.id !== feature.id) :
            [...customizationState.selectedFeatures, { ...feature, enabled: true }];

        const newState = {
            ...customizationState,
            selectedFeatures: newFeatures
        };
        updateHistory(newState);

        if (isSelected) {
            info('Feature Removed', `${feature.name} removed from design`);
        } else {
            success('Feature Added', `${feature.name} added to design`);
        }
    }, [customizationState, updateHistory, success, info]);

    const handleSilhouetteChange = useCallback((id: string, value: number) => {
        const newControls = customizationState.silhouetteControls.map((control) =>
            control.id === id ? { ...control, value } : control
        );

        const newState = {
            ...customizationState,
            silhouetteControls: newControls
        };
        updateHistory(newState);
    }, [customizationState, updateHistory]);

    const handleSilhouetteReset = useCallback(() => {
        const newState = {
            ...customizationState,
            silhouetteControls: initialSilhouetteControls
        };
        updateHistory(newState);
        info('Silhouette Reset', 'All measurements restored to defaults');
    }, [customizationState, updateHistory, info]);

    const handlePresetSelect = useCallback((preset: PresetCombination) => {
        const primaryColor: ColorOption = {
            id: 'preset-primary',
            name: 'Preset Primary',
            hex: preset.colors.primary,
            category: 'solid'
        };

        const secondaryColor: ColorOption = {
            id: 'preset-secondary',
            name: 'Preset Secondary',
            hex: preset.colors.secondary,
            category: 'solid'
        };

        const accentColor: ColorOption = {
            id: 'preset-accent',
            name: 'Preset Accent',
            hex: preset.colors.accent,
            category: 'solid'
        };

        // Find the garment model if garmentId is specified in the preset
        let selectedGarment = customizationState.selectedModel;
        if (preset.garmentId) {
            const garment = availableGarments.find(g => g.id === preset.garmentId);
            if (garment) {
                selectedGarment = garment;
            }
        }

        const newState: CustomizationState = {
            ...customizationState,
            selectedModel: selectedGarment,
            selectedColors: {
                primary: primaryColor,
                secondary: secondaryColor,
                accent: accentColor
            }
        };

        updateHistory(newState);
        setShowPresets(false);
        success('Preset Applied', `${preset.name} loaded successfully`);
    }, [customizationState, updateHistory, success, availableGarments]);

    const calculateTotalCost = useCallback(() => {
        let total = customizationState.selectedModel?.basePrice || 0;

        if (customizationState.selectedMaterial) {
            total += customizationState.selectedMaterial.price;
        }

        customizationState.selectedFeatures.forEach((feature) => {
            total += feature.price;
        });

        return total.toFixed(2);
    }, [customizationState]);

    const handleSave = useCallback(async () => {
        if (!customizationState.selectedColors.primary) {
            error('Incomplete Design', 'Please select at least a primary color');
            return;
        }

        setIsSaving(true);

        setTimeout(() => {
            const designData = {
                ...customizationState,
                totalCost: calculateTotalCost(),
                timestamp: new Date().toISOString()
            };

            localStorage.setItem('3d-customizer-design', JSON.stringify(designData));
            setIsSaving(false);
            success('Design Saved', 'Your customization has been saved');
        }, 1500);
    }, [customizationState, calculateTotalCost, success, error]);

    const handleProceed = useCallback(() => {
        if (!customizationState.selectedColors.primary) {
            error('Incomplete Design', 'Please complete your customization before proceeding');
            return;
        }

        const designData = {
            ...customizationState,
            totalCost: calculateTotalCost(),
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('3d-customizer-design', JSON.stringify(designData));
        success('Design Complete', 'Proceeding to design studio');

        setTimeout(() => {
            navigate('/multi-input-selection');
        }, 1000);
    }, [customizationState, calculateTotalCost, navigate, success, error]);

    const tabs: { id: TabType; label: string; icon: string; }[] = [
        { id: 'colors', label: 'Colors', icon: 'Palette' },
        { id: 'materials', label: 'Materials', icon: 'Layers' },
        { id: 'features', label: 'Features', icon: 'Plus' },
        { id: 'silhouette', label: 'Silhouette', icon: 'Maximize2' }];


    return (
        <div className="min-h-screen bg-background">
            <Header />
            <ToastContainer messages={messages} onClose={closeToast} />

            <main className="pt-20 pb-8">
                {isLoading ? (
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="flex flex-col items-center justify-center min-h-[600px] space-y-4">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                            <h2 className="font-heading font-semibold text-xl text-foreground">Loading 3D Customizer...</h2>
                            <p className="font-caption text-muted-foreground">Fetching garments, materials, and features</p>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="mb-6">
                            <button
                                onClick={() => navigate('/multi-input-selection')}
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground animate-spring-fast">

                                <Icon name="ArrowLeft" size={20} />
                                <span className="font-caption text-sm">Back to Input Selection</span>
                            </button>
                        </div>

                        <div className="mb-8">
                            <h1 className="font-heading font-bold text-4xl text-foreground mb-2">
                                3D Garment Customizer
                            </h1>
                            <p className="font-caption text-lg text-muted-foreground">
                                Design your garment in real-time with interactive 3D visualization
                            </p>
                        </div>

                        {availableGarments.length > 0 && (
                            <div className="mb-8 glass-strong p-6 rounded-lg border border-border">
                                <GarmentSelector
                                    garments={availableGarments}
                                    selectedGarment={customizationState.selectedModel}
                                    onSelect={handleGarmentSelect}
                                />
                            </div>
                        )}

                        {showPresets &&
                            <div className="mb-8 glass-strong p-6 rounded-lg border border-border">
                                <PresetSelector onPresetSelect={handlePresetSelect} />
                                <div className="mt-4 text-center">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setShowPresets(false)}
                                        iconName="X"
                                        iconPosition="left">

                                        Start from Scratch
                                    </Button>
                                </div>
                            </div>
                        }

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="glass-strong p-4 rounded-lg border border-border">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="font-heading font-semibold text-xl text-foreground">
                                            3D Preview
                                        </h2>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={handleUndo}
                                                disabled={history.past.length === 0}
                                                iconName="Undo"
                                                aria-label="Undo" />

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={handleRedo}
                                                disabled={history.future.length === 0}
                                                iconName="Redo"
                                                aria-label="Redo" />

                                        </div>
                                    </div>
                                    <ModelViewer
                                        selectedModel={customizationState.selectedModel}
                                        selectedColors={customizationState.selectedColors}
                                        selectedMaterial={customizationState.selectedMaterial ? {
                                            roughness: 0.8,
                                            metalness: 0.0,
                                            textureFile: customizationState.selectedMaterial.texture
                                        } : null}
                                        selectedFeatures={customizationState.selectedFeatures}
                                        onRotate={() => { }}
                                        onZoom={() => { }}
                                        className="h-[1085px]" />

                                </div>

                                <div className="glass-strong p-4 rounded-lg border border-border">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-heading font-semibold text-foreground">Cost Summary</h3>
                                        <span className="font-data text-2xl text-accent font-bold">
                                            ${calculateTotalCost()}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-caption text-muted-foreground">Base Price</span>
                                            <span className="font-data text-foreground">
                                                ${customizationState.selectedModel?.basePrice.toFixed(2)}
                                            </span>
                                        </div>
                                        {customizationState.selectedMaterial &&
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-caption text-muted-foreground">Material</span>
                                                <span className="font-data text-foreground">
                                                    +${customizationState.selectedMaterial.price.toFixed(2)}
                                                </span>
                                            </div>
                                        }
                                        {customizationState.selectedFeatures.length > 0 &&
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-caption text-muted-foreground">Features</span>
                                                <span className="font-data text-foreground">
                                                    +${customizationState.selectedFeatures.reduce((sum, f) => sum + f.price, 0).toFixed(2)}
                                                </span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="glass-strong rounded-lg border border-border overflow-hidden">
                                    <div className="flex border-b border-border">
                                        {tabs.map((tab) =>
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`
                        flex-1 flex items-center justify-center gap-2 px-4 py-3
                        font-caption text-sm animate-spring-fast
                        ${activeTab === tab.id ?
                                                        'bg-primary text-primary-foreground' :
                                                        'text-muted-foreground hover:text-foreground hover:bg-muted/50'}
                      `
                                                }>

                                                <Icon name={tab.icon} size={18} />
                                                <span className="hidden sm:inline">{tab.label}</span>
                                            </button>
                                        )}
                                    </div>

                                    <div className="p-6 max-h-[600px] overflow-y-auto">
                                        {activeTab === 'colors' &&
                                            <ColorPanel
                                                selectedColors={customizationState.selectedColors}
                                                onColorSelect={handleColorSelect} />

                                        }
                                        {activeTab === 'materials' &&
                                            <MaterialPanel
                                                selectedMaterial={customizationState.selectedMaterial}
                                                onMaterialSelect={handleMaterialSelect} />

                                        }
                                        {activeTab === 'features' &&
                                            <FeaturePanel
                                                selectedFeatures={customizationState.selectedFeatures}
                                                onFeatureToggle={handleFeatureToggle} />

                                        }
                                        {activeTab === 'silhouette' &&
                                            <SilhouettePanel
                                                silhouetteControls={customizationState.silhouetteControls}
                                                onControlChange={handleSilhouetteChange}
                                                onReset={handleSilhouetteReset} />

                                        }
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        fullWidth
                                        onClick={handleSave}
                                        loading={isSaving}
                                        iconName="Save"
                                        iconPosition="left">

                                        Save Progress
                                    </Button>
                                    <Button
                                        variant="default"
                                        fullWidth
                                        onClick={handleProceed}
                                        iconName="ArrowRight"
                                        iconPosition="right"
                                        className="bg-gradient-to-r from-primary to-secondary">

                                        Proceed to Studio
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>);

};

export default ThreeDCustomizerFlow;