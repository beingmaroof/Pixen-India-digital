import 'server-only';

import {
  BlogPostRecord,
  CaseStudyRecord,
  IndustryPageRecord,
  TestimonialRecord,
  seedBlogPosts,
  seedCaseStudies,
  seedIndustryPages,
  seedTestimonials,
} from '@/lib/content-seed';
import { supabaseAdmin } from '@/lib/supabase-admin';

async function safeSelect<T>(table: string, fallback: T[]): Promise<T[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from(table)
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return fallback;
    }

    return data as T[];
  } catch {
    return fallback;
  }
}

export async function getManagedBlogPosts() {
  return safeSelect<BlogPostRecord>('blog_posts', seedBlogPosts);
}

export async function getManagedCaseStudies() {
  return safeSelect<CaseStudyRecord>('case_studies', seedCaseStudies);
}

export async function getManagedTestimonials() {
  return safeSelect<TestimonialRecord>('testimonials', seedTestimonials);
}

export async function getManagedIndustryPages() {
  return safeSelect<IndustryPageRecord>('industry_pages', seedIndustryPages);
}
