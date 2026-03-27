import React from 'react';
import { Navbar, Footer, Button, Section, Card, Badge, Container } from '@/components';

export default function ComponentShowcase() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Container size="xl" className="py-12">
          
          <div className="text-center mb-12">
            <Badge variant="primary" size="md">Design System</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-4 text-balance">
              Pixen India UI Components
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete library of reusable components for building premium digital experiences
            </p>
          </div>

          <Section bgColor="white" padding="lg" container={false}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Button Variants</h2>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="md">Primary Action</Button>
                <Button variant="secondary" size="md">Secondary Action</Button>
                <Button variant="outline" size="md">Outline Button</Button>
                <Button variant="ghost" size="md">Ghost Button</Button>
              </div>
              
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="md" fullWidth>Full Width Button</Button>
              </div>
            </div>
          </Section>

          <Section bgColor="white" padding="lg" container={false}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Badge Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Badge variant="primary">Primary Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="success">Success Badge</Badge>
              <Badge variant="warning">Warning Badge</Badge>
              <Badge variant="error">Error Badge</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Badge variant="primary" size="sm">Small</Badge>
              <Badge variant="primary" size="md">Medium</Badge>
            </div>
          </Section>

          <Section bgColor="white" padding="lg" container={false}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Card Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="default" hover>
                <h3 className="text-lg font-bold mb-2">Default Card</h3>
                <p className="text-gray-600">Clean card with subtle shadow and hover effect.</p>
              </Card>
              
              <Card variant="elevated" hover>
                <h3 className="text-lg font-bold mb-2">Elevated Card</h3>
                <p className="text-gray-600">Enhanced shadow for more prominence.</p>
              </Card>
              
              <Card variant="bordered" hover>
                <h3 className="text-lg font-bold mb-2">Bordered Card</h3>
                <p className="text-gray-600">Border styling for defined edges.</p>
              </Card>
            </div>
          </Section>

          <div className="space-y-8">
            <Section bgColor="white" padding="lg" container={false}>
              <h2 className="text-2xl font-bold mb-4">White Background</h2>
              <p className="text-gray-600">Clean white background for content sections.</p>
            </Section>

            <Section bgColor="gray" padding="lg" container={false}>
              <h2 className="text-2xl font-bold mb-4">Gray Gradient Background</h2>
              <p className="text-gray-600">Subtle gray gradient for visual separation.</p>
            </Section>

            <Section bgColor="primary" padding="lg" container={false}>
              <h2 className="text-2xl font-bold mb-4 text-white">Primary Background</h2>
              <p className="text-primary-100">Brand primary color for CTAs and highlights.</p>
            </Section>

            <Section bgColor="accent" padding="lg" container={false}>
              <h2 className="text-2xl font-bold mb-4">Accent Background</h2>
              <p className="text-gray-700">Accent color for secondary emphasis.</p>
            </Section>

            <Section bgColor="dark" padding="lg" container={false}>
              <h2 className="text-2xl font-bold mb-4 text-white">Dark Background</h2>
              <p className="text-gray-300">Dark theme for footer and special sections.</p>
            </Section>
          </div>

          <Section bgColor="white" padding="xl" container={false}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Component Composition Example</h2>
            <Card variant="elevated">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">Feature Highlight</h3>
                    <Badge variant="success">New</Badge>
                  </div>
                  <p className="text-gray-600 mb-4">
                    This demonstrates how multiple components work together to create beautiful, 
                    functional UI elements. Combine badges, cards, buttons, and sections freely.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm">Learn More</Button>
                    <Button variant="outline" size="sm">Get Started</Button>
                  </div>
                </div>
              </div>
            </Card>
          </Section>

          <Section bgColor="white" padding="lg" container={false}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Padding Scale</h2>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded">
                <p className="font-semibold mb-2">Small Padding (py-8)</p>
                <p className="text-sm text-gray-600">Compact sections with minimal vertical space.</p>
              </div>
              <div className="bg-gray-100 py-8 rounded">
                <p className="font-semibold mb-2">Medium Padding (py-12)</p>
                <p className="text-sm text-gray-600">Balanced spacing for standard content.</p>
              </div>
              <div className="bg-gray-100 py-12 rounded">
                <p className="font-semibold mb-2">Large Padding (py-16-24)</p>
                <p className="text-sm text-gray-600">Generous whitespace for important sections.</p>
              </div>
              <div className="bg-gray-100 py-16 rounded">
                <p className="font-semibold mb-2">Extra Large Padding (py-20-32)</p>
                <p className="text-sm text-gray-600">Maximum breathing room for hero and CTA sections.</p>
              </div>
            </div>
          </Section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
