import React from 'react';
import LegalLayout from '@/components/LegalLayout';

export const metadata = {
  title: 'Cancellation Policy | Pixen India Digital',
  description: 'Procedures and terms for cancelling your Pixen India Digital services.',
};

export default function CancellationPolicyPage() {
  return (
    <LegalLayout title="Cancellation Policy" lastUpdated="March 29, 2024">
      <h2>1. General Cancellation Terms</h2>
      <p>
        At Pixen India Digital, we partner with our clients on a dedicated, retainer-based, or project-based structure. 
        Because our resources and agency bandwidth are systematically allocated to fulfill our contractual obligations to you 
        from the moment you join, we operate under strict cancellation terms.
      </p>
      <p>
        By engaging our services, you agree that a cancellation requires advanced written notice, protecting both your business transition 
        and our agency&apos;s scheduled labor.
      </p>

      <h2>2. Notice Period Requirement</h2>
      <p>
        <strong>All active ongoing service retainers require a mandatory 30-day written cancellation notice.</strong>
      </p>
      <p>
        If you wish to terminate an ongoing monthly service (e.g., ad management, SEO, continuous consulting), you must email 
        <strong>Pixenindiadigital@gmail.com</strong> stating your intent to cancel. The cancellation will become effective exactly 30 days 
        from the date written notice is received.
      </p>

      <h2>3. Billing During the Notice Period</h2>
      <p>
        During the 30-day notice period, our team will continue to service your account normally, fulfilling all contracted obligations. 
        You remain liable for any standard monthly fees or prorated charges that fall within this 30-day window.
      </p>
      <p>
        For instance, if your billing cycle resets on the 1st of the month and you submit cancellation on the 15th, you will be billed a prorated amount 
        for the remaining 15 days of the required 30-day notice period spanning into the next month.
      </p>

      <h2>4. Project-Based Work (One-Time Projects)</h2>
      <p>
        For flat-fee, project-based work (such as web development, brand identity creation, or one-time audits), cancellation is permitted 
        <strong>within 48 hours of initial payment</strong>, provided that work has not commenced (i.e. kickoff call held, or assets requested).
      </p>
      <p>
        Once project execution has commenced, the contract is binding and <strong>cannot be cancelled or refunded</strong> for the duration of the agreed scope of work. 
        If you abandon the project mid-execution, you remain legally responsible for the remaining balance owed for completed milestones.
      </p>

      <h2>5. Agency-Initiated Cancellation</h2>
      <p>
        Pixen India Digital reserves the right to terminate our service agreement with you immediately, without prior notice, if:
      </p>
      <ul>
        <li>There is a breach of our Terms and Conditions.</li>
        <li>You fail to pay invoices within 7 days of their due date.</li>
        <li>Your conduct is abusive, unresponsive, or impedes our ability to deliver results effectively.</li>
      </ul>
      <p>
        In such cases, you will be billed solely for the services rendered up to the exact date of termination. No future fees will apply.
      </p>

      <h2>6. Contact Instructions</h2>
      <p>
        To submit a formal cancellation request, DO NOT use WhatsApp, social media DMs, or verbal communication. It must be written via email to ensure a legal record.
      </p>
      <p>
        Send your cancellation notice to: <strong>Pixenindiadigital@gmail.com</strong> with the subject line &quot;Cancellation Notice - [Your Company Name]&quot;.
      </p>
    </LegalLayout>
  );
}
