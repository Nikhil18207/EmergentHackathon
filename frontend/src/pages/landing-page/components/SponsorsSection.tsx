import Image from '../../../components/ui/AppImage';
import { Sponsor } from '../types';

const SponsorsSection = () => {
    const sponsors: Sponsor[] = [
        {
            id: '1',
            name: 'OpenAI',
            logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f6be5104-1764675850764.png",
            alt: 'OpenAI company logo featuring black text on transparent background'
        },
        {
            id: '2',
            name: 'Polygon',
            logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ab2f0734-1764679878222.png",
            alt: 'Polygon blockchain logo with purple geometric design'
        },
        {
            id: '3',
            name: 'Luma AI',
            logo: 'https://via.placeholder.com/150x50/8B5CF6/FFFFFF?text=Luma+AI',
            alt: 'Luma AI logo with purple gradient background and white text'
        },
        {
            id: '4',
            name: 'MetaMask',
            logo: "https://img.rocket.new/generatedImages/rocket_gen_img_142d275a2-1764708685303.png",
            alt: 'MetaMask fox logo in orange and white colors'
        },
        {
            id: '5',
            name: 'OpenSea',
            logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ad47cad1-1765226555203.png",
            alt: 'OpenSea NFT marketplace logo with blue sailing ship icon'
        },
        {
            id: '6',
            name: 'Thirdweb',
            logo: 'https://via.placeholder.com/150x50/3B82F6/FFFFFF?text=Thirdweb',
            alt: 'Thirdweb logo with blue gradient background and white text'
        }];


    return (
        <section className="relative py-16 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h3 className="font-heading font-semibold text-2xl text-muted-foreground mb-2">
                        Powered by Industry Leaders
                    </h3>
                    <p className="font-caption text-sm text-muted-foreground">
                        Built with cutting-edge AI and Web3 technologies
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                    {sponsors.map((sponsor, index) =>
                        <div
                            key={sponsor.id}
                            className="flex items-center justify-center p-4 glass rounded-lg border border-border hover:border-primary/50 animate-spring hover:shadow-subtle"
                            style={{ animationDelay: `${index * 50}ms` }}>

                            <Image
                                src={sponsor.logo}
                                alt={sponsor.alt}
                                className="w-full h-12 object-contain opacity-70 hover:opacity-100 animate-spring grayscale hover:grayscale-0" />

                        </div>
                    )}
                </div>
            </div>
        </section>);

};

export default SponsorsSection;