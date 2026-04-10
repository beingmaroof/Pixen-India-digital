import 'server-only';

import { supabaseAdmin } from '@/lib/supabase-admin';

export interface AuthenticatedAdmin {
  id: string;
  email: string;
  displayName: string;
}

export function getBearerToken(request: Request) {
  const header = request.headers.get('authorization') || '';
  if (!header.startsWith('Bearer ')) return null;
  return header.slice('Bearer '.length).trim();
}

export async function getAuthenticatedUser(request: Request) {
  const token = getBearerToken(request);
  if (!token) return null;

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

export async function requireAdmin(request: Request): Promise<AuthenticatedAdmin | null> {
  const user = await getAuthenticatedUser(request);
  if (!user) return null;

  const { data, error } = await supabaseAdmin
    .from('users')
    .select('uid, email, display_name, role')
    .eq('uid', user.id)
    .single();

  if (error || !data || data.role !== 'admin') {
    return null;
  }

  return {
    id: data.uid,
    email: data.email,
    displayName: data.display_name || data.email || 'Admin',
  };
}
