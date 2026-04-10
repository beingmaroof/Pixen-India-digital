import { NextResponse } from 'next/server';
import {
  getManagedBlogPosts,
  getManagedCaseStudies,
  getManagedIndustryPages,
  getManagedTestimonials,
} from '@/lib/content-service';

export async function GET() {
  try {
    const [blogPosts, caseStudies, testimonials, industryPages] = await Promise.all([
      getManagedBlogPosts(),
      getManagedCaseStudies(),
      getManagedTestimonials(),
      getManagedIndustryPages(),
    ]);

    return NextResponse.json(
      {
        blogPosts,
        caseStudies,
        testimonials,
        industryPages,
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error: any) {
    console.error('Managed content API error:', error);
    return NextResponse.json({ error: 'Unable to load managed content.' }, { status: 500 });
  }
}
