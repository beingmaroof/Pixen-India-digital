import React from 'react';
import LegalLayout from '@/components/LegalLayout';

export const metadata = {
  title: 'Shipping & Delivery Policy | Pixen India Digital',
  description: 'Delivery and shipping expectations for digital services.',
};

export default function ShippingPolicyPage() {
  return (
    <LegalLayout title="Shipping & Delivery Policy" lastUpdated="March 29, 2024">
      <h2>1. Service Classification</h2>
      <p>
        Pixen India Digital is a legally registered digital services and consulting agency. We specialize exclusively in entirely digital outputs, 
        including but not limited to software configurations, advertising campaign setups, strategy documentation, and video/graphic digital assets.
      </p>

      <h2>2. Absolutely No Physical Shipping</h2>
      <p className="font-bold text-gray-900 bg-gray-100 p-4 rounded-xl border-l-4 border-primary-500">
        No physical products are sold, shipped, or delivered by Pixen India Digital. Therefore, no tracking numbers, shipping costs, or physical handling timeframes apply to any purchases made on this website.
      </p>

      <h2>3. Digital Delivery Framework</h2>
      <p>
        Because our products are purely digital services, "delivery" is defined as the granting of access to our agency infrastructure or the electronic handover of files and reports.
      </p>
      <p>Our standard delivery procedure follows these steps:</p>
      <ul>
        <li><strong>Onboarding Delivery (Immediate to 24 Hours):</strong> Upon successful payment, you will receive an automated email granting you access to your client dashboard or onboarding documentation.</li>
        <li><strong>Asset Delivery (Project Dependent):</strong> All digital assets (documents, graphics, web templates) are delivered electronically via cloud storage links (e.g., Google Drive), email attachments, or direct upload into your advertising accounts.</li>
        <li><strong>Service Delivery (Ongoing):</strong> Retainer services (like ad management) are delivered continuously over the contracted period via monitoring, active adjustments, and routine reporting provided via email or video calls.</li>
      </ul>

      <h2>4. Acceptance of Digital Delivery</h2>
      <p>
        By completing a purchase for Pixen India Digital's services through our payment gateway (e.g., Razorpay), you explicitly acknowledge that you are purchasing a digital service and that no physical goods will be shipped to your billing address.
      </p>

      <h2>5. Delays in Digital Delivery</h2>
      <p>
        Timely delivery of digital services often relies on client cooperation. We are not liable for delays in campaign launches or asset delivery if such delays are caused by:
      </p>
      <ul>
        <li>Failure of the client to provide necessary administrative access (e.g., Meta Business Manager, Google Tag Manager).</li>
        <li>Delayed responses entirely attributable to the client regarding asset approvals or brand guidelines.</li>
        <li>Rejection of necessary ad creatives by third-party platform moderation filters.</li>
      </ul>

      <h2>6. Contact Regarding Delivery</h2>
      <p>
        If you believe you have not received your digital onboarding access or service deliverables within the agreed-upon timeframe, please contact immediately:
      </p>
      <p>
        <strong>Email:</strong> Pixenindiadigital@gmail.com
      </p>
    </LegalLayout>
  );
}
