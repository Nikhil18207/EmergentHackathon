import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ui/ScrollToTop";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import NotFound from "./pages/NotFound";
import Authentication from './pages/authentication';
import LandingPage from './pages/landing-page';
import MultiInputSelection from './pages/multi-input-selection';
import ThreeDCustomizerFlow from './pages/3d-customizer-flow';
import VoiceInputFlow from './pages/voice-input-flow';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <ScrollToTop />
                <RouterRoutes>
                    {/* Define your routes here */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/authentication" element={<Authentication />} />
                    <Route path="/landing-page" element={<LandingPage />} />
                    <Route path="/multi-input-selection" element={<MultiInputSelection />} />
                    <Route path="/3d-customizer-flow" element={<ThreeDCustomizerFlow />} />
                    <Route path="/voice-input-flow" element={<VoiceInputFlow />} />
                    <Route path="*" element={<NotFound />} />
                </RouterRoutes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default Routes;
