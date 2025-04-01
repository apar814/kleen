
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <DashboardLayout 
      title="Contact Us" 
      description="Get in touch with the Kleen team"
    >
      <div className="grid gap-8">
        {/* Contact information */}
        <section className="bg-white rounded-xl p-8 shadow-kleen-card">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-kleen-gray/70 mb-6">
                Have questions, feedback, or just want to say hello? We'd love to hear from you.
                Our team is here to help with any questions you may have about Kleen.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-kleen-mint/10 p-2 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-kleen-mint" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-kleen-gray/70">support@kleenhealth.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-kleen-mint/10 p-2 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-kleen-mint" />
                  </div>
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-kleen-gray/70">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-kleen-mint/10 p-2 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-kleen-mint" />
                  </div>
                  <div>
                    <h3 className="font-medium">Visit Us</h3>
                    <p className="text-kleen-gray/70">
                      123 Clean Living St.<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-kleen-mint/10 p-2 rounded-full mr-4">
                    <MessageSquare className="h-5 w-5 text-kleen-mint" />
                  </div>
                  <div>
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-kleen-gray/70">
                      Available Monday-Friday<br />
                      9am-5pm PST
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-kleen-sage/10 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Office Hours</h3>
                <p className="text-kleen-gray/70">
                  Monday-Friday: 9am-5pm PST<br />
                  Saturday-Sunday: Closed
                </p>
              </div>
            </div>
            
            <div className="bg-kleen-light p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Send Us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                      <SelectItem value="press">Press Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <Textarea id="message" placeholder="How can we help you?" rows={5} />
                </div>
                
                <Button type="submit" className="w-full bg-kleen-mint hover:bg-kleen-mint/90">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
        
        {/* FAQ section */}
        <section className="bg-kleen-mint/10 rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">What is Kleen?</h3>
              <p className="text-kleen-gray/70">
                Kleen is an AI-powered shopping assistant that helps you identify toxic ingredients in products and suggests healthier alternatives.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">How does the product analysis work?</h3>
              <p className="text-kleen-gray/70">
                Kleen scans product ingredients, compares them against our database of potentially harmful substances, and provides personalized recommendations.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Is Kleen available internationally?</h3>
              <p className="text-kleen-gray/70">
                Currently, Kleen is only available in the United States, but we're working on expanding to other countries soon.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">How can I become a partner?</h3>
              <p className="text-kleen-gray/70">
                If you're interested in partnering with Kleen, please reach out to us at partners@kleenhealth.com.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Button variant="outline" className="border-kleen-mint text-kleen-mint hover:bg-kleen-mint/10">
              View All FAQs
            </Button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Contact;
