# 🔧 Quick Fix: "Failed to Fetch" Error on Login/Signup

## Problem
You're seeing "Failed to fetch" error when trying to login or signup.

## Root Cause
The application is trying to connect to Supabase with placeholder/invalid credentials.

---

## ✅ SOLUTION: Configure Supabase Credentials

### Step 1: Get Your Supabase Credentials

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Sign in (or create account if you don't have one)
   - Select your project (or create a new one)

2. **Find Your API Keys**
   - Click on **Settings** (gear icon) in left sidebar
   - Click on **API** section
   - You'll see:
     - **Project URL**: `https://xxxxx.supabase.co`
     - **anon/public key**: `eyJhbG...` (long string)
     - **service_role key**: `eyJhbG...` (different long string) ⚠️ Keep this secret!

### Step 2: Update `.env.local` File

1. Open the file: `c:\APP Projects\Pixen India\Pixen website\.env.local`

2. Replace the placeholder values:

```env
# Replace THIS:
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
# With your actual URL, like:
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghij.supabase.co

# Replace THIS:
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
# With your actual anon key, like:
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Replace THIS:
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
# With your actual service role key:
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Save the file**

### Step 3: Restart Development Server

1. Stop the current server (Ctrl+C in terminal)
2. Run: `npm run dev`
3. The server will reload with new environment variables

### Step 4: Test Login/Signup

1. Go to: http://localhost:3000/login
2. Try signing up with a test email
3. Should work now! ✅

---

## 🎯 OPTIONAL: Create New Supabase Project

If you don't have a Supabase project yet:

### Create Project

1. Visit: https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in:
   - **Name**: Pixen India Website
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to you
4. Click **"Create new project"**
5. Wait 2-3 minutes for setup

### Get Credentials

1. Go to **Settings** → **API**
2. Copy the three values (URL, anon key, service role key)
3. Paste into `.env.local` as shown above

### Create Users Table (Optional - for custom user data)

Run this SQL in Supabase SQL Editor:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  uid UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  photo_url TEXT,
  provider TEXT DEFAULT 'email',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own data
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid() = uid);

-- Allow users to update their own data
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = uid);

-- Allow insert during signup
CREATE POLICY "Allow insert during signup" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = uid);
```

---

## 🧪 Testing Checklist

After configuration:

- [ ] Restart development server
- [ ] Navigate to http://localhost:3000/signup
- [ ] Create a test account
- [ ] Check browser console (F12) - should see no errors
- [ ] Should redirect to dashboard after signup ✅
- [ ] Try logging out and back in ✅

---

## ❌ Common Issues & Solutions

### Issue 1: Still getting "failed to fetch"
**Solution:** Make sure you restarted the dev server after updating `.env.local`

### Issue 2: "Invalid API key" error
**Solution:** Double-check you copied the correct keys (no extra spaces)

### Issue 3: Email confirmation required
**Solution:** 
- Go to Supabase Dashboard → Authentication → Settings
- Disable "Enable email confirmations" for testing
- Or check your email for confirmation link

### Issue 4: "User already exists"
**Solution:** Use a different email address for testing

### Issue 5: Can't find .env.local file
**Solution:** It's hidden in some editors. Make sure it's exactly named `.env.local` (not `.env.local.txt`)

---

## 🔒 Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env.local` to Git (it's in .gitignore)
- Share `.env.local.example` instead (safe, has placeholders)
- Service role key = master password, keep it secret!
- Only use service_role_key in server-side code (API routes)

---

## 📚 Additional Resources

- **Supabase Docs:** https://supabase.com/docs
- **Next.js Environment Variables:** https://nextjs.org/docs/basic-features/environment-variables
- **Authentication Guide:** See `AUTHENTICATION_SYSTEM_COMPLETE.md`

---

## ✅ Verification

How to know it's working:

1. **Check Environment Loaded**
   - Open browser console
   - Type: `window.process.env.NEXT_PUBLIC_SUPABASE_URL`
   - Should show your URL (not placeholder)

2. **Check Network Tab**
   - Open DevTools (F12) → Network tab
   - Try logging in
   - Look for requests to `*.supabase.co`
   - Should return 200 OK (not failed)

3. **Check Supabase Dashboard**
   - Go to Authentication → Users
   - You should see newly created users!

---

**Status:** Ready to fix!  
**Time Required:** 5-10 minutes  
**Difficulty:** Easy

Need help? Check the troubleshooting section or Supabase docs.
