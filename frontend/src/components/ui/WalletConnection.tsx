import { useState, useEffect } from 'react';
import Icon from './AppIcon';
import Button from './Button';

interface WalletConnectionProps {
    className?: string;
}

interface WalletState {
    isConnected: boolean;
    address: string | null;
    balance: string | null;
}

const WalletConnection = ({ className = '' }: WalletConnectionProps) => {
    const [walletState, setWalletState] = useState<WalletState>({
        isConnected: false,
        address: null,
        balance: null
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    useEffect(() => {
        const savedWallet = localStorage.getItem('walletConnection');
        if (savedWallet) {
            try {
                const parsed = JSON.parse(savedWallet);
                setWalletState(parsed);
            } catch (error) {
                console.error('Failed to parse wallet connection:', error);
            }
        }
    }, []);

    const truncateAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const handleConnect = async () => {
        setIsConnecting(true);

        setTimeout(() => {
            const mockWallet: WalletState = {
                isConnected: true,
                address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
                balance: '2.45 ETH'
            };

            setWalletState(mockWallet);
            localStorage.setItem('walletConnection', JSON.stringify(mockWallet));
            setIsConnecting(false);
            setIsDropdownOpen(false);
        }, 1500);
    };

    const handleDisconnect = () => {
        setWalletState({
            isConnected: false,
            address: null,
            balance: null
        });
        localStorage.removeItem('walletConnection');
        setIsDropdownOpen(false);
    };

    const copyAddress = () => {
        if (walletState.address) {
            navigator.clipboard.writeText(walletState.address);
        }
    };

    return (
        <div className={`relative ${className}`}>
            {walletState.isConnected ? (
                <>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg glass border border-border hover:border-primary/50 animate-spring-fast group"
                        aria-label="Wallet menu"
                        aria-expanded={isDropdownOpen}
                    >
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        <span className="hidden sm:inline font-data text-sm text-foreground">
                            {truncateAddress(walletState.address!)}
                        </span>
                        <Icon
                            name="Wallet"
                            size={18}
                            className="text-primary group-hover:text-primary/80"
                        />
                    </button>

                    {isDropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-[150]"
                                onClick={() => setIsDropdownOpen(false)}
                                aria-hidden="true"
                            />
                            <div className="absolute right-0 top-full mt-2 w-72 glass-strong border border-border rounded-lg shadow-primary z-[200] animate-slide-in-from-top">
                                <div className="p-4 border-b border-border">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-caption text-muted-foreground uppercase tracking-wide">
                                            Connected Wallet
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 rounded-full bg-success" />
                                            <span className="text-xs font-caption text-success">Active</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-data text-sm text-foreground flex-1">
                                            {walletState.address}
                                        </span>
                                        <button
                                            onClick={copyAddress}
                                            className="p-1.5 rounded hover:bg-muted/50 animate-spring-fast"
                                            aria-label="Copy address"
                                        >
                                            <Icon name="Copy" size={16} className="text-muted-foreground" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 border-b border-border">
                                    <div className="text-xs font-caption text-muted-foreground mb-1">
                                        Balance
                                    </div>
                                    <div className="font-data text-lg text-foreground">
                                        {walletState.balance}
                                    </div>
                                </div>

                                <div className="p-2">
                                    <Button
                                        variant="ghost"
                                        fullWidth
                                        onClick={handleDisconnect}
                                        iconName="LogOut"
                                        iconPosition="left"
                                        className="justify-start text-error hover:text-error hover:bg-error/10"
                                    >
                                        Disconnect Wallet
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <Button
                    variant="outline"
                    onClick={handleConnect}
                    loading={isConnecting}
                    iconName="Wallet"
                    iconPosition="left"
                    className="border-primary/50 hover:border-primary text-primary hover:bg-primary/10"
                >
                    <span className="hidden sm:inline">Connect Wallet</span>
                    <span className="sm:hidden">Connect</span>
                </Button>
            )}
        </div>
    );
};

export default WalletConnection;