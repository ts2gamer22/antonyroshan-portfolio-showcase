import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Linkedin, Github, Send } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission
    toast({
      title: "Message sent successfully!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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

        {/* Contact Form & Info */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="p-8 shadow-card">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Research collaboration, Job opportunity, etc."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please share details about your inquiry..."
                      className="min-h-32"
                      required
                    />
                  </div>
                  
                  <Button type="submit" variant="cta" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Direct Contact */}
                <Card className="p-8 shadow-card">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <a 
                      href="mailto:antonyroshan03@gmail.com"
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted transition-smooth"
                    >
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Email</h4>
                        <p className="text-muted-foreground">antonyroshan03@gmail.com</p>
                      </div>
                    </a>

                    <a 
                      href="tel:+919884629287"
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted transition-smooth"
                    >
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Phone</h4>
                        <p className="text-muted-foreground">+91 9884629287</p>
                      </div>
                    </a>

                    <div className="flex items-center space-x-4 p-4 rounded-lg">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Location</h4>
                        <p className="text-muted-foreground">Chennai, Tamil Nadu, India</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Professional Links */}
                <Card className="p-8 shadow-card">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Professional Profiles</h3>
                  <div className="space-y-4">
                    <p className="text-muted-foreground mb-4">
                      Connect with me on professional platforms:
                    </p>
                    <div className="flex space-x-4">
                      <Button variant="professional" size="lg" asChild>
                        <a href="#" className="flex items-center space-x-2">
                          <Linkedin className="h-5 w-5" />
                          <span>LinkedIn</span>
                        </a>
                      </Button>
                      <Button variant="professional" size="lg" asChild>
                        <a href="#" className="flex items-center space-x-2">
                          <Github className="h-5 w-5" />
                          <span>GitHub</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Quick Download */}
                <Card className="p-8 shadow-card bg-card-gradient">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Download My CV</h3>
                  <p className="text-muted-foreground mb-6">
                    Get a comprehensive overview of my academic background, research experience, 
                    and technical skills.
                  </p>
                  <Button variant="hero" size="lg" asChild className="w-full">
                    <a href="/cv.pdf" download>
                      Download CV
                    </a>
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12 shadow-card bg-hero-gradient text-primary-foreground">
              <h2 className="text-3xl font-bold mb-4">Let's Collaborate</h2>
              <p className="text-xl mb-8 opacity-90">
                Whether you're interested in research collaboration, have exciting career opportunities, 
                or want to discuss innovative projects in chemical engineering and machine learning, 
                I'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <a href="mailto:antonyroshan03@gmail.com">
                    Send Email Directly
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;