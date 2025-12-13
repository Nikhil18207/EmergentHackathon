import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import InstructionHeader from './components/InstructionHeader';
import InputMethodGrid from './components/InputMethodGrid';
import ComparisonTable from './components/ComparisonTable';
import { InputMethod } from './types';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';

const MultiInputSelection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { messages, closeToast, info } = useToast();

    const inputMethods: InputMethod[] = [
        {
            id: 'voice',
            name: 'Voice Input',
            description: 'Speak your design vision naturally and let AI transform your words into detailed specifications with real-time transcription.',
            icon: 'Mic',
            estimatedTime: '2-3 min',
            creditCost: 15,
            route: '/voice-input-flow',
            isPopular: true,
            difficulty: 'beginner',
            features: [
                'Real-time voice transcription',
                'Natural language processing',
                'Hands-free design creation'
            ]
        },
        {
            id: 'text',
            name: 'Text Input',
            description: 'Type your design ideas with fashion vocabulary assistance and smart suggestions for precise specification generation.',
            icon: 'FileText',
            estimatedTime: '3-4 min',
            creditCost: 12,
            route: '/text-input-flow',
            difficulty: 'beginner',
            features: [
                'Fashion vocabulary helper',
                'Smart auto-suggestions',
                'Character counter with guidance'
            ]
        },
        {
            id: 'moodboard',
            name: 'Mood Board',
            description: 'Upload inspiration images from Instagram, Pinterest, or your gallery to create a visual design direction.',
            icon: 'Image',
            estimatedTime: '4-5 min',
            creditCost: 20,
            route: '/mood-board-flow',
            difficulty: 'intermediate',
            features: [
                'Multi-image upload support',
                'AI visual analysis',
                'Trend extraction from images'
            ]
        },
        {
            id: 'questionnaire',
            name: 'Guided Questionnaire',
            description: 'Answer structured questions about garment type, silhouette, colors, features, and price targets for comprehensive specs.',
            icon: 'ClipboardList',
            estimatedTime: '5-6 min',
            creditCost: 10,
            route: '/questionnaire-flow',
            isPopular: true,
            difficulty: 'beginner',
            features: [
                'Step-by-step guidance',
                'Pre-defined options',
                'Comprehensive specifications'
            ]
        },
        {
            id: 'template',
            name: 'Template Selection',
            description: 'Choose from 7 pre-built fashion templates and customize them to match your unique design vision quickly.',
            icon: 'Layout',
            estimatedTime: '2-3 min',
            creditCost: 8,
            route: '/template-selection-flow',
            difficulty: 'beginner',
            features: [
                '7 professional templates',
                'Quick customization',
                'Fastest creation method'
            ]
        },
        {
            id: '3d-customizer',
            name: '3D Customizer',
            description: 'Design in real-time with interactive 3D visualization, material editing, and silhouette morphing for advanced creators.',
            icon: 'Box',
            estimatedTime: '8-10 min',
            creditCost: 25,
            route: '/3d-customizer-flow',
            difficulty: 'advanced',
            features: [
                'Real-time 3D preview',
                'Material and texture editing',
                'Advanced silhouette control'
            ]
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            info(
                'First Time Here?',
                'Start with Voice Input or Questionnaire for the easiest experience!',
                8000
            );
        }, 1000);

        return () => clearTimeout(timer);
    }, [info]);

    const handleMethodSelect = (methodId: string) => {
        const method = inputMethods.find(m => m.id === methodId);
        if (method) {
            console.log(`Selected method: ${method.name}`);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                    <p className="font-caption text-muted-foreground">
                        Loading creative options...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Choose Your Input Method - TrendPilot</title>
                <meta
                    name="description"
                    content="Select your preferred design creation method from voice, text, mood board, questionnaire, template, or 3D customizer. Transform fashion ideas into manufacturable designs in under 3 minutes."
                />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main className="pt-24 pb-16 px-6">
                    <div className="max-w-[1400px] mx-auto">
                        <InstructionHeader />

                        <InputMethodGrid
                            methods={inputMethods}
                            onMethodSelect={handleMethodSelect}
                        />

                        <ComparisonTable methods={inputMethods} />

                        <div className="mt-16 text-center">
                            <div className="glass border border-border rounded-lg p-8 max-w-2xl mx-auto">
                                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16 4L8 10V20L16 26L24 20V10L16 4Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-primary"
                                        />
                                        <path
                                            d="M16 4V16M16 16L8 20M16 16L24 20"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-primary"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                                    Not Sure Where to Start?
                                </h3>
                                <p className="font-caption text-muted-foreground mb-4">
                                    Try our Voice Input or Guided Questionnaire for the easiest experience. Both methods are perfect for beginners and provide comprehensive design specifications.
                                </p>
                                <p className="text-sm font-caption text-muted-foreground">
                                    Need help? Contact our support team at{' '}
                                    <a
                                        href="mailto:support@trendpilot.ai"
                                        className="text-primary hover:text-primary/80 animate-spring-fast"
                                    >
                                        support@trendpilot.ai
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                <ToastContainer messages={messages} onClose={closeToast} />
            </div>
        </>
    );
};

export default MultiInputSelection;