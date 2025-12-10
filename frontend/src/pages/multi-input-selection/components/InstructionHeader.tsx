import Icon from '../../../components/ui/AppIcon';

const InstructionHeader = () => {
    return (
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
                <Icon name="Sparkles" size={18} className="text-primary" />
                <span className="text-sm font-caption font-medium text-primary">
                    Choose Your Creative Path
                </span>
            </div>

            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
                How Would You Like to{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Create Today?
                </span>
            </h1>

            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
                Select your preferred input method and transform your fashion vision into a manufacturable design in under 3 minutes.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-caption text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Icon name="Zap" size={18} className="text-accent" />
                    <span>Lightning Fast</span>
                </div>
                <div className="flex items-center gap-2">
                    <Icon name="Shield" size={18} className="text-success" />
                    <span>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={18} className="text-primary" />
                    <span>Trend-Driven</span>
                </div>
            </div>
        </div>
    );
};

export default InstructionHeader;