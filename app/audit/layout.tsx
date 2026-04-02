import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Growth Audit',
  description: 'Request your free performance growth audit from Pixen India. We analyze your ad accounts and marketing funnels to scale your revenue.',
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
