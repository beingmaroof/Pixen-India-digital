import { DarkPageWrapper } from '@/components/DarkUI';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DarkPageWrapper>{children}</DarkPageWrapper>;
}
