import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import antonyHeadshot from '@/assets/antony-headshot.jpg';

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Antony Roshan
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-light">
                Doctoral Student | Johns Hopkins University | Chemical & Biomolecular Engineering
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                I'm a current doctoral student at Johns Hopkins University in the Department of Chemical and Biomolecular Engineering, 
                with expertise in machine learning, computational modeling, and bioprocess engineering.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/projects" className="group">
                    View My Work
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="professional" size="lg" asChild>
                  <Link to="/contact" className="group">
                    <Mail className="group-hover:scale-110 transition-transform" />
                    Get In Touch
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">PhD</div>
                <div className="text-sm text-muted-foreground">Johns Hopkins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">#1</div>
                <div className="text-sm text-muted-foreground">IIT Madras Cohort</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2025</div>
                <div className="text-sm text-muted-foreground">Current Year</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-hero-gradient rounded-3xl blur-2xl opacity-30 scale-105"></div>
              <img
                src={antonyHeadshot}
                alt="Antony Roshan - Professional Headshot"
                className="relative w-80 h-80 object-cover rounded-3xl shadow-glow"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;