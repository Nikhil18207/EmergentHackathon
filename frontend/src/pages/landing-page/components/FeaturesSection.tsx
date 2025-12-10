import Icon from '../../../components/ui/AppIcon';
import { Feature } from '../types';

const FeaturesSection = () => {
    const features: Feature[] = [
        {
            id: '1',
            icon: 'Zap',
            title: '3-Minute Design Process',
            description: 'Transform your fashion ideas into manufacturable designs with AI-powered generation, supplier matching, and campaign videos in under 3 minutes.',
            highlight: '96x Faster'
        },
        {
            id: '2',
            icon: 'Brain',
            title: 'AI-Powered Intelligence',
            description: 'Leverage OpenAI GPT-4 for design specs, Whisper for voice input, and Luma AI for stunning campaign videos that bring your designs to life.',
            highlight: 'Multi-AI Stack'
        },
        {
            id: '3',
            icon: 'Wallet',
            title: 'Web3 Integration',
            description: 'Mint NFTs on Polygon blockchain, accept crypto payments, and create pre-order pages with built-in profitability analysis and royalty settings.',
            highlight: 'Blockchain-Backed'
        }
    ];

    return (
        <section className="relative py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-secondary/50 mb-6">
                        <Icon name="Star" size={16} className="text-secondary" />
                        <span className="text-sm font-caption text-foreground">Platform Features</span>
                    </div>
                    <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
                        <span className="text-foreground">Everything You Need to</span>
                        <br />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Launch Your Fashion Line
                        </span>
                    </h2>
                    <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                        From trend discovery to manufacturing, our AI-powered platform handles every step of your fashion design journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className="group glass-strong rounded-2xl p-8 border border-border hover:border-primary/50 animate-spring hover:shadow-primary"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 animate-spring">
                                    <Icon name={feature.icon} size={32} className="text-primary" />
                                </div>
                                <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/50">
                                    <span className="text-xs font-caption font-semibold text-accent">
                                        {feature.highlight}
                                    </span>
                                </div>
                            </div>

                            <h3 className="font-heading font-semibold text-xl text-foreground mb-3 group-hover:text-primary animate-spring">
                                {feature.title}
                            </h3>
                            <p className="font-body text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-primary group-hover:gap-3 animate-spring">
                                <span className="text-sm font-caption font-medium">Learn more</span>
                                <Icon name="ArrowRight" size={16} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;