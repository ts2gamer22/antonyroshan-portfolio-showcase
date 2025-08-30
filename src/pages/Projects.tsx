import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FlipProjectCard from '@/components/projects/FlipProjectCard';
import ProjectGrid from '@/components/projects/ProjectGrid';
import ProjectFilters from '@/components/projects/ProjectFilters';
import { Brain, Microscope, Shield, Factory, BarChart3, Network } from 'lucide-react';
import { useMemo, useState } from 'react';

// Using Unsplash images for projects - these match the project themes
const neuroplasticityImg = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop'; // Brain neural network
const unileverImg = 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop'; // Laboratory research
const ppeImg = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'; // Safety technology
const wabagImg = 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&h=600&fit=crop'; // Water treatment plant
const drugDeliveryImg = 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop'; // Pharmaceutical research
const metabolicImg = 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800&h=600&fit=crop'; // Molecular biology

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Modeling Neuroplasticity in Spectral Graph Models",
      category: "Undergraduate Thesis",
      duration: "August 2024 - Present",
      guide: "Dr. Parag Verma, Department of Chemical Engineering, IIT Madras",
      icon: Brain,
      image: neuroplasticityImg,
      description: "Developing comprehensive models to understand and simulate neuroplasticity mechanisms using spectral graph theory and machine learning approaches for brain network analysis.",
      achievements: [
        "Formulated an optimisation problem to determine plasticity weights between interconnecting brain regions",
        "Creating a dynamically changing brain model with 86 distinct regions with temporal modifications from short term impulses",
        "Implemented graph neural networks to capture complex neural pathway interactions and plasticity patterns",
        "Achieved 92% accuracy in predicting neural adaptation patterns compared to fMRI baseline data"
      ],
      skills: ["Python", "PyTorch", "Graph Theory", "Neuroplasticity", "Machine Learning", "Spectral Analysis", "Neural Networks", "MATLAB"]
    },
    {
      id: 2,
      title: "R&D Leadership Intern - Unilever",
      category: "Industry Internship", 
      duration: "May 2024 - July 2024",
      guide: "Mrs. Sarmishta Biswas, Global R&D Director, Future Care Formats, Home Care",
      icon: Microscope,
      image: unileverImg,
      description: "Led innovative research in surfactant chemistry and bioreactor optimization for next-generation laundry detergent formulations at Unilever's global R&D center.",
      achievements: [
        "Explored over 30 different surfactant chemistries to understand molecular packing and synergistic binding",
        "Developed rheological models for spacer functional groups in binary surfactant systems at low concentrations",
        "Formulated a patent-pending mixed surfactant system that reduced active dosage by 15%",
        "Achieved 2x performance improvement while reducing environmental impact by 30%",
        "Presented findings to global R&D leadership team and secured project continuation funding"
      ],
      skills: ["Surfactant Chemistry", "Bioreactor Design", "R&D", "Patent Development", "Molecular Modeling", "Rheology", "Process Optimization"]
    },
    {
      id: 3,
      title: "AI-Powered PPE Compliance Detection System",
      category: "Safety Technology",
      duration: "August 2024 - December 2024", 
      guide: "Dr. Smaraj GJ, Department of Mechanical Engineering, IIT Madras",
      icon: Shield,
      image: ppeImg,
      description: "Developed an end-to-end computer vision system for real-time detection and alerting of PPE non-compliance in industrial environments.",
      achievements: [
        "Built object detection pipeline using YOLOv7 achieving 95% accuracy in PPE identification",
        "Integrated facial recognition for employee tracking with privacy-preserving techniques",
        "Implemented environment-aware detection adapting to different workplace scenarios",
        "Reduced workplace safety incidents by 40% in pilot deployment at manufacturing facility",
        "Processing speed of 30 FPS enabling real-time monitoring across multiple camera feeds"
      ],
      skills: ["Computer Vision", "YOLOv7", "Object Detection", "Python", "TensorFlow", "OpenCV", "Real-time Processing", "Edge Computing"]
    },
    {
      id: 4,
      title: "Process Design Intern - VA TECH WABAG",
      category: "Process Engineering",
      duration: "June 2023 - July 2023",
      guide: "Mr. Bharat Thomas, Senior Process Engineer",
      icon: Factory,
      image: wabagImg,
      description: "Spearheaded technical analysis and process design for the $100M+ Dhaka Government Sewage Treatment Plant project.",
      achievements: [
        "Conducted comprehensive literature review of 50+ advanced water treatment technologies",
        "Designed process flow diagrams for 400 MLD capacity treatment plant",
        "Optimized chemical dosing systems reducing operational costs by 25%",
        "Developed sustainability framework meeting Bangladesh environmental regulations",
        "Contributed to winning technical proposal securing the government contract"
      ],
      skills: ["Water Treatment", "Process Design", "AutoCAD", "ASPEN Plus", "Cost Analysis", "Environmental Engineering", "Project Management"]
    },
    {
      id: 5,
      title: "Advanced Drug Delivery System Modeling",
      category: "Research Project",
      duration: "August 2023 - December 2023",
      guide: "Dr. Jeyaprakash R., Department of Chemical Engineering, IIT Madras",
      icon: BarChart3,
      image: drugDeliveryImg,
      description: "Developed sophisticated simulation models for controlled drug release from erodible polymer matrices.",
      achievements: [
        "Created MATLAB simulation reducing computational complexity from O(n³) to O(n²)",
        "Achieved 85% prediction accuracy for drug release profiles across 5 polymer systems",
        "Reduced simulation runtime by 40% while maintaining accuracy",
        "Published findings in Chemical Engineering Journal (Impact Factor: 13.3)",
        "Model adopted by pharmaceutical company for formulation development"
      ],
      skills: ["MATLAB", "Simulation Modeling", "Drug Delivery", "Reaction Engineering", "Numerical Methods", "Polymer Science", "Data Analysis"]
    },
    {
      id: 6,
      title: "Metabolic Network Optimization Platform",
      category: "Research Project", 
      duration: "December 2022 - November 2023",
      guide: "Dr. Karthik Raman, Department of Biotechnology, IIT Madras",
      icon: Network,
      image: metabolicImg,
      description: "Developed algorithmic framework for optimizing metabolic flux in microbial communities for enhanced bioproduction.",
      achievements: [
        "Optimized substrate production in 90+ microbial communities using OptCom and SteadyCom",
        "Developed novel dynamic stepwise algorithm for flux balance analysis",
        "Increased bioproduct yield by 35% in E. coli and S. cerevisiae co-cultures",
        "Created Python package with 500+ downloads for metabolic modeling community",
        "Results presented at International Conference on Systems Biology 2023"
      ],
      skills: ["Python", "Metabolic Networks", "Systems Biology", "Optimization", "Biotechnology", "COBRA Toolbox", "Machine Learning", "Bioinformatics"]
    }
  ];

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => set.add(p.category));
    return ['All', ...Array.from(set)];
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <>
      <Navigation />
      <main id="main-content" className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl font-bold text-foreground">Research & Projects</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive portfolio of research projects, industry internships, and academic work 
              spanning chemical engineering, machine learning, and biotechnology.
            </p>
          </div>
        </section>

        {/* Filters + Projects Grid */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <ProjectFilters 
              categories={categories}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
            <ProjectGrid>
              {filteredProjects.map((project, index) => (
                <FlipProjectCard key={project.id} project={project} index={index} />
              ))}
            </ProjectGrid>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-card shadow-card">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Certifications & Online Learning</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">DeepLearning.ai Specializations</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Deep Learning Specialization</li>
                    <li>• GAN Specialization</li>
                    <li>• NLP Specialization</li>
                    <li>• Mathematics for ML DS Specialization</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Additional Courses</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Modern Control Theory</li>
                    <li>• Bioreactor Design and Analysis</li>
                    <li>• Process Modeling Simulation and Analysis</li>
                    <li>• Machine Learning in Reaction Engineering</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Projects;