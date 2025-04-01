
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <DashboardLayout 
      title="Terms of Service" 
      description="Kleen Terms of Service and User Agreement"
    >
      <div className="grid gap-8">
        <section className="bg-white rounded-xl p-8 shadow-kleen-card">
          <div className="prose max-w-none text-kleen-gray/90">
            <h2>Terms of Service</h2>
            <p className="text-kleen-gray/70">Last updated: June 1, 2023</p>
            
            <h3>1. Introduction</h3>
            <p>
              Welcome to Kleen ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service") govern your use of our website located at www.kleenhealth.com and our mobile application Kleen (together or individually "Service") operated by Kleen Health, Inc.
            </p>
            <p>
              Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. Please read it here: <Link to="/privacy" className="text-kleen-mint hover:underline">Privacy Policy</Link>.
            </p>
            <p>
              Your agreement with us includes these Terms and our Privacy Policy ("Agreements"). You acknowledge that you have read and understood Agreements, and agree to be bound by them.
            </p>
            <p>
              If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at support@kleenhealth.com so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.
            </p>
            
            <h3>2. Communications</h3>
            <p>
              By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or by emailing at support@kleenhealth.com.
            </p>
            
            <h3>3. Purchases</h3>
            <p>
              If you wish to purchase any product or service made available through Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
            </p>
            <p>
              You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.
            </p>
            <p>
              We may employ the use of third-party services for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.
            </p>
            <p>
              We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.
            </p>
            <p>
              We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.
            </p>
            
            <h3>4. Subscriptions</h3>
            <p>
              Some parts of Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.
            </p>
            <p>
              At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or Kleen cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting Kleen customer support team.
            </p>
            <p>
              A valid payment method, including credit card, is required to process the payment for your Subscription. You shall provide Kleen with accurate and complete billing information including full name, address, state, zip code, telephone number, and a valid payment method information. By submitting such payment information, you automatically authorize Kleen to charge all Subscription fees incurred through your account to any such payment instruments.
            </p>
            <p>
              Should automatic billing fail to occur for any reason, Kleen will issue an electronic invoice indicating that you must proceed manually, within a certain deadline date, with the full payment corresponding to the billing period as indicated on the invoice.
            </p>
            
            <h3>5. Free Trial</h3>
            <p>
              Kleen may, at its sole discretion, offer a Subscription with a free trial for a limited period of time ("Free Trial").
            </p>
            <p>
              You may be required to enter your billing information in order to sign up for Free Trial.
            </p>
            <p>
              If you do enter your billing information when signing up for Free Trial, you will not be charged by Kleen until Free Trial has expired. On the last day of Free Trial period, unless you cancelled your Subscription, you will be automatically charged the applicable Subscription fees for the type of Subscription you have selected.
            </p>
            <p>
              At any time and without notice, Kleen reserves the right to (i) modify Terms of Service of Free Trial offer, or (ii) cancel such Free Trial offer.
            </p>
            
            <h3>6. Refunds</h3>
            <p>
              Except when required by law, paid Subscription fees are non-refundable.
            </p>
            
            <h3>7. Content</h3>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for Content that you post on or through Service, including its legality, reliability, and appropriateness.
            </p>
            <p>
              By posting Content on or through Service, You represent and warrant that: (i) Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity. We reserve the right to terminate the account of anyone found to be infringing on a copyright.
            </p>
            <p>
              You retain any and all of your rights to any Content you submit, post or display on or through Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third party posts on or through Service. However, by posting Content using Service you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through Service.
            </p>
            <p>
              Kleen has the right but not the obligation to monitor and edit all Content provided by users.
            </p>
            
            <h3>8. Prohibited Uses</h3>
            <p>
              You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:
            </p>
            <ol className="list-decimal pl-6 mb-4">
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate Company, a Company employee, another user, or any other person or entity.</li>
              <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of Service, or which, as determined by us, may harm or offend Company or users of Service or expose them to liability.</li>
            </ol>
            
            <h3>9. Changes to Service</h3>
            <p>
              We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of Service, or the entire Service, to users, including registered users.
            </p>
            
            <h3>10. Amendments to Terms</h3>
            <p>
              We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically. Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.
            </p>
            <p>
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use Service.
            </p>
            
            <h3>11. Governing Law</h3>
            <p>
              These Terms shall be governed and construed in accordance with the laws of State of California, United States, without regard to its conflict of law provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding Service.
            </p>
            
            <h3>12. Contact Us</h3>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-disc pl-6">
              <li>By email: legal@kleenhealth.com</li>
              <li>By visiting this page on our website: <Link to="/contact" className="text-kleen-mint hover:underline">www.kleenhealth.com/contact</Link></li>
            </ul>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Terms;
