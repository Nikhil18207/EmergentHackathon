import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/ui/AppIcon';

const CTASection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />

            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-64 h-64 bg-primary/40 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/40 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <div className="glass-strong rounded-3xl p-12 border border-primary/50 shadow-primary">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/50 mb-6">
                        <Icon name="Rocket" size={16} className="text-accent" />
                        <span className="text-sm font-caption text-foreground">Ready to Launch?</span>
                    </div>

                    <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">
                        <span className="text-foreground">Start Creating Your</span>
                        <br />
                        <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Fashion Empire Today
                        </span>
                    </h2>

                    <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                        Join thousands of fashion creators who are transforming trends into reality with AI-powered design tools and Web3 integration.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <Button
                            variant="default"
                            size="lg"
                            onClick={() => navigate('/authentication')}
                            iconName="Sparkles"
                            iconPosition="right"
                            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-primary text-lg px-8 py-6"
                        >
                            Get Started Free
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => navigate('/voice-input-flow')}
                            iconName="Mic"
                            iconPosition="left"
                            className="border-primary/50 hover:border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
                        >
                            Try Voice Input
                        </Button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-caption text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Icon name="CheckCircle2" size={16} className="text-success" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Icon name="CheckCircle2" size={16} className="text-success" />
                            <span>150 free credits</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Icon name="CheckCircle2" size={16} className="text-success" />
                            <span>Cancel anytime</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;