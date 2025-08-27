import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Linkedin, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl font-bold text-foreground">Get In Touch</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              I'm always interested in discussing research opportunities, academic collaborations, 
              or potential career opportunities in engineering and technology.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              
              {/* Email */}
              <a 
                href="mailto:antonyroshan03@gmail.com"
                className="group flex flex-col items-center p-8 rounded-2xl bg-card shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105"
              >
                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                <p className="text-muted-foreground text-center text-sm">antonyroshan03@gmail.com</p>
              </a>

              {/* LinkedIn */}
              <a 
                href="#" 
                className="group flex flex-col items-center p-8 rounded-2xl bg-card shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105"
              >
                <div className="p-4 bg-blue-500/10 rounded-full mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <Linkedin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">LinkedIn</h3>
                <p className="text-muted-foreground text-center text-sm">Professional Profile</p>
              </a>

              {/* Instagram */}
              <a 
                href="#" 
                className="group flex flex-col items-center p-8 rounded-2xl bg-card shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105"
              >
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mb-4 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-colors">
                  <Instagram className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Instagram</h3>
                <p className="text-muted-foreground text-center text-sm">Personal Updates</p>
              </a>

            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 rounded-2xl bg-hero-gradient text-primary-foreground shadow-glow">
              <h2 className="text-3xl font-bold mb-4">Let's Collaborate</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Whether you're interested in research collaboration, have exciting career opportunities, 
                or want to discuss innovative projects in chemical engineering and machine learning.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;