import Icon from '../../../components/ui/AppIcon';
import { WorkflowStep } from '../types';

const WorkflowSection = () => {
    const steps: WorkflowStep[] = [
        {
            id: '1',
            step: 1,
            title: 'Choose Your Input Method',
            description: 'Select from voice, text, mood board, questionnaire, template, or 3D customizer to express your design vision.',
            duration: '30 sec'
        },
        {
            id: '2',
            step: 2,
            title: 'AI Generates Design Specs',
            description: 'OpenAI GPT-4 transforms your input into detailed technical specifications with materials, measurements, and features.',
            duration: '45 sec'
        },
        {
            id: '3',
            step: 3,
            title: 'Supplier Matching',
            description: 'Our algorithm matches you with verified suppliers based on capabilities, pricing, and risk assessment scores.',
            duration: '30 sec'
        },
        {
            id: '4',
            step: 4,
            title: 'Campaign Video Creation',
            description: 'Luma AI generates stunning campaign videos with multiple style variants to showcase your design.',
            duration: '45 sec'
        },
        {
            id: '5',
            step: 5,
            title: 'Pre-Order Page Setup',
            description: 'Automated page generation with pricing calculator, profitability analysis, and NFT minting options.',
            duration: '30 sec'
        },
        {
            id: '6',
            step: 6,
            title: 'Launch & Share',
            description: 'Share across social platforms with AI-generated copy, QR codes, and OpenSea marketplace integration.',
            duration: '20 sec'
        }
    ];

    return (
        <section className="relative py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/50 mb-6">
                        <Icon name="Workflow" size={16} className="text-accent" />
                        <span className="text-sm font-caption text-foreground">How It Works</span>
                    </div>
                    <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
                        <span className="text-foreground">From Idea to Launch in</span>
                        <br />
                        <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                            Just 3 Minutes
                        </span>
                    </h2>
                    <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                        Our streamlined workflow eliminates weeks of manual work with AI-powered automation at every step.
                    </p>
                </div>

                <div className="relative">
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2" />

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="glass-strong rounded-2xl p-6 border border-border hover:border-primary/50 animate-spring hover:shadow-primary">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`px-3 py-1 rounded-full bg-gradient-to-r from-primary to-secondary ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                                                <span className="text-xs font-caption font-bold text-foreground">
                                                    {step.duration}
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="font-body text-muted-foreground">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="relative flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-primary">
                                        <span className="font-heading font-bold text-2xl text-foreground">
                                            {step.step}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-50 blur-xl animate-pulse" />
                                </div>

                                <div className="flex-1 md:block hidden" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-strong border border-success/50">
                        <Icon name="CheckCircle2" size={20} className="text-success" />
                        <span className="font-caption text-foreground">
                            <span className="font-semibold">Total Time:</span> Under 3 minutes from start to finish
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkflowSection;