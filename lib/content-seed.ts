export interface BlogPostRecord {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  readTime: string;
  publishedAt: string;
  featured?: boolean;
}

export interface CaseStudyMetric {
  metric: string;
  value: string;
  color?: string;
}

export interface CaseStudyRecord {
  id: string;
  slug: string;
  clientName: string;
  title: string;
  industry: string;
  duration: string;
  problem: string;
  strategy: string;
  summary: string;
  results: CaseStudyMetric[];
  testimonial?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  services: string[];
  featured?: boolean;
}

export interface TestimonialRecord {
  id: string;
  name: string;
  role: string;
  initials: string;
  quote: string;
  metric: string;
  color: string;
}

export interface IndustryPageRecord {
  id: string;
  slug: string;
  industry: string;
  heroTitle: string;
  heroSubtitle: string;
  pain: string;
  solution: string;
  promise: string;
  proof: string[];
  ctaLabel: string;
}

export const seedBlogPosts: BlogPostRecord[] = [
  {
    id: 'blog-1',
    slug: 'ultimate-guide-performance-marketing',
    title: 'The Ultimate Guide to Performance Marketing in 2024',
    excerpt:
      'Discover how to maximize ROI with data-driven performance marketing strategies tailored for ambitious brands.',
    content: `Performance marketing is no longer just about generating clicks; it is about engineering a predictable revenue engine.

## The Shift From Clicks to Conversions

High-growth brands are no longer obsessed with vanity metrics. They focus on acquisition cost, sales velocity, and lifetime value.

## Building a Data-Driven Foundation

Before scaling budgets, you need robust tracking, clean attribution, and a conversion path that sales can trust.

## Creative as a Profit Lever

Creative strategy is often the fastest way to lower acquisition costs and improve lead quality.`,
    author: 'Pixen Team',
    category: 'Marketing',
    readTime: '5 min read',
    publishedAt: '2026-03-28',
    featured: true,
  },
  {
    id: 'blog-2',
    slug: 'high-converting-digital-pipeline',
    title: 'Why Your Business Needs a High-Converting Digital Pipeline',
    excerpt:
      'Stop leaking leads. Learn how to build an ecosystem that turns raw attention into qualified appointments.',
    content: `A website that only looks good is a liability. Your digital presence should actively drive pipeline.

## The Anatomy of a Pipeline

A pipeline moves a stranger to a paying client through messaging, qualification, proof, and follow-up.

## Removing Friction

Every extra click reduces conversion. The best pipelines reduce uncertainty and make the next action obvious.

## Qualification as a Growth Lever

The right forms and booking flows help you route strong opportunities faster.`,
    author: 'Pixen Team',
    category: 'Growth',
    readTime: '4 min read',
    publishedAt: '2026-03-20',
  },
  {
    id: 'blog-3',
    slug: 'content-that-converts',
    title: 'Content That Converts: Moving Beyond Vanity Metrics',
    excerpt:
      'Likes and shares do not pay the bills. Here is how to create content that supports revenue, proof, and trust.',
    content: `If your content is not generating revenue, it is not doing enough strategic work.

## Educational vs Entertaining

Entertainment earns attention. Education earns intent and trust.

## The Problem-Solution Matrix

Each content asset should map to a buyer problem and reinforce why your offer is the logical next step.

## CTA Engineering

Great content earns the click, but stronger call-to-action design earns the conversation.`,
    author: 'Pixen Team',
    category: 'Content Strategy',
    readTime: '6 min read',
    publishedAt: '2026-03-15',
  },
];

export const seedCaseStudies: CaseStudyRecord[] = [
  {
    id: 'case-1',
    slug: 'b2b-saas-lead-growth',
    clientName: 'TechStart Solutions',
    title: '340% Lead Growth in 90 Days',
    industry: 'B2B SaaS',
    duration: '90 days',
    problem: 'Lead volume was inconsistent and landing pages were not converting qualified demand.',
    strategy:
      'Rebuilt the funnel, tightened intent-based paid campaigns, and paired every paid touchpoint with better conversion proof.',
    summary:
      'A full funnel rebuild turned fragmented demand generation into a more predictable pipeline engine.',
    results: [
      { metric: 'Lead Volume', value: '+340%' },
      { metric: 'Bounce Rate', value: '-57%' },
      { metric: 'Cost Per Lead', value: '-42%' },
    ],
    testimonial:
      "Pixen audited our funnel, fixed the leaks, and helped us scale lead volume far faster than our previous setup ever could.",
    testimonialAuthor: 'Rajesh Sharma',
    testimonialRole: 'CEO, TechStart Solutions',
    services: ['Google Ads', 'Landing Page CRO', 'Retargeting', 'Lead Nurturing'],
    featured: true,
  },
  {
    id: 'case-2',
    slug: 'ecommerce-roas-optimization',
    clientName: 'StyleHub',
    title: '4.2x ROAS from a Leaking Ecommerce Setup',
    industry: 'E-Commerce',
    duration: '60 days',
    problem: 'Ad spend was rising while returns stayed weak because the creative and funnel structure were too static.',
    strategy:
      'Introduced creative testing, stronger retargeting, and funnel-stage based campaign architecture.',
    summary:
      'Better creative strategy plus disciplined funnel architecture turned spend into profitable scale.',
    results: [
      { metric: 'ROAS', value: '4.2x' },
      { metric: 'Revenue', value: '+280%' },
      { metric: 'Cart Recovery', value: '+65%' },
    ],
    testimonial:
      'They understood our brand fast and built a creative system that finally converted at scale.',
    testimonialAuthor: 'Priya Mehta',
    testimonialRole: 'Founder, StyleHub',
    services: ['Meta Ads', 'Creative Strategy', 'Catalog Ads', 'Analytics'],
    featured: true,
  },
  {
    id: 'case-3',
    slug: 'local-business-cpa-reduction',
    clientName: 'Innovate Corp',
    title: 'CPA Reduced by 45% for a Local Service Business',
    industry: 'Local Business',
    duration: '60 days',
    problem: 'Mobile conversion performance was weak and acquisition cost was too high for profitable growth.',
    strategy:
      'Improved mobile UX, rebuilt paid campaign targeting, and added faster lead follow-up via WhatsApp.',
    summary:
      'The biggest gains came from better mobile conversion flow and faster response after lead capture.',
    results: [
      { metric: 'CPA', value: '-45%' },
      { metric: 'Mobile CVR', value: '+380%' },
      { metric: 'Response Time', value: '< 5 min' },
    ],
    testimonial:
      'They did not just run campaigns. They rebuilt the funnel around how real customers actually convert.',
    testimonialAuthor: 'Amit Kumar',
    testimonialRole: 'Director, Innovate Corp',
    services: ['Google Ads', 'Mobile CRO', 'WhatsApp Follow-up'],
  },
];

export const seedTestimonials: TestimonialRecord[] = [
  {
    id: 'testimonial-1',
    name: 'Amit Kumar',
    role: 'Director, Innovate Corp',
    initials: 'AK',
    quote:
      'Pixen rebuilt our funnel, tightened the lead flow, and gave us a much clearer path from traffic to revenue.',
    metric: '-40% CAC',
    color: 'from-purple-600 to-purple-800',
  },
  {
    id: 'testimonial-2',
    name: 'Priya Mehta',
    role: 'Founder, StyleHub',
    initials: 'PM',
    quote:
      'Their creative and funnel strategy immediately improved the quality of the traffic we were paying for.',
    metric: '3x Revenue',
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 'testimonial-3',
    name: 'Rajesh Sharma',
    role: 'CEO, TechStart Solutions',
    initials: 'RS',
    quote:
      'Pixen helped us go from scattered campaigns to a much more intentional growth system.',
    metric: '+340% Leads',
    color: 'from-purple-700 to-blue-700',
  },
];

export const seedIndustryPages: IndustryPageRecord[] = [
  {
    id: 'industry-1',
    slug: 'saas',
    industry: 'SaaS',
    heroTitle: 'Growth systems for SaaS teams that need better pipeline quality',
    heroSubtitle:
      'We help SaaS brands tighten paid acquisition, conversion paths, and sales-ready lead flow.',
    pain: 'Demo requests are inconsistent, paid spend is hard to trust, and your site is not doing enough to qualify demand.',
    solution:
      'We combine funnel diagnostics, intent-based campaigns, and conversion proof to make growth more predictable.',
    promise: 'Stronger lead quality, lower wasted spend, and a clearer path from click to booked demo.',
    proof: ['Lead quality scoring', 'Landing page CRO', 'Paid search and retargeting'],
    ctaLabel: 'Get SaaS Audit',
  },
  {
    id: 'industry-2',
    slug: 'ecommerce',
    industry: 'E-Commerce',
    heroTitle: 'Performance growth for ecommerce brands ready to scale profitably',
    heroSubtitle:
      'We help D2C and ecommerce teams improve ROAS through creative systems, retargeting, and funnel optimization.',
    pain: 'Your account spends money but creative fatigue, weak retargeting, and poor funnel structure cap profit.',
    solution:
      'We build a creative testing engine, repair the funnel, and align campaigns to revenue outcomes.',
    promise: 'More efficient spend, clearer attribution, and stronger repeatable growth.',
    proof: ['Meta and Google optimization', 'Catalog retargeting', 'Creative testing sprints'],
    ctaLabel: 'Get Ecommerce Audit',
  },
  {
    id: 'industry-3',
    slug: 'local-business',
    industry: 'Local Business',
    heroTitle: 'Lead generation systems for local businesses that need calls and bookings',
    heroSubtitle:
      'From clinics to consultants, we tighten local demand capture and follow-up speed.',
    pain: 'You are getting some traffic, but inquiries are expensive, inconsistent, or too slow to convert.',
    solution:
      'We improve local search intent capture, landing page clarity, and immediate response workflows.',
    promise: 'Better cost per lead and more booked conversations from the traffic you already have.',
    proof: ['Mobile-first CRO', 'Local ads', 'WhatsApp follow-up'],
    ctaLabel: 'Get Local Growth Audit',
  },
  {
    id: 'industry-4',
    slug: 'healthcare',
    industry: 'Healthcare',
    heroTitle: 'Patient acquisition systems designed for trust and conversion',
    heroSubtitle:
      'We help healthcare brands turn attention into appointment demand with stronger proof and cleaner funnel journeys.',
    pain: 'Trust is hard to earn online, and generic campaign setups do not match how patients choose providers.',
    solution:
      'We use trust-building proof, localized search strategy, and clearer appointment paths to improve conversion.',
    promise: 'More qualified patient inquiries and stronger trust from the first visit.',
    proof: ['Proof-led landing pages', 'Local discoverability', 'Appointment flow optimization'],
    ctaLabel: 'Get Healthcare Audit',
  },
  {
    id: 'industry-5',
    slug: 'real-estate',
    industry: 'Real Estate',
    heroTitle: 'Real-estate lead systems focused on qualified buyer intent',
    heroSubtitle:
      'We help property teams improve lead quality, reduce wasted spend, and move prospects faster into conversations.',
    pain: 'Property inquiries often look high in volume but weak in intent, making sales teams chase low-fit leads.',
    solution:
      'We use tighter campaign targeting, sharper qualification, and better follow-up flow to improve sales efficiency.',
    promise: 'More serious inquiries and less time lost on low-intent leads.',
    proof: ['Lead qualification', 'Campaign segmentation', 'Follow-up automation'],
    ctaLabel: 'Get Real Estate Audit',
  },
];
