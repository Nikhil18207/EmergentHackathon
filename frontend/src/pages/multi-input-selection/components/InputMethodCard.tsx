import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import { InputMethodCardProps } from '../types';

const InputMethodCard = ({ method, onSelect, isHovered, onHover }: InputMethodCardProps) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSelect = async () => {
        setIsLoading(true);
        onSelect(method.id);

        setTimeout(() => {
            navigate(method.route);
        }, 800);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner':
                return 'bg-success/20 text-success border-success/30';
            case 'intermediate':
                return 'bg-warning/20 text-warning border-warning/30';
            case 'advanced':
                return 'bg-error/20 text-error border-error/30';
            default:
                return 'bg-muted/20 text-muted-foreground border-muted/30';
        }
    };

    return (
        <div
            className={`
        relative group glass border border-border rounded-lg p-6
        animate-spring cursor-pointer
        ${isHovered ? 'scale-105 shadow-primary border-primary/50' : 'hover:scale-105 hover:shadow-primary hover:border-primary/50'}
        ${isLoading ? 'opacity-50 pointer-events-none' : ''}
      `}
            onMouseEnter={() => onHover(method.id)}
            onMouseLeave={() => onHover(null)}
            onClick={handleSelect}
            role="button"
            tabIndex={0}
            aria-label={`Select ${method.name} input method`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect();
                }
            }}
        >
            {method.isPopular && (
                <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full shadow-primary">
                        <span className="text-xs font-caption font-semibold text-primary-foreground uppercase tracking-wide">
                            Popular
                        </span>
                    </div>
                </div>
            )}

            <div className="flex items-start justify-between mb-4">
                <div className={`
          w-14 h-14 rounded-xl flex items-center justify-center
          bg-gradient-to-br from-primary/20 to-secondary/20
          group-hover:from-primary/30 group-hover:to-secondary/30
          animate-spring
        `}>
                    <Icon
                        name={method.icon}
                        size={28}
                        className="text-primary group-hover:scale-110 animate-spring"
                    />
                </div>

                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/20 border border-accent/30">
                        <Icon name="Coins" size={14} className="text-accent" />
                        <span className="text-xs font-data font-semibold text-accent">
                            {method.creditCost}
                        </span>
                    </div>
                    <div className={`px-2 py-1 rounded-full border text-xs font-caption font-medium ${getDifficultyColor(method.difficulty)}`}>
                        {method.difficulty}
                    </div>
                </div>
            </div>

            <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary animate-spring">
                {method.name}
            </h3>

            <p className="font-caption text-sm text-muted-foreground mb-4 line-clamp-2">
                {method.description}
            </p>

            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm font-caption text-muted-foreground">
                    {method.estimatedTime}
                </span>
            </div>

            <div className="space-y-2 mb-6">
                {method.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                        <Icon
                            name="CheckCircle2"
                            size={16}
                            className="text-success flex-shrink-0 mt-0.5"
                        />
                        <span className="text-xs font-caption text-foreground">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>

            <Button
                variant="outline"
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                loading={isLoading}
                className="border-primary/50 hover:border-primary text-primary hover:bg-primary/10"
            >
                {isLoading ? 'Loading...' : 'Start Creating'}
            </Button>

            {isLoading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <Icon name="Loader2" size={32} className="text-primary animate-spin" />
                        <span className="text-sm font-caption text-foreground">
                            Preparing workspace...
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputMethodCard;