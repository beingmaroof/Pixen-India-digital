import React from 'react';
import LegalLayout from '@/components/LegalLayout';

export const metadata = {
  title: 'Disclaimer | Pixen India Digital',
  description: 'Legal disclaimers outlining the limitations of liability and performance expectations.',
};

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Legal Disclaimer" lastUpdated="March 29, 2024">
      <h2>1. Performance & Earnings Disclaimer</h2>
      <p>
        Pixen India Digital is a specialized growth and digital marketing agency. Any earnings, metrics, or income statements, or examples of earnings or income, 
        are only estimates of what we think you could possibly earn or achieve. There is no assurance you will do as well. 
        If you rely upon our figures, you must accept the risk of not doing as well.
      </p>
      <p>
        Where specific income figures or ROAS (Return on Ad Spend) metrics are used, and attributed to an individual or business, those persons or businesses 
        have earned that amount. There is no assurance you will do as well. Any and all claims or representations as to income earnings on this website 
        are not to be considered as average earnings. Testimonials are not statistically representative.
      </p>
      
      <h2>2. "No Guaranteed Results" Clause</h2>
      <p>
        Success in any business endeavor depends on numerous factors completely outside our control, including your background, dedication, team execution, 
        budget restrictions, changing market conditions, software algorithm updates, and overall product-market fit.
      </p>
      <p>
        <strong>While we execute strategies using industry best practices, Pixen India Digital implicitly and explicitly makes no guarantees regarding the financial outcome of our services.</strong> 
        You accept that running paid media, SEO, or any online marketing involves an inherent risk of capital loss, and that your marketing budget may be partially or fully depleted 
        without a positive financial return. You agree that Pixen India Digital is not liable for the success or failure of your business decisions relating to any information presented by our agency.
      </p>

      <h2>3. Third-Party Platform Liability</h2>
      <p>
        Our services rely heavily on third-party platforms including, but not limited to, Meta (Facebook/Instagram), Google Search, YouTube, LinkedIn, and TikTok. 
        These platforms are independent entities and operate under their own terms of service, acceptable use policies, and proprietary algorithms.
      </p>
      <p>We are not liable for any:</p>
      <ul>
        <li>Ad account suspensions, bans, or disabled business managers.</li>
        <li>Sudden drops in organic traffic due to unannounced algorithmic updates.</li>
        <li>Increases in advertising costs (CPCs/CPAs) dictated by market bidding environments.</li>
        <li>Technical glitches, outages, or API failures on the part of third-party platforms.</li>
      </ul>
      <p>
        In the event of an account ban by a third party, our agency will assist in the appeal process based on standard guidelines. However, we cannot guarantee the recovery of any suspended assets, and our service fees remain payable for the strategy and execution work performed regardless of platform punitive actions.
      </p>

      <h2>4. Non-Endorsement</h2>
      <p>
        Pixen India Digital is an independent agency and has no corporate affiliation, endorsement, or formal partnership implying liability with Meta Platforms, Inc., Google LLC, or Microsoft Corporation unless explicitly certified (e.g., Google Partner badge), which only implies certification in advertising execution, not legal liability coverage.
      </p>

      <h2>5. Acceptance of Risk</h2>
      <p>
        By accessing this website, purchasing our services, or acting upon our consultation advice, you explicitly agree that you have read this Disclaimer and accept all associated business risks.
      </p>
    </LegalLayout>
  );
}
