

import { supabase } from './supabase';
import type { User, Session } from '@supabase/supabase-js';

export const signUp = async (
  email: string,
  password: string,
  name: string
): Promise<{ user: User | null; session: Session | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      const { error: dbError } = await supabase
        .from('users')
        .insert({
          uid: data.user.id,
          email: data.user.email,
          display_name: name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (dbError) {
        console.error('Error creating user profile:', dbError);
        
      }
    }

    return { 
      user: data.user, 
      session: data.session, 
      error: null 
    };
  } catch (error: any) {
    return { 
      user: null, 
      session: null, 
      error: new Error(error.message || 'Failed to create account') 
    };
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<{ user: User | null; session: Session | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    return { 
      user: data.user, 
      session: data.session, 
      error: null 
    };
  } catch (error: any) {
    return { 
      user: null, 
      session: null, 
      error: new Error(error.message || 'Failed to sign in') 
    };
  }
};

export const logOut = async (): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error: any) {
    return { error: new Error(error.message || 'Failed to sign out') };
  }
};

export const resetPassword = async (email: string): Promise<{ error: Error | null }> => {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/auth/callback?next=/reset-password`
    });
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: new Error(error.message || 'Failed to send reset email') };
  }
};

export const signInWithGoogle = async (redirectUrl: string = '/dashboard'): Promise<{ user: User | null; session: Session | null; error: Error | null }> => {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(redirectUrl)}`
      }
    });

    if (error) throw error;

    // OAuth redirects the browser away — return null user/session (not an error)
    return { user: null, session: null, error: null };
  } catch (error: any) {
    return { 
      user: null, 
      session: null, 
      error: new Error(error.message || 'Failed to sign in with Google') 
    };
  }
};

export const signInWithFacebook = async (redirectUrl: string = '/dashboard'): Promise<{ user: User | null; session: Session | null; error: Error | null }> => {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(redirectUrl)}`
      }
    });

    if (error) throw error;

    // OAuth redirects the browser away — return null user/session (not an error)
    return { user: null, session: null, error: null };
  } catch (error: any) {
    return { 
      user: null, 
      session: null, 
      error: new Error(error.message || 'Failed to sign in with Facebook') 
    };
  }
};

export const getCurrentSession = async (): Promise<Session | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const getUserData = async (uid: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('uid', uid)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const updateUserData = async (uid: string, data: any) => {
  try {
    // First check if the user exists
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('uid')
      .eq('uid', uid)
      .single();

    if (selectError && selectError.code === 'PGRST116') {
      // User doesn't exist by UID, we need to check if the email exists
      const { data: { user } } = await supabase.auth.getUser();
      const userEmail = user?.email || '';
      
      if (userEmail) {
        // Look for existing row with this email to avoid users_email_key unique constraint
        const { data: emailUser } = await supabase
          .from('users')
          .select('uid')
          .eq('email', userEmail)
          .single();
          
        if (emailUser) {
          // Email exists. We update that row's UID to the new one and apply the new data.
          const { error: updateExistingError } = await supabase
            .from('users')
            .update({
              uid: uid,
              ...data,
              updated_at: new Date().toISOString()
            })
            .eq('email', userEmail);
            
          if (updateExistingError) throw updateExistingError;
          return { error: null };
        }
      }
      
      // Email doesn't exist, we can safely insert
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          uid: uid,
          email: userEmail,
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
      if (insertError) throw insertError;
      return { error: null };
    } else if (selectError) {
      throw selectError;
    }

    // User exists by UID, perform update
    const { error } = await supabase
      .from('users')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('uid', uid);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: new Error(error.message || 'Failed to update user data') };
  }
};

// ==========================================
// BILLING HISTORY LOGIC
// ==========================================

export const savePayment = async (userId: string, planName: string, amount: string, status: string = 'completed') => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert([
        {
          user_id: userId,
          plan_name: planName,
          amount,
          status
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error saving payment:', error);
    return { data: null, error };
  }
};

export const getUserPayments = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    console.error('Error fetching payments:', error);
    return { data: null, error };
  }
};
