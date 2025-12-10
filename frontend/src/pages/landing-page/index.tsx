import { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import WorkflowSection from './components/WorkflowSection';
import TestimonialsSection from './components/TestimonialsSection';
import SponsorsSection from './components/SponsorsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingPage = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('section');
        sections?.forEach((section) => observer?.observe(section));

        return () => {
            sections?.forEach((section) => observer?.unobserve(section));
        };
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-16">
                <HeroSection />
                <FeaturesSection />
                <WorkflowSection />
                <TestimonialsSection />
                <SponsorsSection />
                <CTASection />
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;