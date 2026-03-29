import React from 'react';
import LegalLayout from '@/components/LegalLayout';

export const metadata = {
  title: 'Terms and Conditions | Pixen India Digital',
  description: 'Terms and conditions for using Pixen India Digital services.',
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" lastUpdated="March 29, 2024">
      <h2>1. Agreement to Terms</h2>
      <p>
        These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") 
        and Pixen India Digital ("Company," "we," "us," or "our"), concerning your access to and use of the 
        https://pixenindiadigital.vercel.app website as well as any other media form, media channel, mobile website, 
        or services related, linked, or otherwise connected thereto (collectively, the "Site").
      </p>
      <p>
        By accessing the Site and/or purchasing our services, you agree that you have read, understood, and agree to be bound by all of these Terms and Conditions. 
        <strong>IF YOU DO NOT AGREE WITH ALL OF THESE TERMS AND CONDITIONS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND MUST DISCONTINUE USE IMMEDIATELY.</strong>
      </p>

      <h2>2. Nature of Services</h2>
      <p>
        Pixen India Digital operates as a digital marketing and growth consulting agency. Our services may include, but are not limited to, 
        digital advertising management, lead generation, branding, web development, and strategic consulting. 
        All services are strictly digital in nature. <strong>No physical products are shipped or delivered.</strong>
      </p>

      <h2>3. Intellectual Property Rights</h2>
      <p>
        Unless otherwise indicated, the Site and the Services are our proprietary property and all source code, databases, functionality, software, 
        website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, 
        and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
      </p>
      <p>
        Upon full payment for marketing management services, the resulting ad creatives, copy, and campaigns designed exclusively for your brand 
        are owned by you. However, Pixen India Digital retains the right to use non-confidential campaign data and creatives as case studies or portfolio pieces unless explicitly agreed otherwise.
      </p>

      <h2>4. User Responsibilities</h2>
      <p>By using the Site and our Services, you represent and warrant that:</p>
      <ul>
        <li>All registration and payment information you submit will be true, accurate, current, and complete.</li>
        <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
        <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
        <li>You will not use the Site for any illegal or unauthorized purpose.</li>
        <li>Your use of the Site will not violate any applicable law or regulation.</li>
        <li>You will provide necessary access to ad accounts, brand assets, and CRM systems required for us to fulfill our service delivery. Delay in providing assets may delay service delivery, for which we hold no liability.</li>
      </ul>

      <h2>5. Payment Terms</h2>
      <p>
        We use Razorpay as our primary payment gateway. By entering your payment information, you authorize us and our payment processors to charge 
        the amount due to your designated payment method. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, 
        EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE OR OUR SERVICES.
      </p>
      
      <h2>7. No Guaranteed Results Disclaimer</h2>
      <p>
        Pixen India Digital provides expert marketing and consulting services based on industry best practices. However, digital marketing involves inherent risks 
        and reliance on third-party platforms (like Facebook, Google, LinkedIn). <strong>Therefore, we do not and cannot guarantee specific financial results, return on ad spend (ROAS), 
        cost per acquisition (CPA), or revenue increases.</strong> Past performance is not indicative of future results. Success depends on various factors including, but not limited to, 
        market conditions, your product-market fit, pricing, and sales processes.
      </p>

      <h2>8. Governing Law and Jurisdiction</h2>
      <p>
        These Terms shall be governed by and defined following the laws of India. Pixen India Digital and yourself irrevocably consent that the courts 
        of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <br/>
        <strong>Email:</strong> Pixenindiadigital@gmail.com <br/>
        <strong>Phone:</strong> +91 78277 17445
      </p>
    </LegalLayout>
  );
}
