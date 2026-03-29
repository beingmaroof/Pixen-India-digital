import React from 'react';
import LegalLayout from '@/components/LegalLayout';

export const metadata = {
  title: 'Privacy Policy | Pixen India Digital',
  description: 'Our commitment to protecting your privacy and personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="March 29, 2024">
      <h2>1. Introduction</h2>
      <p>
        Pixen India Digital ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
        This privacy policy describes how we collect, use, and safeguard your personal information when you visit our website 
        (https://pixenindiadigital.vercel.app) and use our digital marketing and consulting services.
      </p>

      <h2>2. Data We Collect</h2>
      <p>We may collect, use, store, and transfer different kinds of personal data about you, which we have grouped together as follows:</p>
      <ul>
        <li><strong>Identity Data:</strong> First name, last name, username or similar identifier.</li>
        <li><strong>Contact Data:</strong> Billing address, email address, and telephone numbers.</li>
        <li><strong>Financial Data:</strong> Bank account and payment card details (processed securely via our payment gateway partner, Razorpay). We do not store full credit card numbers on our servers.</li>
        <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of services you have purchased from us.</li>
        <li><strong>Technical Data:</strong> Internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
        <li><strong>Profile Data:</strong> Your username and password, purchases or orders made by you, your interests, preferences, feedback, and survey responses.</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
      <ul>
        <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., executing digital marketing campaigns).</li>
        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
        <li>Where we need to comply with a legal obligation.</li>
      </ul>
      <p>
        Specifically, we use your data to register you as a new client, process payments, manage our relationship with you, 
        and deliver relevant website content and advertisements to you.
      </p>

      <h2>4. Third-Party Services</h2>
      <p>
        We may share your data with trusted third-party service providers who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. 
      </p>
      <ul>
        <li><strong>Payment Processors:</strong> We use Razorpay to process payments securely. Razorpay's use of your personal information is governed by their privacy policy.</li>
        <li><strong>Database and Authentication:</strong> We use Supabase for secure backend infrastructure and user authentication.</li>
        <li><strong>Analytics:</strong> We may use Google Analytics or similar providers to monitor and analyze the use of our service.</li>
      </ul>

      <h2>5. Cookies and Tracking Technologies</h2>
      <p>
        We use cookies and similar tracking technologies to track the activity on our service and hold certain information. 
        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, 
        you may not be able to use some portions of our service, such as the authenticated dashboard.
      </p>

      <h2>6. International Data Transfers (GDPR Compliance)</h2>
      <p>
        If you are located in the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). 
        We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
      </p>
      <p>
        In general, your data is processed and stored in India or other locations where our service providers maintain facilities. By using our services, 
        you consent to the transfer of information to countries outside of your country of residence, which may have different data protection rules than those of your country.
      </p>

      <h2>7. Data Security</h2>
      <p>
        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, 
        altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. 
        They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
      </p>

      <h2>8. Your Legal Rights</h2>
      <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data. You have the right to:</p>
      <ul>
        <li>Request access to your personal data.</li>
        <li>Request correction of your personal data.</li>
        <li>Request erasure of your personal data.</li>
        <li>Object to processing of your personal data.</li>
        <li>Request restriction of processing your personal data.</li>
        <li>Request transfer of your personal data.</li>
        <li>Right to withdraw consent.</li>
      </ul>

      <h2>9. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at: <br/>
        <strong>Email:</strong> Pixenindiadigital@gmail.com <br/>
        <strong>Phone:</strong> +91 78277 17445 (India)
      </p>
    </LegalLayout>
  );
}
