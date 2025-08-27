import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const interests = [
    "Bioprocess Engineering",
    "Machine Learning",
    "Computational Modeling",
    "Neuroplasticity Research",
    "Process Optimization",
    "Spectral Graph Theory"
  ];

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl font-bold text-foreground">About Me</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Passionate about bridging chemical engineering principles with cutting-edge machine learning 
              to solve complex problems in bioprocess design and neurological modeling.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Academic Journey</h2>
            <Timeline />
          </div>
        </section>

        {/* Research Interests */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Research Interests</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {interests.map((interest, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;