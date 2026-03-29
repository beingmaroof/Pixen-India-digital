import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pixenindia.com';
  const now = new Date();

  const staticRoutes = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/pricing`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/case-studies`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/support`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/privacy-policy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/terms-of-service`, priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  return staticRoutes.map(route => ({
    ...route,
    lastModified: now,
  }));
}
