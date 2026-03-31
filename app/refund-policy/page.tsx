import React from 'react';
import LegalLayout from '@/components/LegalLayout';

export const metadata = {
  title: 'Refund Policy | Pixen India Digital',
  description: 'Our refund and billing policies for digital marketing services.',
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="March 29, 2024">
      <h2>1. Overview</h2>
      <p>
        At Pixen India Digital, we pride ourselves on delivering high-quality, specialized digital marketing and consulting services. 
        Because our services involve immediate resource allocation, labor-intensive strategic planning, and intellectual property creation, 
        we have instituted a strict return and refund policy to protect our business operations and the value we provide.
      </p>
      <p>
        By purchasing our services through this website (via Razorpay or any other medium), you acknowledge and agree to the terms outlined below.
      </p>

      <h2>2. No Refund Policy</h2>
      <p>
        <strong>Once a service has commenced, all payments made to Pixen India Digital are strictly non-refundable.</strong>
      </p>
      <p>
        Service commencement is defined as the moment the payment is successfully completed and your account manager is assigned, which typically happens immediately upon checkout. 
        Due to the nature of digital marketing services—which include immediate strategic planning, infrastructure setup, and team allocation—we cannot recover the time 
        and labor invested once a project begins.
      </p>

      <h2>3. Exceptions (Extenuating Circumstances)</h2>
      <p>
        Refunds will only be considered under the following strictly defined conditions:
      </p>
      <ul>
        <li><strong>Duplicate Payment Error:</strong> If you are charged multiple times for the exact same transaction due to a technical glitch on our website or payment gateway. In this case, the duplicate amount will be refunded in full.</li>
        <li><strong>Non-Delivery of Service:</strong> If Pixen India Digital fails to begin the onboarding process or deliver any framework within 14 calendar days of payment, without any prior communication or delay caused by the client.</li>
      </ul>

      <h2>4. Dispute Resolution Process</h2>
      <p>
        If you believe you qualify for an exceptional refund based on the criteria above, you must submit a formal request:
      </p>
      <ol>
        <li>Email our billing department at <strong>Pixenindiadigital@gmail.com</strong> with the subject line &quot;Refund Request - [Your Order ID]&quot;.</li>
        <li>Include proof of payment, screenshot of the duplicate charge (if applicable), and a detailed explanation of why the refund is requested.</li>
        <li>Our team will investigate the claim and respond within 5-7 business days.</li>
      </ol>
      <p>
        If a refund is approved by our management team, it will be processed directly back to the original method of payment via Razorpay. 
        Please allow 5-10 business days for the credit to appear on your bank statement, depending on your card issuer&apos;s policies.
      </p>

      <h2>5. Advertising Spend Ad-Hoc Payments</h2>
      <p>
        Please note that any budget allocated directly to third-party advertising platforms (e.g., Meta Ads, Google Ads, LinkedIn Ads) 
        is completely outside of our control. Pixen India Digital cannot refund advertising spend that has been transacted by third-party platforms.
      </p>

      <h2>6. Chargebacks and Payment Disputes</h2>
      <p>
        We urge you to contact us directly to resolve any payment issues before filing a chargeback with your bank or credit card provider. 
        Frivolous chargebacks that violate this Refund Policy will be contested with all available evidence, including this agreed-upon electronic contract, 
        IP logs, and communication history. Accounts initiating unwarranted chargebacks may be suspended immediately.
      </p>

    </LegalLayout>
  );
}
