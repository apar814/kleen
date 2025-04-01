
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';

const FAQ = () => {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is Kleen?",
          answer: "Kleen is an AI-powered browser extension and web app that analyzes your shopping cart for potentially harmful ingredients and suggests cleaner alternatives to help you make healthier purchasing decisions."
        },
        {
          question: "How do I install the Kleen browser extension?",
          answer: "You can install the Kleen extension from the Chrome Web Store. Simply click on the 'Add to Chrome' button and follow the prompts to complete the installation. Once installed, you'll see the Kleen icon in your browser toolbar."
        },
        {
          question: "Is Kleen free to use?",
          answer: "Kleen offers a free basic plan with limited scans per month. For unlimited scans and advanced features, we offer Pro and Family subscription plans. You can view our pricing and plan details on our Pricing page."
        },
        {
          question: "Which shopping sites does Kleen work with?",
          answer: "Currently, Kleen works with Amazon. We're actively working on adding support for more online retailers including Walmart, Target, and specialty health stores."
        }
      ]
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          question: "How does Kleen analyze ingredients?",
          answer: "Kleen uses a comprehensive database of ingredients and their potential health impacts. When you scan a product, our AI matches ingredients against this database and provides personalized recommendations based on scientific research."
        },
        {
          question: "What is a 'Clean Score'?",
          answer: "A Clean Score is our proprietary rating system that evaluates products on a scale of 1-100 based on ingredient safety, potential allergens, and environmental impact. Higher scores indicate cleaner, safer products."
        },
        {
          question: "Can I save product alternatives for later?",
          answer: "Yes! With a Kleen account, you can save clean alternatives to your personal 'Clean Stack' for future reference. This allows you to build a collection of trusted products that meet your health criteria."
        },
        {
          question: "Does Kleen work for all product categories?",
          answer: "Kleen currently analyzes personal care products, household cleaners, food items, beauty products, and baby products. We're constantly expanding our database to cover more product categories."
        }
      ]
    },
    {
      category: "Account & Privacy",
      questions: [
        {
          question: "How do I create a Kleen account?",
          answer: "You can create a free Kleen account by clicking 'Sign Up' and entering your email address. We'll send you a magic link to access your account without needing to create a password."
        },
        {
          question: "Does Kleen store my shopping history?",
          answer: "Yes, but only if you choose to save it. By default, Kleen keeps your scan history for 30 days to help you track your progress toward cleaner shopping. You can delete your history at any time or change your storage preferences in your account settings."
        },
        {
          question: "Does Kleen sell my data?",
          answer: "Absolutely not. Kleen never sells user data to third parties. We only use your scan history to improve your experience and provide personalized recommendations."
        },
        {
          question: "How do I delete my account?",
          answer: "You can delete your account at any time by going to your Profile settings and selecting 'Delete Account'. This will permanently remove all your data from our systems."
        }
      ]
    },
    {
      category: "Billing & Subscriptions",
      questions: [
        {
          question: "How do I upgrade my plan?",
          answer: "You can upgrade your plan at any time by going to your Account settings and selecting 'Manage Subscription'. Choose the plan that's right for you and follow the prompts to complete your upgrade."
        },
        {
          question: "Can I cancel my subscription?",
          answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period, after which you'll be downgraded to the free plan."
        },
        {
          question: "Is there a refund policy?",
          answer: "Yes, we offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied, contact our support team within 14 days of your purchase for a full refund."
        },
        {
          question: "Do you offer discounts for annual subscriptions?",
          answer: "Yes, you can save 20% by choosing annual billing for any of our paid plans."
        }
      ]
    }
  ];

  return (
    <DashboardLayout 
      title="Frequently Asked Questions" 
      description="Find answers to common questions about Kleen"
    >
      <div className="grid gap-8">
        <section className="bg-white rounded-xl p-8 shadow-kleen-card">
          <h2 className="text-2xl font-semibold mb-6">Common Questions</h2>
          
          {faqs.map((category, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-medium mb-4">{category.category}</h3>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-kleen-gray/80">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </section>
        
        <section className="bg-kleen-mint/10 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
          <p className="text-kleen-gray/70 mb-6">
            Our support team is here to help. Reach out to us anytime.
          </p>
          <Link to="/contact">
            <Button className="bg-kleen-mint hover:bg-kleen-mint/90">
              Contact Support
            </Button>
          </Link>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default FAQ;
