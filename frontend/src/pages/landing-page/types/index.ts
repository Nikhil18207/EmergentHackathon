export interface Feature {
    id: string;
    icon: string;
    title: string;
    description: string;
    highlight: string;
}

export interface WorkflowStep {
    id: string;
    step: number;
    title: string;
    description: string;
    duration: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    avatar: string;
    alt: string;
    content: string;
    rating: number;
}

export interface Sponsor {
    id: string;
    name: string;
    logo: string;
    alt: string;
}

export interface HeroStats {
    value: string;
    label: string;
}