import { Dispatch, SetStateAction } from 'react';

interface AuthTabsProps {
    activeTab: 'login' | 'register';
    setActiveTab: Dispatch<SetStateAction<'login' | 'register'>>;
}

const AuthTabs = ({ activeTab, setActiveTab }: AuthTabsProps) => {
    return (
        <div className="flex gap-2 p-1 bg-muted/30 rounded-lg mb-6">
            <button
                onClick={() => setActiveTab('login')}
                className={`
          flex-1 py-3 px-4 rounded-lg font-heading font-semibold text-sm
          animate-spring-fast
          ${activeTab === 'login' ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
        `}
                aria-label="Switch to login"
                aria-selected={activeTab === 'login'}
            >
                Login
            </button>
            <button
                onClick={() => setActiveTab('register')}
                className={`
          flex-1 py-3 px-4 rounded-lg font-heading font-semibold text-sm
          animate-spring-fast
          ${activeTab === 'register' ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
        `}
                aria-label="Switch to register"
                aria-selected={activeTab === 'register'}
            >
                Register
            </button>
        </div>
    );
};

export default AuthTabs;