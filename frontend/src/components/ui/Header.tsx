import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';
import WalletConnection from './WalletConnection';
import CreditBalance from './CreditBalance';

interface HeaderProps {
    className?: string;
}

interface NavItem {
    label: string;
    path: string;
    icon: string;
    tooltip: string;
}

const Header = ({ className = '' }: HeaderProps) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems: NavItem[] = [
        {
            label: 'Create',
            path: '/multi-input-selection',
            icon: 'Sparkles',
            tooltip: 'Start creating your design'
        },
        {
            label: 'Portfolio',
            path: '/portfolio',
            icon: 'LayoutGrid',
            tooltip: 'View your designs'
        },
        {
            label: 'Account',
            path: '/account',
            icon: 'User',
            tooltip: 'Manage your account'
        }
    ];

    const isActive = (path: string) => location.pathname === path;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-[100] ${className}`}>
            <div className="glass-strong border-b border-border">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        <Link
                            to="/landing-page"
                            className="flex items-center gap-3 group animate-spring-fast hover:opacity-80"
                            aria-label="TrendPilot Home"
                        >
                            <div className="relative">
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="drop-shadow-lg"
                                >
                                    <defs>
                                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#8B5CF6" />
                                            <stop offset="100%" stopColor="#3B82F6" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" opacity="0.2" />
                                    <path
                                        d="M12 14L20 8L28 14V26L20 32L12 26V14Z"
                                        stroke="url(#logoGradient)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                    <path
                                        d="M20 8V20M20 20L12 26M20 20L28 26"
                                        stroke="url(#logoGradient)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className="font-heading font-bold text-xl text-foreground tracking-tight">
                                TrendPilot
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg
                    font-body font-medium text-sm
                    animate-spring-fast
                    ${isActive(item.path)
                                            ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                        }
                  `}
                                    title={item.tooltip}
                                >
                                    <Icon name={item.icon} size={18} />
                                    <span>{item.label}</span>
                                    {isActive(item.path) && (
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-3">
                            <CreditBalance />
                            <WalletConnection />

                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted/50 animate-spring-fast"
                                aria-label="Toggle mobile menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden glass-strong border-b border-border animate-slide-in-from-top">
                    <nav className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-2" aria-label="Mobile navigation">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  font-body font-medium text-base
                  animate-spring-fast
                  ${isActive(item.path)
                                        ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                    }
                `}
                            >
                                <Icon name={item.icon} size={20} />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;