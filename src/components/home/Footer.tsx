import React from 'react';
import { Link } from 'react-router-dom';
import KleenLogo from '@/components/KleenLogo';

const footerLinks = {
  Product: [
    { label: 'Features', to: '/how-it-works' },
    { label: 'How it works', to: '/how-it-works' },
    { label: 'Product Search', to: '/search' },
    { label: 'Goals', to: '/goals' },
  ],
  Company: [
    { label: 'About us', to: '/about' },
    { label: 'Referrals', to: '/referral' },
    { label: 'Contact', to: '/about' },
  ],
  Legal: [
    { label: 'Terms', to: '/terms' },
    { label: 'Privacy', to: '/privacy' },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border/60">
      <div className="kleen-container py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <KleenLogo size="md" />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Your AI-powered health assistant for toxin-free shopping. Scan, learn, and swap for a cleaner life.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h4 className="font-heading font-semibold text-sm text-foreground mb-4">{group}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-14 pt-8 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Kleen. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Twitter', 'Instagram'].map((social) => (
              <a key={social} href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors font-medium">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
