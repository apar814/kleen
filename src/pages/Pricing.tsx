
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingTier = ({ 
  name, 
  price, 
  description, 
  features, 
  buttonText, 
  buttonLink, 
  highlighted = false 
}) => {
  return (
    <div className={`flex flex-col p-6 md:p-8 rounded-xl shadow-kleen-card ${highlighted ? 'border-2 border-kleen-mint bg-kleen-mint/5' : 'bg-white'}`}>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">${price}</span>
        {price > 0 && <span className="text-kleen-gray/70 ml-1">/month</span>}
      </div>
      <p className="text-kleen-gray/80 mb-6">{description}</p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-kleen-mint mr-2 mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-auto">
        <Link to={buttonLink} className="w-full">
          <Button 
            className={`w-full ${highlighted ? 'bg-kleen-mint hover:bg-kleen-mint/90' : 'bg-kleen-gray/10 hover:bg-kleen-gray/20 text-kleen-gray'}`}
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

const Pricing = () => {
  const pricingTiers = [
    {
      name: 'Free',
      price: 0,
      description: 'Essential features for getting started with cleaner shopping',
      features: [
        'Basic ingredient analysis',
        'Limited product scans per month',
        'Access to basic ingredient database',
        'Basic product alternatives'
      ],
      buttonText: 'Get Started',
      buttonLink: '/dashboard',
      highlighted: false
    },
    {
      name: 'Pro',
      price: 9.99,
      description: 'Advanced features for health-conscious shoppers',
      features: [
        'Unlimited product scans',
        'Full ingredient analysis with AI explanations',
        'Complete access to ingredient database',
        'Personalized product alternatives',
        'Shopping history and tracking',
        'Priority support'
      ],
      buttonText: 'Choose Pro',
      buttonLink: '/dashboard?signup=pro',
      highlighted: true
    },
    {
      name: 'Family',
      price: 19.99,
      description: 'Complete coverage for your entire household',
      features: [
        'Everything in Pro plan',
        'Up to 5 user accounts',
        'Family health profiles',
        'Shared clean product stacks',
        'Advanced allergen tracking',
        'Exclusive educational content',
        'Premium support'
      ],
      buttonText: 'Choose Family',
      buttonLink: '/dashboard?signup=family',
      highlighted: false
    }
  ];

  return (
    <DashboardLayout 
      title="Pricing Plans" 
      description="Choose the plan that's right for your clean living journey"
    >
      <div className="grid gap-8">
        <section className="bg-white rounded-xl p-8 shadow-kleen-card text-center">
          <h2 className="text-2xl font-semibold mb-2">Simple, Transparent Pricing</h2>
          <p className="text-kleen-gray/70 max-w-2xl mx-auto mb-8">
            Choose the plan that works best for you and your clean living journey. All plans include our core ingredient analysis technology.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <PricingTier key={index} {...tier} />
            ))}
          </div>
        </section>
        
        <section className="bg-kleen-mint/10 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Need a custom solution?</h3>
              <p className="text-kleen-gray/70">Contact us for enterprise pricing and custom features for your organization.</p>
            </div>
            <Link to="/contact" className="mt-4 md:mt-0">
              <Button variant="outline" className="border-kleen-mint text-kleen-mint hover:bg-kleen-mint/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </section>
        
        <section className="bg-white rounded-xl p-8 shadow-kleen-card">
          <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3 className="text-lg font-medium mb-2">Can I change plans later?</h3>
              <p className="text-kleen-gray/70">Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Is there a free trial?</h3>
              <p className="text-kleen-gray/70">Yes, both paid plans include a 14-day free trial so you can try all the features before committing.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-kleen-gray/70">We accept all major credit cards, PayPal, and Apple Pay.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">How do I cancel my subscription?</h3>
              <p className="text-kleen-gray/70">You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-kleen-gray/70 mb-4">Still have questions?</p>
            <Link to="/faq">
              <Button variant="outline">
                View all FAQs
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Pricing;
