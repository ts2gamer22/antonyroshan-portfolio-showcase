import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <FeaturedProjects />
      </main>
      <Footer />
    </>
  );
};

export default Index;
