import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/AppIcon';

const Footer = () => {
    const navigate = useNavigate();
    const currentYear = new Date()?.getFullYear();

    const footerLinks = {
        product: [
            { label: 'Features', path: '/landing-page' },
            { label: 'Create Design', path: '/multi-input-selection' },
            { label: 'Voice Input', path: '/voice-input-flow' },
            { label: '3D Customizer', path: '/3d-customizer-flow' }
        ],
        company: [
            { label: 'About Us', path: '/landing-page' },
            { label: 'Careers', path: '/landing-page' },
            { label: 'Blog', path: '/landing-page' },
            { label: 'Press Kit', path: '/landing-page' }
        ],
        resources: [
            { label: 'Documentation', path: '/landing-page' },
            { label: 'API Reference', path: '/landing-page' },
            { label: 'Community', path: '/landing-page' },
            { label: 'Support', path: '/landing-page' }
        ],
        legal: [
            { label: 'Privacy Policy', path: '/landing-page' },
            { label: 'Terms of Service', path: '/landing-page' },
            { label: 'Cookie Policy', path: '/landing-page' },
            { label: 'Licenses', path: '/landing-page' }
        ]
    };

    const socialLinks = [
        { icon: 'Twitter', label: 'Twitter', url: '#' },
        { icon: 'Instagram', label: 'Instagram', url: '#' },
        { icon: 'Linkedin', label: 'LinkedIn', url: '#' },
        { icon: 'Github', label: 'GitHub', url: '#' }
    ];

    return (
        <footer className="relative border-t border-border bg-background">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative">
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <defs>
                                        <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#8B5CF6" />
                                            <stop offset="100%" stopColor="#3B82F6" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="20" cy="20" r="18" fill="url(#footerLogoGradient)" opacity="0.2" />
                                    <path
                                        d="M12 14L20 8L28 14V26L20 32L12 26V14Z"
                                        stroke="url(#footerLogoGradient)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                    <path
                                        d="M20 8V20M20 20L12 26M20 20L28 26"
                                        stroke="url(#footerLogoGradient)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className="font-heading font-bold text-xl text-foreground">
                                VirtualTwin
                            </span>
                        </div>
                        <p className="font-body text-muted-foreground mb-6 max-w-xs">
                            Transform fashion trends into reality with AI-powered design tools and Web3 integration.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks?.map((social) => (
                                <a
                                    key={social?.label}
                                    href={social?.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg glass border border-border hover:border-primary/50 flex items-center justify-center animate-spring hover:shadow-subtle"
                                    aria-label={social?.label}
                                >
                                    <Icon name={social?.icon} size={18} className="text-muted-foreground hover:text-primary" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-foreground mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks?.product?.map((link) => (
                                <li key={link?.label}>
                                    <button
                                        onClick={() => navigate(link?.path)}
                                        className="font-caption text-muted-foreground hover:text-primary animate-spring text-left"
                                    >
                                        {link?.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-foreground mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks?.company?.map((link) => (
                                <li key={link?.label}>
                                    <button
                                        onClick={() => navigate(link?.path)}
                                        className="font-caption text-muted-foreground hover:text-primary animate-spring text-left"
                                    >
                                        {link?.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-foreground mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks?.resources?.map((link) => (
                                <li key={link?.label}>
                                    <button
                                        onClick={() => navigate(link?.path)}
                                        className="font-caption text-muted-foreground hover:text-primary animate-spring text-left"
                                    >
                                        {link?.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-foreground mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks?.legal?.map((link) => (
                                <li key={link?.label}>
                                    <button
                                        onClick={() => navigate(link?.path)}
                                        className="font-caption text-muted-foreground hover:text-primary animate-spring text-left"
                                    >
                                        {link?.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="font-caption text-sm text-muted-foreground">
                            &copy; {currentYear} VirtualTwin. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm font-caption text-muted-foreground">
                            <span>Built with AI & Web3</span>
                            <div className="flex items-center gap-2">
                                <Icon name="Shield" size={16} className="text-success" />
                                <span>Blockchain Secured</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;