import Image from '../../../components/ui/AppImage';
import Icon from '../../../components/ui/AppIcon';
import { Testimonial } from '../types';

const TestimonialsSection = () => {
    const testimonials: Testimonial[] = [
        {
            id: '1',
            name: 'Sarah Chen',
            role: 'Fashion Influencer • 125K followers',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_172229d5c-1763294124207.png",
            alt: 'Professional headshot of Sarah Chen, Asian woman with long black hair wearing white blazer against neutral background',
            content: 'VirtualTwin transformed my Instagram aesthetic into a real clothing line in minutes. The AI understood my Y2K vision perfectly and matched me with the ideal manufacturer.',
            rating: 5
        },
        {
            id: '2',
            name: 'Marcus Rodriguez',
            role: 'Streetwear Designer • Founder of UrbanFlow',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1518cd198-1763292620126.png",
            alt: 'Professional headshot of Marcus Rodriguez, Hispanic man with short dark hair and beard wearing black turtleneck',
            content: 'The 3D customizer and Luma AI videos are game-changers. I launched my first collection with NFT pre-orders and sold out in 48 hours. This platform is the future.',
            rating: 5
        },
        {
            id: '3',
            name: 'Aisha Patel',
            role: 'Fashion Student • Emerging Designer',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b0679b35-1763297418520.png",
            alt: 'Professional headshot of Aisha Patel, South Asian woman with shoulder-length brown hair wearing burgundy blouse',
            content: 'As a student, I never thought I could test my designs in the real market. VirtualTwin made it possible with zero upfront costs. The supplier matching saved me weeks of research.',
            rating: 5
        }];


    return (
        <section className="relative py-24 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/50 mb-6">
                        <Icon name="Users" size={16} className="text-primary" />
                        <span className="text-sm font-caption text-foreground">Creator Stories</span>
                    </div>
                    <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
                        <span className="text-foreground">Trusted by Fashion</span>
                        <br />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Creators Worldwide
                        </span>
                    </h2>
                    <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
                        Join thousands of designers who have launched successful fashion lines with VirtualTwin.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) =>
                        <div
                            key={testimonial.id}
                            className="glass-strong rounded-2xl p-6 border border-border hover:border-primary/50 animate-spring hover:shadow-primary"
                            style={{ animationDelay: `${index * 100}ms` }}>

                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) =>
                                    <Icon key={i} name="Star" size={16} className="text-accent fill-accent" />
                                )}
                            </div>

                            <p className="font-body text-foreground mb-6 leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-border">
                                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/50">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.alt}
                                        className="w-full h-full object-cover" />

                                </div>
                                <div>
                                    <div className="font-heading font-semibold text-foreground">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm font-caption text-muted-foreground">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 text-muted-foreground">
                        <Icon name="TrendingUp" size={20} className="text-success" />
                        <span className="font-caption">
                            <span className="font-semibold text-foreground">10,000+</span> designs created and counting
                        </span>
                    </div>
                </div>
            </div>
        </section>);

};

export default TestimonialsSection;