
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const AboutUs = () => {
  return (
    <DashboardLayout 
      title="About Kleen" 
      description="Our mission is to make shopping for clean, toxin-free products simple for everyone"
    >
      <div className="grid gap-8">
        <section className="bg-white rounded-xl p-8 shadow-kleen-card">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Kleen was founded by health-conscious consumers who were frustrated by the difficulty of finding truly clean products. Despite growing awareness about harmful chemicals in everyday items, it remained challenging to identify and avoid these ingredients while shopping.
          </p>
          <p className="mb-4">
            We created Kleen to solve this problem, leveraging AI and a comprehensive ingredient database to help consumers make healthier choices. Our mission is to make clean living accessible for everyone, regardless of their scientific knowledge or available time.
          </p>
          <p>
            Today, Kleen helps thousands of shoppers analyze their carts, learn about potentially harmful ingredients, and discover cleaner alternatives that align with their health values.
          </p>
        </section>
        
        <section className="bg-white rounded-xl p-8 shadow-kleen-card">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-100 rounded-lg bg-kleen-light">
              <h3 className="font-medium text-lg mb-2">Transparency</h3>
              <p className="text-kleen-gray/70">We believe in providing clear, accurate information about product ingredients and their potential effects.</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg bg-kleen-light">
              <h3 className="font-medium text-lg mb-2">Accessibility</h3>
              <p className="text-kleen-gray/70">Clean living should be possible for everyone, not just those with time to research every product.</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg bg-kleen-light">
              <h3 className="font-medium text-lg mb-2">Education</h3>
              <p className="text-kleen-gray/70">We're committed to helping consumers understand what's in their products and why it matters.</p>
            </div>
          </div>
        </section>
        
        {/* Additional content could be added here */}
      </div>
    </DashboardLayout>
  );
};

export default AboutUs;
