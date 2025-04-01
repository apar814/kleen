
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Briefcase, MapPin, Clock } from 'lucide-react';

const JobListing = ({ title, department, location, type, description, link }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-kleen-card hover:shadow-kleen-hover transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="flex items-center text-sm text-kleen-gray/70">
              <Briefcase className="h-4 w-4 mr-1" />
              {department}
            </span>
            <span className="flex items-center text-sm text-kleen-gray/70">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </span>
            <span className="flex items-center text-sm text-kleen-gray/70">
              <Clock className="h-4 w-4 mr-1" />
              {type}
            </span>
          </div>
        </div>
        <Link to={link} className="mt-4 md:mt-0">
          <Button variant="outline" className="text-kleen-mint border-kleen-mint/30 hover:bg-kleen-mint/10">
            Apply
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <p className="text-kleen-gray/70">{description}</p>
    </div>
  );
};

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote (US)",
      type: "Full-time",
      description: "We're looking for an experienced full stack developer to help build and scale our clean product platform. You'll work closely with our product and design teams to create intuitive, high-performance features.",
      link: "/careers/senior-full-stack-developer"
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Join our product team to help shape the future of Kleen. You'll drive the product roadmap, gather user feedback, and collaborate with engineering and design to bring new features to life.",
      link: "/careers/product-manager"
    },
    {
      title: "Data Scientist",
      department: "Data",
      location: "Remote (US)",
      type: "Full-time",
      description: "Help us leverage our growing product and ingredient database to improve recommendations and user experiences. You'll work with large datasets and develop models to power our ingredient analysis engine.",
      link: "/careers/data-scientist"
    },
    {
      title: "Content Marketing Specialist",
      department: "Marketing",
      location: "Remote (US)",
      type: "Full-time",
      description: "Create compelling content that educates our audience about clean living and drives user growth. You'll develop blog posts, social media content, newsletters, and more.",
      link: "/careers/content-marketing-specialist"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote (US)",
      type: "Full-time",
      description: "Be the voice of our customers and ensure they're getting maximum value from Kleen. You'll onboard new users, gather feedback, and work with product teams to improve the user experience.",
      link: "/careers/customer-success-manager"
    }
  ];

  const values = [
    {
      title: "Health First",
      description: "We believe everyone deserves access to products that don't compromise their health. This mission drives everything we do."
    },
    {
      title: "Radical Transparency",
      description: "We're committed to providing clear, honest information about product ingredients and their potential impacts."
    },
    {
      title: "User-Centered Design",
      description: "We design with our users in mind, making complex information accessible and actionable."
    },
    {
      title: "Evidence-Based Approach",
      description: "Our recommendations and educational content are grounded in scientific research and expert consensus."
    },
    {
      title: "Continuous Learning",
      description: "We're constantly learning and evolving as new research emerges about ingredients and their effects."
    },
    {
      title: "Inclusive Wellness",
      description: "We believe clean living should be accessible to everyone, regardless of background or circumstance."
    }
  ];

  const benefits = [
    "Competitive salary and equity",
    "Comprehensive health, dental, and vision insurance",
    "Flexible work arrangements and unlimited PTO",
    "Home office stipend for remote employees",
    "Professional development budget",
    "Wellness program and mental health resources",
    "Team retreats and social events",
    "Parental leave",
    "401(k) matching"
  ];

  return (
    <DashboardLayout 
      title="Careers at Kleen" 
      description="Join our mission to make clean living accessible to everyone"
    >
      <div className="grid gap-8">
        {/* Hero section */}
        <section className="bg-white rounded-xl overflow-hidden shadow-kleen-card">
          <div className="grid md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-4">Join Our Mission</h2>
              <p className="text-kleen-gray/70 mb-6">
                At Kleen, we're building tools that help people make healthier choices every day. 
                We're a team of engineers, scientists, designers, and clean living enthusiasts 
                passionate about creating a healthier future.
              </p>
              <div>
                <Button className="bg-kleen-mint hover:bg-kleen-mint/90">
                  View Open Positions
                </Button>
              </div>
            </div>
            <div className="h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Kleen team collaborating" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        
        {/* Values section */}
        <section className="bg-white rounded-xl p-8 shadow-kleen-card">
          <h2 className="text-2xl font-semibold mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="p-6 bg-kleen-sage/10 rounded-xl">
                <h3 className="text-lg font-medium mb-2">{value.title}</h3>
                <p className="text-kleen-gray/70">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Benefits section */}
        <section className="bg-kleen-mint/10 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Benefits & Perks</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-1">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Team collaboration" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <img 
                src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Remote work" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="col-span-2 md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-kleen-mint rounded-full mr-3"></div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Open positions */}
        <section className="bg-white rounded-xl p-8 shadow-kleen-card">
          <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
          <div className="space-y-4">
            {openPositions.map((job, index) => (
              <JobListing key={index} {...job} />
            ))}
          </div>
        </section>
        
        {/* Not seeing a fit? */}
        <section className="bg-kleen-sage/20 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Don't see a role that fits?</h3>
          <p className="text-kleen-gray/70 mb-6 max-w-lg mx-auto">
            We're always looking for talented individuals who are passionate about our mission.
            Send us your resume and let us know how you'd like to contribute!
          </p>
          <Link to="/contact">
            <Button variant="outline" className="border-kleen-mint text-kleen-mint hover:bg-kleen-mint/10">
              Get in Touch
            </Button>
          </Link>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Careers;
