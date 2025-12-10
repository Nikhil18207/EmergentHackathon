export type InputMethod = 'text' | 'voice' | 'image' | 'measurement';

export interface InputMethodInfo {
    icon: string;
    title: string;
    description: string;
}

export interface ComparisonMetrics {
    speed: number;
    accuracy: number;
    easeOfUse: number;
}

export interface InputMethodData {
    method: InputMethod;
    metrics: ComparisonMetrics;
    bestFor: string[];
    pros: string[];
    cons: string[];
}

export interface SelectionState {
    selectedMethods: InputMethod[];
    currentStep: number;
    isComplete: boolean;
}

export interface StepConfig {
    step: number;
    title: string;
    description: string;
    allowMultiple: boolean;
}

export interface InputPreferences {
    primaryMethod: InputMethod;
    secondaryMethods: InputMethod[];
    skipTutorial: boolean;
}
