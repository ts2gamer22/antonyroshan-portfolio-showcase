import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Microscope, Shield, Factory, BarChart3, Network } from 'lucide-react';

// Import project images
import neuroplasticityImg from '@/assets/project-neuroplasticity.jpg';
import unileverImg from '@/assets/project-unilever.jpg';
import ppeImg from '@/assets/project-ppe.jpg';
import wabagImg from '@/assets/project-wabag.jpg';
import drugDeliveryImg from '@/assets/project-drug-delivery.jpg';
import metabolicImg from '@/assets/project-metabolic.jpg';

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
      description: "Literature review of prior works on modeling neuroplasticity using holistic machine learning perspectives.",
      achievements: [
        "Formulated an optimisation problem to determine plasticity weights between interconnecting brain regions",
        "Creating a dynamically changing brain with 86 distinct regions with temporal modifications from short term impulses",
        "Developed a rheological perspective on effects of spacer functional groups in binary surfactant systems at low AD concentrations"
      ],
      skills: ["Python", "PyTorch", "Neuroplasticity Modeling", "Graph Theory", "Machine Learning"]
    },
    {
      id: 2,
      title: "R&D Leadership Intern, Unilever",
      category: "Industry Internship", 
      duration: "May 2024 - July 2024",
      guide: "Mrs. Sarmishta Biswas, Global R&D Director, Future Care Formats, Home Care",
      icon: Microscope,
      image: unileverImg,
      description: "Worked on occupancy-driven 50L bioreactor using the laundry detergent unit by reducing the linker CQ2 diffusing substances by 50%.",
      achievements: [
        "Explored over 30 different surfactant chemistries to understand molecular packing and synergistic binding of head groups",
        "Provided a rheological perspective on effects of spacer functional groups in binary surfactant systems at low AD concentrations",
        "Formulated a mixed surfactant system (patent-pending) that reduced AD by 15%, doubling formulation performance"
      ],
      skills: ["Surfactant Chemistry", "Molecular Packing", "Bioreactor Design", "R&D", "Patent Development"]
    },
    {
      id: 3,
      title: "Detection of PPE Non-compliance",
      category: "Safety Technology",
      duration: "August 2024 - December 2024", 
      guide: "Dr. Smaraj GJ, Department of Mechanical Engineering, IIT Madras",
      icon: Shield,
      image: ppeImg,
      description: "Built an end-to-end detection model for identifying employees violating PPE requirements in various working scenarios.",
      achievements: [
        "Created an object detection, environment identification and facial recognition model for the above purposes",
        "Surveyed prevalent models such as YOLO7, Fast RCNN and RetinaNet to determine the optimal model for real-time detection and identification"
      ],
      skills: ["Computer Vision", "YOLO", "Object Detection", "Safety Systems", "Real-time Processing"]
    },
    {
      id: 4,
      title: "Process and Design Intern, VA TECH WABAG",
      category: "Process Engineering",
      duration: "June 2023 - July 2023",
      guide: "Mr. Bharat Thomas",
      icon: Factory,
      image: wabagImg,
      description: "Analysed and encapsulated the technical requirements for the upcoming 400Cr+ Dhaka Government STP project.",
      achievements: [
        "Spearheaded the project by conducting a holistic literature review on over 50 rising advanced water treatment techniques", 
        "Reduced company's overall costs moderately through detailed strategies adhering to client and ecological requirements"
      ],
      skills: ["Water Treatment", "Process Design", "Cost Optimization", "Environmental Engineering"]
    },
    {
      id: 5,
      title: "Drug Delivery Modeling",
      category: "Research Project",
      duration: "August 2023 - December 2023",
      guide: "Dr. Jeyaprakash R., Department of Chemical Engineering, IIT Madras",
      icon: BarChart3,
      image: drugDeliveryImg,
      description: "Developed a simulation model to understand physical diffusion and chemical reaction of erodible polymers in drug delivery.",
      achievements: [
        "Simplified the complexity of previous existing models through system analysis by reducing system variables from over 10 to 6",
        "Reached an accuracy of 85% on selected polymer material with reduction in simulation run time by 20% over predecessor"
      ],
      skills: ["Simulation Modeling", "Drug Delivery", "Chemical Reaction Engineering", "System Analysis"]
    },
    {
      id: 6,
      title: "Optimization of Metabolic Networks",
      category: "Research Project", 
      duration: "December 2022 - November 2023",
      guide: "Dr. Karthik Raman, Department of Biotechnology, IIT Madras",
      icon: Network,
      image: metabolicImg,
      description: "Developing algorithms to maximize desired product secretion in communities of unicellular organisms.",
      achievements: [
        "Optimized substrate production 90+ common microbial communities using both OptCom and SteadyCom",
        "Developed an innovative dynamic stepwise algorithm to accurately model the intricate related flux relations"
      ],
      skills: ["Metabolic Networks", "Optimization Algorithms", "Biotechnology", "Microbial Communities"]
    }
  ];

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16">
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

        {/* Projects Grid */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            {projects.map((project) => {
              const IconComponent = project.icon;
              return (
                <Card key={project.id} className="overflow-hidden shadow-card hover:shadow-hover transition-all duration-300">
                  {/* Project Image */}
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-foreground leading-tight">
                            {project.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="secondary" className="text-sm">
                              {project.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {project.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Guide */}
                    <div className="mb-6 p-4 bg-accent-light rounded-lg">
                      <p className="text-sm text-muted-foreground font-medium">
                        <span className="font-semibold">Guide:</span> {project.guide}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-foreground mb-3">Key Contributions</h4>
                      <ul className="space-y-2">
                        {project.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Skills & Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
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