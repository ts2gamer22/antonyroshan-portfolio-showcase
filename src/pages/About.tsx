import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Users, Trophy, Calendar } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      title: "Academic Excellence",
      description: "Ranked #1 out of 117 students in Chemical Engineering cohort at IIT Madras",
      icon: Trophy,
      color: "text-gold"
    },
    {
      title: "JEE Advanced 2021",
      description: "Top 0.47% performance among 1.3 million candidates for IIT Madras admission",
      icon: GraduationCap,
      color: "text-primary"
    },
    {
      title: "Academic Recognition",
      description: "Multiple memorial awards including Mervyn Joseph Quadros and Stephen & Rosemary awards",
      icon: Award,
      color: "text-primary"
    },
    {
      title: "Leadership Role",
      description: "Corporate Relations Head at Entrepreneurship Cell IIT Madras, managing 25-member team",
      icon: Users,
      color: "text-primary"
    }
  ];

  const courses = [
    "Process Modeling Simulation and Analysis",
    "Machine Learning in Reaction Engineering", 
    "Modern Control Theory",
    "Bioreactor Design and Analysis",
    "Artificial Intelligence in Manufacturing",
    "Deep Learning Specialization",
    "Mathematics for ML DS Specialization"
  ];

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

        {/* Academic Journey */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Academic Journey</h2>
            <div className="space-y-8">
              <Card className="p-8 shadow-card">
                <div className="flex items-start space-x-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">Indian Institute of Technology Madras</h3>
                      <p className="text-lg text-primary font-medium">B.Tech in Chemical Engineering (Minor in Bioprocess Engineering)</p>
                      <p className="text-muted-foreground">2021 - 2025 | CGPA: 9.31/10.00</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Currently pursuing final year with specialization in bioprocess engineering. My academic focus 
                      centers on applying machine learning techniques to chemical engineering problems, particularly 
                      in the areas of neuroplasticity modeling and process optimization.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-card">
                <div className="flex items-start space-x-6">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">St. Michael's Academy, Chennai</h3>
                      <p className="text-lg text-primary font-medium">Class XII, Indian School Certificate Examination</p>
                      <p className="text-muted-foreground">2021 | CGPA: 99.6%</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Graduated as the best outgoing student with highest scores in English, Mathematics, 
                      Physics, Chemistry, and Computer Science along with academic excellence awards.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16 bg-muted/30 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Scholastic Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <Card key={index} className="p-6 shadow-card hover:shadow-hover transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <IconComponent className={`h-6 w-6 ${achievement.color}`} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">{achievement.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{achievement.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Skills & Interests */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Relevant Courses */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Relevant Coursework</h3>
                <div className="space-y-3">
                  {courses.map((course, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Interests */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Research Interests</h3>
                <div className="flex flex-wrap gap-3">
                  {interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Side */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-card bg-card-gradient">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Beyond Academics</h2>
              <div className="space-y-6 text-center">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As Corporate Relations Head at the Entrepreneurship Cell IIT Madras, I've successfully 
                  managed a 25-member team to forge associations with corporate companies, securing 
                  INR 75L+ in sponsorships. This role taught me valuable leadership and business 
                  development skills.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm also an active member of the Drama Contingent, representing the institution 
                  at various events. This involvement has enhanced my creativity, public speaking, 
                  and teamwork abilities - skills that complement my technical expertise.
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;