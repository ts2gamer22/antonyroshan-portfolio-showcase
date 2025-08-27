import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Microscope, Shield, Factory } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Modeling Neuroplasticity in Spectral Graph Models',
    description: 'Undergraduate thesis on modeling neuroplasticity using holistic machine learning perspectives.',
    icon: Brain,
    category: 'Research',
    duration: 'Aug 2024 - Present',
    highlight: true
  },
  {
    id: 2,
    title: 'R&D Leadership Intern at Unilever',
    description: 'Explored molecular packing and synergistic binding in laundry detergent formulations.',
    icon: Microscope,
    category: 'Industry',
    duration: 'May 2024 - July 2024',
    highlight: true
  },
  {
    id: 3,
    title: 'PPE Non-compliance Detection',
    description: 'AI-powered detection model for identifying PPE violations in workplace environments.',
    icon: Shield,
    category: 'Safety Tech',
    duration: 'Aug 2024 - Dec 2024',
    highlight: false
  },
  {
    id: 4,
    title: 'Process Design Intern at VA TECH WABAG',
    description: 'Technical analysis for 400Cr Dhaka Government STP project using advanced water treatment.',
    icon: Factory,
    category: 'Process Engineering',
    duration: 'June 2023 - July 2023',
    highlight: false
  }
];

const FeaturedProjects = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-foreground">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore my research and professional work in chemical engineering, machine learning, and process optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project) => {
            const IconComponent = project.icon;
            return (
              <Card 
                key={project.id} 
                className={`p-8 transition-all duration-300 hover:shadow-hover hover:-translate-y-2 border-0 shadow-card ${
                  project.highlight ? 'bg-card-gradient ring-2 ring-primary/10' : 'bg-card'
                }`}
              >
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${
                      project.highlight ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${
                        project.highlight ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    <p className="text-sm text-primary font-medium">
                      {project.duration}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="cta" size="lg" asChild>
            <Link to="/projects" className="group">
              View All Projects
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;