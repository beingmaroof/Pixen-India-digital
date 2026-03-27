

import React from 'react';
import { Navbar, Footer, Section, Container, Badge } from '@/components';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: '1. Introduction',
      content: (
        <>
          <p className="mb-4">
            Welcome to Pixen India Digital (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our digital marketing services.
          </p>
          <p className="mb-4">
            By accessing or using our services, you agree to the terms of this Privacy Policy. If you do not agree with these practices, please do not use our services.
          </p>
        </>
      )
    },
    {
      title: '2. Information We Collect',
      subsections: [
        {
          title: '2.1 Personal Information',
          content: 'We may collect personal information that you voluntarily provide to us, including but not limited to:'
        },
        {
          items: [
            'Name, email address, phone number, and company name',
            'Billing and payment information',
            'Business details and marketing objectives',
            'Communications and correspondence with our team',
            'Account credentials for platforms we manage on your behalf'
          ]
        },
        {
          title: '2.2 Automatically Collected Information',
          content: 'When you visit our website, we automatically collect certain information, including:'
        },
        {
          items: [
            'IP address and browser type',
            'Device information and operating system',
            'Pages visited and time spent on pages',
            'Referring website addresses',
            'Cookies and similar tracking technologies'
          ]
        }
      ]
    },
    {
      title: '3. How We Use Your Information',
      content: (
        <>
          <p className="mb-4">We use the information we collect for various business purposes, including:</p>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li>Providing, maintaining, and improving our digital marketing services</li>
            <li>Managing your account and providing customer support</li>
            <li>Processing transactions and sending related information</li>
            <li>Sending promotional communications (with your consent)</li>
            <li>Monitoring and analyzing trends, usage, and activities</li>
            <li>Personalizing your experience on our website</li>
            <li>Detecting, investigating, and preventing fraudulent transactions</li>
            <li>Complying with legal obligations</li>
          </ul>
        </>
      )
    },
    {
      title: '4. Data Sharing and Disclosure',
      content: (
        <>
          <p className="mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Service Providers</h4>
          <p className="mb-4">
            We may share information with trusted third-party service providers who assist us in operating our business, such as payment processors, analytics providers, and marketing platforms. These providers are contractually obligated to protect your information.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Legal Requirements</h4>
          <p className="mb-4">
            We may disclose your information if required by law, regulation, legal process, or governmental request. We may also share information to protect our rights, prevent fraud, or ensure the safety of our users.
          </p>
          
          <h4 className="font-bold text-gray-900 mt-4 mb-2">Business Transfers</h4>
          <p className="mb-4">
            In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction. You will be notified via email or prominent notice on our website of any change in ownership.
          </p>
        </>
      )
    },
    {
      title: '5. Cookies and Tracking Technologies',
      content: (
        <>
          <p className="mb-4">
            We use cookies, web beacons, and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences. However, disabling cookies may limit your ability to use certain features of our website.
          </p>
          <p className="mb-4">
            We use the following types of cookies:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand website usage and performance</li>
            <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          </ul>
        </>
      )
    },
    {
      title: '6. Data Security',
      content: (
        <>
          <p className="mb-4">
            We implement industry-standard security measures to protect your personal information, including encryption, firewalls, and secure data storage. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
          </p>
          <p className="mb-4">
            Your account information is protected by password authentication. Please keep your password confidential and do not share it with anyone.
          </p>
        </>
      )
    },
    {
      title: '7. Your Rights and Choices',
      content: (
        <>
          <p className="mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li>Access to personal information we hold about you</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction or objection to processing of your data</li>
            <li>Data portability (receiving your data in a structured format)</li>
            <li>Withdrawal of consent at any time</li>
            <li>Opt-out of marketing communications</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, please contact us at <a href="mailto:Pixenindiadigital@gmail.com" className="text-primary-600 hover:text-primary-700 underline">Pixenindiadigital@gmail.com</a>. We will respond to your request within 30 days.
          </p>
        </>
      )
    },
    {
      title: '8. Data Retention',
      content: (
        <p className="mb-4">
          We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When determining retention periods, we consider the nature of the information, the purposes for which it is processed, and applicable legal requirements.
        </p>
      )
    },
    {
      title: '9. Third-Party Links',
      content: (
        <p className="mb-4">
          Our website may contain links to third-party websites, applications, or services that are not operated by us. This Privacy Policy does not apply to third-party sites. We encourage you to review the privacy policies of any third-party sites you visit.
        </p>
      )
    },
    {
      title: '10. Children\'s Privacy',
      content: (
        <p className="mb-4">
          Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information.
        </p>
      )
    },
    {
      title: '11. International Data Transfers',
      content: (
        <p className="mb-4">
          Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from those of your country. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
        </p>
      )
    },
    {
      title: '12. Changes to This Privacy Policy',
      content: (
        <p className="mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. We encourage you to review this Privacy Policy periodically.
        </p>
      )
    },
    {
      title: '13. Contact Us',
      content: (
        <>
          <p className="mb-4">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
        
        <Section padding="xl" bgColor="gray" container={false}>
          <Container size="xl">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <Badge variant="primary">Legal Documents</Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-balance">
                Privacy{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Your privacy is important to us. Learn how we collect, use, and protect your personal information.
              </p>
              
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mt-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Last Updated: January 2025
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  GDPR Compliant
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
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-200">
                    {section.title}
                  </h2>
                  
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    {section.content}
                    
                    {section.subsections && section.subsections.map((subsection, idx) => (
                      <div key={idx} className="mt-6">
                        {subsection.title && (
                          <h3 className="text-lg font-bold text-gray-900 mb-3 mt-6">
                            {subsection.title}
                          </h3>
                        )}
                        {subsection.content && <p className="mb-3">{subsection.content}</p>}
                        {subsection.items && (
                          <ul className="list-disc list-inside space-y-2 ml-4">
                            {subsection.items.map((item, itemIdx) => (
                              <li key={itemIdx}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="primary" container={false}>
          <Container size="xl">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Have Questions?
              </h2>
              <p className="text-xl text-primary-100">
                Our team is here to help. Contact us if you have any questions about our privacy practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:Pixenindiadigital@gmail.com"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-white text-primary-600 hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 duration-300"
                >
                  Contact Privacy Team
                </a>
                <a 
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white/30 text-white hover:bg-white hover:text-primary-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-300"
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
