import Navigation from "@/components/Navigation";
import HeroSectionEnhanced from "@/components/HeroSectionEnhanced";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSectionEnhanced />
        <FeaturedProjects />
      </main>
      <Footer />
    </>
  );
};

export default Index;
