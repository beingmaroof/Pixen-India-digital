"use client";

import React from 'react';
import { Navbar, Footer, Section, Container, Badge, Button } from '@/components';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  const team = [
    {
      name: 'Rajesh Sharma',
      role: 'Founder & CEO',
      bio: '15+ years in digital marketing and business strategy',
      image: 'RS',
    },
    {
      name: 'Priya Mehta',
      role: 'Head of Growth Marketing',
      bio: 'Expert in performance marketing and data analytics',
      image: 'PM',
    },
    {
      name: 'Amit Kumar',
      role: 'Creative Director',
      bio: 'Award-winning designer with 10+ years experience',
      image: 'AK',
    },
    {
      name: 'Sneha Patel',
      role: 'Social Media Strategist',
      bio: 'Built and managed 50+ successful social media campaigns',
      image: 'SP',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        
        <Section padding="xl" bgColor="gray" container={false}>
          <Container size="xl">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <Badge variant="primary">About Us</Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-balance">
                Your Partner in{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  Digital Growth
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                We&apos;re not just an agency - we&apos;re your growth partners. 
                Together, we&apos;ll turn attention into revenue and brands into authority.
              </p>
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="white" container={false}>
          <Container size="xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  At Pixen India Digital, we believe every business deserves a strong digital presence that drives real results. 
                  Our mission is to empower businesses with data-driven marketing strategies, creative excellence, 
                  and transparent partnerships.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We don&apos;t focus on vanity metrics - we focus on what truly matters: leads, sales, and long-term brand growth. 
                  Our performance-driven approach ensures that every rupee you invest delivers measurable returns.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
                    <div className="text-gray-600">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary-600 mb-2">150+</div>
                    <div className="text-gray-600">Leads Generated Monthly</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary-600 mb-2">8-12%</div>
                    <div className="text-gray-600">Average Conversion Rate</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary-600 mb-2">5+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 shadow-2xl">
                <div className="text-white space-y-6">
                  <h3 className="text-2xl font-bold">Why Choose Us?</h3>
                  <ul className="space-y-4">
                    {[
                      'Revenue-focused, not vanity metrics',
                      'Data-driven decision making',
                      'Transparent reporting & communication',
                      'Custom strategies, not templates',
                      'Dedicated growth team',
                      'Proven track record across industries',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="gray" container={false}>
          <Container size="xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Transparency',
                  description: 'Open communication and honest reporting. No hidden agendas.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ),
                },
                {
                  title: 'Results',
                  description: 'We measure success by your business growth, not likes.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ),
                },
                {
                  title: 'Innovation',
                  description: 'Always learning, testing, and implementing cutting-edge strategies.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                },
                {
                  title: 'Partnership',
                  description: 'We work as an extension of your team, invested in your success.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                },
              ].map((value, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 text-white">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="white" container={false}>
          <Container size="xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-gray-600">
                The experts behind your growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section padding="xl" bgColor="primary" container={false}>
          <Container size="xl">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Let&apos;s Grow Together
              </h2>
              <p className="text-xl text-primary-100">
                Ready to transform your digital presence? Join our growing list of successful clients.
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => router.push('/contact')}
                className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Get in Touch
              </Button>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
