

import React from 'react';
import { Navbar, Footer, Section, Container, Badge } from '@/components';

export default function TermsOfServicePage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: (
        <>
          <p className="mb-4">
            Welcome to Pixen India Digital. These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Client,&quot; &quot;you,&quot; or &quot;your&quot;) and Pixen India Digital (&quot;Agency,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) regarding your use of our website and digital marketing services.
          </p>
          <p className="mb-4">
            By accessing our website, creating an account, or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with these Terms, please do not use our services.
          </p>
        </>
      )
    },
    {
      title: '2. Description of Services',
      content: (
        <>
          <p className="mb-4">
            Pixen India Digital provides comprehensive digital marketing and growth services, which may include but are not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li>Growth Marketing and Digital Advertising</li>
            <li>Social Media Management and Content Creation</li>
            <li>Influencer Marketing Campaigns</li>
            <li>Business Consultancy and Strategy</li>
            <li>Website Optimization and Conversion Rate Optimization</li>
            <li>Creative Design and Branding Services</li>
            <li>Search Engine Optimization (SEO)</li>
            <li>Analytics and Performance Reporting</li>
          </ul>
          <p className="mb-4">
            Specific service deliverables, timelines, and pricing will be outlined in separate Service Agreements or Statements of Work (SOW) for each client engagement.
          </p>
        </>
      )
    },
    {
      title: '3. Client Obligations',
      content: (
        <>
          <p className="mb-4">As a client, you agree to:</p>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li>Provide accurate, complete, and timely information necessary for service delivery</li>
            <li>Respond promptly to requests for feedback, approvals, or clarifications</li>
            <li>Grant necessary access to platforms, accounts, and resources required for service execution</li>
            <li>Ensure all content, materials, and information provided comply with applicable laws and do not infringe third-party rights</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
            <li>Comply with all applicable laws and regulations in your jurisdiction</li>
          </ul>
        </>
      )
    },
    {
      title: '4. Payment Terms',
      content: (
        <>
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Fees and Billing</h4>
          <p className="mb-4">
            Service fees are as outlined in your Service Agreement or as displayed on our website. All fees are in Indian Rupees (INR) unless otherwise specified. Prices exclude applicable taxes such as GST, which will be charged additionally.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Payment Schedule</h4>
          <p className="mb-4">
            Unless otherwise agreed, monthly retainer fees are due in advance on the first day of each month. Project-based fees follow the payment schedule outlined in the SOW. Late payments may incur a penalty of 2% per month or the maximum rate permitted by law.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Refund Policy</h4>
          <p className="mb-4">
            Due to the nature of digital marketing services, we do not offer refunds for services already rendered. If you terminate services mid-month, you will be billed for the full month. Project cancellations may be subject to cancellation fees as outlined in the SOW.
          </p>
        </>
      )
    },
    {
      title: '5. Intellectual Property Rights',
      content: (
        <>
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Our Intellectual Property</h4>
          <p className="mb-4">
            All intellectual property rights in our methodologies, strategies, templates, tools, reports, and pre-existing materials remain our exclusive property. Nothing in these Terms transfers ownership of our intellectual property to you.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Client Materials</h4>
          <p className="mb-4">
            You retain all rights to your brand assets, logos, trademarks, content, and materials provided to us. You grant us a non-exclusive, worldwide, royalty-free license to use these materials solely for the purpose of providing our services.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Deliverables</h4>
          <p className="mb-4">
            Upon full payment, you receive ownership of final deliverables specifically created for you (e.g., ad creatives, content, reports). However, underlying strategies, methodologies, and know-how remain our property. We reserve the right to showcase our work in portfolios and case studies unless otherwise agreed in writing.
          </p>
        </>
      )
    },
    {
      title: '6. Performance and Results',
      content: (
        <>
          <p className="mb-4">
            While we employ industry best practices and strive for exceptional results, we cannot guarantee specific outcomes such as revenue, traffic, rankings, or conversion rates. Digital marketing performance depends on numerous factors beyond our control, including:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li>Market conditions and competition</li>
            <li>Platform algorithm changes (Google, Facebook, etc.)</li>
            <li>Budget allocation and campaign parameters</li>
            <li>Industry seasonality and trends</li>
            <li>Client product/service quality and market fit</li>
            <li>Economic factors and consumer behavior</li>
          </ul>
          <p className="mb-4">
            Any projections, estimates, or case study results are for illustrative purposes only and do not constitute guarantees of similar outcomes.
          </p>
        </>
      )
    },
    {
      title: '7. Confidentiality',
      content: (
        <>
          <p className="mb-4">
            Both parties agree to maintain confidentiality regarding proprietary information disclosed during the engagement. Confidential information includes business strategies, customer data, financial information, trade secrets, and other non-public information.
          </p>
          <p className="mb-4">
            This obligation does not apply to information that:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li>Is or becomes publicly available through no breach of this agreement</li>
            <li>Was rightfully known prior to disclosure</li>
            <li>Is independently developed without use of confidential information</li>
            <li>Is required to be disclosed by law or court order</li>
          </ul>
        </>
      )
    },
    {
      title: '8. Limitation of Liability',
      content: (
        <>
          <p className="mb-4">
            To the maximum extent permitted by law, Pixen India Digital shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li>Loss of profits, revenue, or business opportunities</li>
            <li>Loss of data or business interruption</li>
            <li>Reputational damage or goodwill</li>
            <li>Cost of substitute services</li>
          </ul>
          <p className="mb-4">
            Our total liability for any claims arising out of these Terms or our services shall not exceed the total amount paid by you to us in the six (6) months preceding the claim.
          </p>
        </>
      )
    },
    {
      title: '9. Indemnification',
      content: (
        <p className="mb-4">
          You agree to indemnify, defend, and hold harmless Pixen India Digital from any claims, liabilities, damages, losses, or expenses (including legal fees) arising from: (a) your use of our services; (b) your violation of these Terms; (c) your infringement of third-party rights; or (d) your negligent or wrongful acts.
        </p>
      )
    },
    {
      title: '10. Term and Termination',
      content: (
        <>
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Term</h4>
          <p className="mb-4">
            Services commence on the effective date of your Service Agreement and continue until terminated in accordance with this section.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Termination by Client</h4>
          <p className="mb-4">
            You may terminate services with thirty (30) days written notice. Early termination fees may apply for fixed-term contracts or projects.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Termination by Agency</h4>
          <p className="mb-4">
            We may suspend or terminate services immediately if you breach these Terms, fail to make payments, engage in illegal activities, or provide harmful or offensive materials.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Effect of Termination</h4>
          <p className="mb-4">
            Upon termination, you must pay all outstanding fees. We will provide a transition period and reasonable assistance to transfer services to another provider, subject to payment of all dues.
          </p>
        </>
      )
    },
    {
      title: '11. Modifications to Services',
      content: (
        <p className="mb-4">
          We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, with or without notice. We may also update these Terms periodically. Material changes will be communicated via email or prominent notice on our website. Continued use of services after modifications constitutes acceptance of updated Terms.
        </p>
      )
    },
    {
      title: '12. Force Majeure',
      content: (
        <p className="mb-4">
          We shall not be liable for delays or failures in performance resulting from circumstances beyond our reasonable control, including natural disasters, pandemics, war, terrorism, government actions, internet disruptions, or platform outages.
        </p>
      )
    },
    {
      title: '13. Governing Law and Dispute Resolution',
      content: (
        <>
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Governing Law</h4>
          <p className="mb-4">
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Dispute Resolution</h4>
          <p className="mb-4">
            Any disputes shall first be attempted to be resolved amicably through good faith negotiations. If unresolved within 30 days, disputes shall be submitted to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996. The seat of arbitration shall be Mumbai, India.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Court Jurisdiction</h4>
          <p className="mb-4">
            Subject to arbitration, courts in Mumbai, India shall have exclusive jurisdiction over any disputes.
          </p>
        </>
      )
    },
    {
      title: '14. General Provisions',
      content: (
        <>
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Entire Agreement</h4>
          <p className="mb-4">
            These Terms, together with any Service Agreements, constitute the entire agreement between you and Pixen India Digital.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Severability</h4>
          <p className="mb-4">
            If any provision is found unenforceable, the remaining provisions shall continue in full force and effect.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Waiver</h4>
          <p className="mb-4">
            Failure to enforce any right or provision constitutes a waiver and does not affect future enforcement.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Assignment</h4>
          <p className="mb-4">
            You may not assign these Terms without our prior written consent. We may assign these Terms in connection with a merger, acquisition, or asset sale.
          </p>
        </>
      )
    },
    {
      title: '15. Contact Information',
      content: (
        <>
          <p className="mb-4">
            For questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <p className="mb-2"><strong>Email:</strong> <a href="mailto:Pixenindiadigital@gmail.com" className="text-primary-600 hover:text-primary-700 underline">Pixenindiadigital@gmail.com</a></p>
            <p className="mb-2"><strong>Phone:</strong> +91 78277 17445</p>
            <p><strong>Address:</strong> Pixen India Digital, India (Remote-First Agency)</p>
          </div>
        </>
      )
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent-50">
        
        <Section padding="xl" bgColor="gray" container={false}>
          <Container size="xl">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <Badge variant="secondary">Legal Documents</Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-balance">
                Terms of{' '}
                <span className="bg-gradient-to-r from-accent-600 to-accent-700 bg-clip-text text-transparent">
                  Service
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Please read these terms carefully before using our services. They govern your use of our website and digital marketing services.
              </p>
              
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mt-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Last Updated: January 2025
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Legally Binding
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="white" container={false}>
          <Container size="lg">
            <div className="max-w-4xl mx-auto">
              {sections.map((section, index) => (
                <div key={index} className="mb-12 last:mb-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-accent-200">
                    {section.title}
                  </h2>
                  
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="accent" container={false}>
          <Container size="xl">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-700">
                By using our services, you agree to these terms. Let&apos;s build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-white text-accent-600 hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 duration-300"
                >
                  Start Your Project
                </a>
                <a 
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-300"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
