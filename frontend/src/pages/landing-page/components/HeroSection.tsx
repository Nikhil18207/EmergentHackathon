import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/ui/AppIcon';
import { HeroStats } from '../types';

const HeroSection = () => {
    const navigate = useNavigate();

    const stats: HeroStats[] = [
        { value: '3 min', label: 'Design to Launch' },
        { value: '10K+', label: 'Designs Created' },
        { value: '95%', label: 'Success Rate' }
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient-shift" />

            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl animate-pulse delay-2000" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/50 mb-8 animate-fade-in">
                    <Icon name="Sparkles" size={16} className="text-primary" />
                    <span className="text-sm font-caption text-foreground">AI-Powered Fashion Design Studio</span>
                </div>

                <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl mb-6 animate-fade-in-up delay-100">
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                        Transform Trends
                    </span>
                    <br />
                    <span className="text-foreground">Into Fashion Reality</span>
                </h1>

                <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-in-up delay-200">
                    Compress your fashion design-to-launch cycle from 8 weeks to 3 minutes with AI-powered design generation, supplier matching, and Web3 integration.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
                    <Button
                        variant="default"
                        size="lg"
                        onClick={() => navigate('/authentication')}
                        iconName="Rocket"
                        iconPosition="right"
                        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-primary text-lg px-8 py-6"
                    >
                        Start Creating Now
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigate('/multi-input-selection')}
                        iconName="Play"
                        iconPosition="left"
                        className="border-primary/50 hover:border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
                    >
                        Watch Demo
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up delay-400">
                    {stats.map((stat, index) => (
                        <div key={index} className="glass-strong rounded-lg p-6 border border-border hover:border-primary/50 animate-spring">
                            <div className="font-heading font-bold text-3xl md:text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                                {stat.value}
                            </div>
                            <div className="font-caption text-sm text-muted-foreground">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <Icon name="ChevronDown" size={32} className="text-muted-foreground" />
            </div>
        </section>
    );
};

export default HeroSection;