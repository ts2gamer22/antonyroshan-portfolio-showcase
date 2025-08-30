import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TimelineDemo from "@/components/timeline-demo";
import { Badge } from "@/components/ui/badge";
import PullQuote from "@/components/PullQuote";
import Skills from "@/components/Skills";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const interests = [
    "Bioprocess Engineering",
    "Machine Learning",
    "Computational Modeling",
    "Neuroplasticity Research",
    "Process Optimization",
    "Spectral Graph Theory"
  ];

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-24 pb-16">
        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl font-bold text-foreground">About Me</h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-serif max-w-3xl mx-auto">
              Passionate about bridging chemical engineering principles with cutting-edge machine learning 
              to solve complex problems in bioprocess design and neurological modeling.
            </p>
          </div>
        </motion.section>

        {/* Personal Statement */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="prose prose-lg prose-neutral dark:prose-invert mx-auto"
            >
              <p className="font-serif text-lg leading-relaxed text-foreground/90">
                As a Chemical Engineering graduate from IIT Madras, now pursuing doctoral research at Johns Hopkins University,
                I explore the intersection of rigorous engineering and modern computational methods to revolutionize
                bioprocess design and optimization.
              </p>
              <p className="font-serif text-lg leading-relaxed text-foreground/90 mt-6">
                My research focuses on developing intelligent systems that can predict, optimize, and control 
                complex chemical and biological processes. From designing advanced bioreactors to modeling 
                neuroplasticity patterns, I believe in the power of interdisciplinary approaches to solve 
                tomorrow's most challenging problems.
              </p>
            </motion.div>
            
            <PullQuote 
              author="Research Advisor"
              role="Chemical & Biomolecular Engineering"
              variant="default"
            >
              Antony's unique ability to combine rigorous engineering principles with advanced machine learning 
              techniques has resulted in groundbreaking research in bioprocess optimization.
            </PullQuote>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-foreground mb-12 text-center"
            >
              Academic Journey
            </motion.h2>
            <TimelineDemo />
          </div>
        </section>

        {/* Skills Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <Skills />
        </section>

        {/* Research Interests */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-foreground mb-8"
            >
              Research Interests
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3"
            >
              {interests.map((interest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge variant="secondary" className="px-4 py-2 text-sm">
                    {interest}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-foreground mb-8 text-center"
            >
              Key Achievements
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-lg border border-border"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">Research Excellence</h3>
                <p className="text-muted-foreground">
                  Published 3 papers in peer-reviewed journals on bioprocess optimization using machine learning
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-lg border border-border"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">Academic Performance</h3>
                <p className="text-muted-foreground">
                  Maintained CGPA of 8.5+ throughout the program with multiple semester toppers
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;