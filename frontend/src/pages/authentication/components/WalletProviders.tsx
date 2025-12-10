import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';
import { WalletProvider } from '../types';

interface WalletProvidersProps {
    providers: WalletProvider[];
    isConnecting: boolean;
    onConnect: (providerId: string) => void;
}

const WalletProviders = ({ providers, isConnecting, onConnect }: WalletProvidersProps) => {
    return (
        <div className="space-y-3">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground font-caption">
                        Or connect with Web3
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {providers.map((provider) => (
                    <Button
                        key={provider.id}
                        variant="outline"
                        onClick={() => onConnect(provider.id)}
                        disabled={isConnecting}
                        loading={isConnecting}
                        className="justify-start border-border hover:border-primary/50 hover:bg-primary/5"
                    >
                        <Icon name={provider.icon} size={20} className="text-primary" />
                        <span className="font-body text-sm">{provider.name}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default WalletProviders;