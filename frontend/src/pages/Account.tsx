import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import authStore, { authActions } from '../store/authStore';

const Account: React.FC = () => {
  const { user, isAuthenticated } = useSnapshot(authStore);
  const navigate = useNavigate();

  const handleLogout = () => {
    authActions.logout();
    navigate('/authentication');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
            Not Logged In
          </h2>
          <p className="text-muted-foreground mb-6">
            Please log in to view your account
          </p>
          <button
            onClick={() => navigate('/authentication')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Account Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your profile and preferences
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
            Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Display Name
              </label>
              <div className="text-foreground font-medium">
                {user.displayName}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Email Address
              </label>
              <div className="text-foreground font-medium">
                {user.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Role
              </label>
              <div className="text-foreground font-medium capitalize">
                {user.role}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Member Since
              </label>
              <div className="text-foreground font-medium">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
            Account Actions
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/multi-input-selection')}
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-left"
            >
              <div className="font-semibold">Go to Dashboard</div>
              <div className="text-sm opacity-90">Start creating your designs</div>
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity text-left"
            >
              <div className="font-semibold">Logout</div>
              <div className="text-sm opacity-90">Sign out of your account</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
