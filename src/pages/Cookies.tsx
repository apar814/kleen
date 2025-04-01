
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Cookies = () => {
  return (
    <DashboardLayout 
      title="Cookie Policy" 
      description="Information about how Kleen uses cookies and similar technologies"
    >
      <div className="grid gap-8">
        <section className="bg-white rounded-xl p-8 shadow-kleen-card">
          <div className="prose max-w-none text-kleen-gray/90">
            <h2>Cookie Policy</h2>
            <p className="text-kleen-gray/70">Last updated: June 1, 2023</p>
            
            <h3>1. What Are Cookies</h3>
            <p>
              Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
            </p>
            <p>
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.
            </p>
            
            <h3>2. How Kleen Uses Cookies</h3>
            <p>
              When you use and access the Service, we may place a number of cookie files in your web browser.
            </p>
            <p>
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Essential cookies.</strong> We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.
              </li>
              <li>
                <strong>Preferences cookies.</strong> We may use preferences cookies to remember information that changes the way the Service behaves or looks, such as the "remember me" functionality or a user's language preference.
              </li>
              <li>
                <strong>Analytics cookies.</strong> We may use analytics cookies to track information about how the Service is used so that we can make improvements. We may also use analytics cookies to test new features and make changes to the functionality and design of the Service.
              </li>
              <li>
                <strong>Marketing cookies.</strong> These types of cookies are used to deliver advertisements that are more relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of the advertising campaign. They remember that you have visited a website and this information may be shared with other organizations such as advertising partners.
              </li>
            </ul>
            
            <h3>3. Third-Party Cookies</h3>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
            </p>
            <p>
              Some of the third-party services we use include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Google Analytics:</strong> We use Google Analytics to help us understand how our customers use the Site. You can read more about how Google uses your Personal Information <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-kleen-mint hover:underline">here</a>.
              </li>
              <li>
                <strong>Stripe:</strong> We use Stripe for payment processing. You can read more about how Stripe uses your Personal Information <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-kleen-mint hover:underline">here</a>.
              </li>
              <li>
                <strong>Intercom:</strong> We use Intercom for customer support and messaging. You can read more about how Intercom uses your Personal Information <a href="https://www.intercom.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-kleen-mint hover:underline">here</a>.
              </li>
            </ul>
            
            <h3>4. What Are Your Choices Regarding Cookies</h3>
            <p>
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
            </p>
            <p>
              Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
            </p>
            <p>
              For the Chrome web browser, please visit this page from Google: <a href="https://support.google.com/accounts/answer/32050" target="_blank" rel="noopener noreferrer" className="text-kleen-mint hover:underline">https://support.google.com/accounts/answer/32050</a>
            </p>
            <p>
              For the Internet Explorer web browser, please visit this page from Microsoft: <a href="http://support.microsoft.com/kb/278835" target="_blank" rel="noopener noreferrer" className="text-kleen-mint hover:underline">http://support.microsoft.com/kb/278835</a>
            </p>
            <p>
              For the Firefox web browser, please visit this page from Mozilla: <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank" rel="noopener noreferrer" className="text-kleen-mint hover:underline">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a>
            </p>
            <p>
              For the Safari web browser, please visit this page from Apple: <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-kleen-mint hover:underline">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a>
            </p>
            <p>
              For any other web browser, please visit your web browser's official web pages.
            </p>
            
            <h3>5. More Information About Cookies</h3>
            <p>
              You can learn more about cookies at the following third-party websites:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Network Advertising Initiative: <a href="http://www.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-kleen-mint hover:underline">http://www.networkadvertising.org/</a>
              </li>
              <li>
                AllAboutCookies: <a href="http://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-kleen-mint hover:underline">http://www.allaboutcookies.org/</a>
              </li>
            </ul>
            
            <h3>6. Cookie Preferences</h3>
            <p>
              You can manage your cookie preferences by clicking the button below:
            </p>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button className="bg-kleen-mint hover:bg-kleen-mint/90">
              Manage Cookie Preferences
            </Button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Cookies;
