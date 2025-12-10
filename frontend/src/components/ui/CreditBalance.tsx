import { useState, useEffect } from 'react';
import Icon from './AppIcon';
import Button from './Button';

interface CreditBalanceProps {
    className?: string;
}

interface CreditState {
    balance: number;
    currency: string;
}

const CreditBalance = ({ className = '' }: CreditBalanceProps) => {
    const [creditState, setCreditState] = useState<CreditState>({
        balance: 150,
        currency: 'Credits'
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLowBalance, setIsLowBalance] = useState(false);

    useEffect(() => {
        const savedCredits = localStorage.getItem('creditBalance');
        if (savedCredits) {
            try {
                const parsed = JSON.parse(savedCredits);
                setCreditState(parsed);
                setIsLowBalance(parsed.balance < 50);
            } catch (error) {
                console.error('Failed to parse credit balance:', error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('creditBalance', JSON.stringify(creditState));
        setIsLowBalance(creditState.balance < 50);
    }, [creditState]);

    const formatBalance = (balance: number) => {
        return balance.toLocaleString();
    };

    const handleAddCredits = () => {
        setIsDropdownOpen(false);
    };

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`
          flex items-center gap-2 px-3 py-2 rounded-lg glass border animate-spring-fast group
          ${isLowBalance
                        ? 'border-warning/50 hover:border-warning' : 'border-border hover:border-primary/50'
                    }
        `}
                aria-label="Credit balance menu"
                aria-expanded={isDropdownOpen}
            >
                <Icon
                    name="Coins"
                    size={18}
                    className={isLowBalance ? 'text-warning' : 'text-accent'}
                />
                <div className="hidden sm:flex flex-col items-start">
                    <span className="font-data text-sm text-foreground font-medium">
                        {formatBalance(creditState.balance)}
                    </span>
                    <span className="text-xs font-caption text-muted-foreground">
                        {creditState.currency}
                    </span>
                </div>
                <span className="sm:hidden font-data text-sm text-foreground font-medium">
                    {formatBalance(creditState.balance)}
                </span>
            </button>

            {isDropdownOpen && (
                <>
                    <div
                        className="fixed inset-0 z-[150]"
                        onClick={() => setIsDropdownOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="absolute right-0 top-full mt-2 w-80 glass-strong border border-border rounded-lg shadow-primary z-[200] animate-slide-in-from-top">
                        <div className="p-4 border-b border-border">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                                    Credit Balance
                                </span>
                                {isLowBalance && (
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-warning/10">
                                        <Icon name="AlertTriangle" size={12} className="text-warning" />
                                        <span className="text-xs font-caption text-warning">Low Balance</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-data text-3xl text-foreground font-bold">
                                    {formatBalance(creditState.balance)}
                                </span>
                                <span className="text-sm font-caption text-muted-foreground">
                                    {creditState.currency}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-caption text-muted-foreground">This Month Usage</span>
                                <span className="font-data text-foreground">245 Credits</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-caption text-muted-foreground">Average per Design</span>
                                <span className="font-data text-foreground">12 Credits</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-spring"
                                    style={{ width: `${(creditState.balance / 500) * 100}%` }}
                                />
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-caption text-muted-foreground">0</span>
                                <span className="font-caption text-muted-foreground">500 Credits</span>
                            </div>
                        </div>

                        <div className="p-4 border-t border-border space-y-2">
                            <Button
                                variant="default"
                                fullWidth
                                onClick={handleAddCredits}
                                iconName="Plus"
                                iconPosition="left"
                                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                            >
                                Add Credits
                            </Button>
                            <Button
                                variant="ghost"
                                fullWidth
                                iconName="History"
                                iconPosition="left"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                View Usage History
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CreditBalance;