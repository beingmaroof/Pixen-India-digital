

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
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    return { error };
  } catch (error: any) {
    return { error: new Error(error.message || 'Failed to send reset email') };
  }
};

export const signInWithGoogle = async (): Promise<{ user: User | null; session: Session | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) throw error;

    return { 
      user: null, 
      session: null, 
      error: null 
    };
  } catch (error: any) {
    return { 
      user: null, 
      session: null, 
      error: new Error(error.message || 'Failed to sign in with Google') 
    };
  }
};

export const signInWithFacebook = async (): Promise<{ user: User | null; session: Session | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) throw error;

    return { 
      user: null, 
      session: null, 
      error: null 
    };
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


