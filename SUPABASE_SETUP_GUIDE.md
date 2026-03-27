# 🗄️ Supabase Database Setup Guide

## Quick Fix for "Database error: Could not find the table 'public.leads'"

This error means the `leads` table hasn't been created in your Supabase database yet. Follow these steps to fix it.

---

## ✅ OPTION 1: Create Table via Supabase Dashboard (Easiest)

### Step 1: Go to Supabase Dashboard
1. Login to https://supabase.com
2. Select your project
3. Go to **SQL Editor** (in left sidebar)

### Step 2: Run Migration Script
1. Click **"New Query"** button
2. Copy entire content from `supabase-migration-leads-table.sql`
3. Paste into SQL Editor
4. Click **"Run"** or press Ctrl+Enter

### Step 3: Verify Table Created
1. Go to **Table Editor** (in left sidebar)
2. You should see `leads` table listed
3. Click on it to view columns

### Step 4: Test Contact Form
1. Go back to http://localhost:3001/contact
2. Submit the form again
3. Should work without errors now! ✅

---

## ✅ OPTION 2: Create Table via Supabase CLI (Advanced)

If you have Supabase CLI installed:

```bash
# Apply migration
supabase db push

# Or reset and apply
supabase db reset
supabase db push
```

---

## ✅ OPTION 3: Continue Without Database (Fallback Mode)

The contact form is designed to work **even without Supabase configured**. It will:
- ✅ Accept form submissions
- ✅ Send emails (if configured)
- ✅ Show success message
- ⚠️ NOT save to database

**Current behavior:** Form works in fallback mode when Supabase is not configured or table doesn't exist.

---

## 📋 TABLE STRUCTURE

The `leads` table will have these columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `name` | TEXT | Full name from form |
| `email` | TEXT | Email address |
| `phone` | TEXT | Phone number (optional) |
| `businessType` | TEXT | Selected business type |
| `budget` | TEXT | Selected budget range |
| `message` | TEXT | User's message |
| `status` | TEXT | Lead status (new, contacted, qualified, etc.) |
| `createdAt` | TIMESTAMP | When lead was submitted |
| `updatedAt` | TIMESTAMP | Last update time |
| `source` | TEXT | Lead source (default: 'website') |
| `notes` | TEXT | Internal notes |
| `assignedTo` | TEXT | Team member assigned |
| `followedUp` | BOOLEAN | Whether follow-up occurred |

---

## 🔒 SECURITY (Row Level Security)

The migration script includes RLS policies:

1. **Public can INSERT** - Anyone can submit contact form
2. **Authenticated users can SELECT** - Only logged-in admins can view leads
3. **Authenticated users can UPDATE/DELETE** - Only admins can manage leads

This ensures:
- ✅ Public contact form works without login
- ✅ Leads are protected from unauthorized access
- ✅ Only your team can view/manage submissions

---

## 🧪 TESTING AFTER SETUP

### Test 1: Submit Form
1. Navigate to http://localhost:3001/contact
2. Fill out all fields
3. Click "Send Message"
4. Should see green success screen ✅

### Test 2: Check Database
1. Go to Supabase → Table Editor
2. Click on `leads` table
3. You should see your submission! ✅

### Test 3: Check Console Logs
In browser console and terminal, you should see:
```
Lead saved with ID: [uuid-here]
📧 Confirmation email would be sent to: [email]
📧 Admin notification would be sent to: hello@pixenindia.com
```

---

## 🎯 QUICK SQL (Copy-Paste Ready)

Here's the essential SQL to create the table (minimal version):

```sql
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  "businessType" TEXT NOT NULL,
  budget TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Allow anyone to insert (for contact form)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public to submit leads" ON public.leads
  FOR INSERT WITH CHECK (true);
```

---

## ❓ TROUBLESHOOTING

### Error: "relation already exists"
**Solution:** Table already exists. Drop it first:
```sql
DROP TABLE IF EXISTS public.leads CASCADE;
-- Then run migration script again
```

### Error: "permission denied"
**Solution:** Make sure you're using the service role key in `.env.local`:
```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Form Still Shows Error
**Check:**
1. Supabase URL is correct in `.env.local`
2. Service role key has proper permissions
3. Table name is exactly `leads` (case-sensitive)
4. Browser cache cleared (Ctrl+Shift+R)

### Can't Find Supabase Project
**Steps:**
1. Go to https://supabase.com/dashboard
2. Sign in with your GitHub account
3. Look for your Pixen India project
4. If no project exists, create a new one

---

## 🔗 USEFUL LINKS

- **Supabase Dashboard:** https://supabase.com/dashboard
- **SQL Editor:** https://supabase.com/dashboard/project/[your-project]/sql
- **Table Editor:** https://supabase.com/dashboard/project/[your-project]/editor
- **API Settings:** https://supabase.com/dashboard/project/[your-project]/settings/api

---

## 📧 WHAT HAPPENS AFTER SUBMISSION

When someone submits the contact form:

1. ✅ Data saved to `leads` table in Supabase
2. ✅ Confirmation email sent to user (if configured)
3. ✅ Notification email sent to admin (if configured)
4. ✅ Success message shown to user
5. ✅ Form fields cleared
6. ✅ Lead ready for follow-up

---

## 🎨 ADMIN DASHBOARD (Future Enhancement)

Once you have leads in database, you can:

1. View all submissions in Supabase Table Editor
2. Filter by status, date, business type
3. Update lead status (new → contacted → qualified)
4. Add internal notes
5. Assign to team members
6. Export to CSV/Excel

**Optional:** Build custom admin dashboard at `/dashboard` to manage leads.

---

## ✅ VERIFICATION CHECKLIST

After running migration:

- [ ] `leads` table exists in Supabase
- [ ] Table has all required columns
- [ ] RLS policies are enabled
- [ ] Can insert test row manually in Supabase
- [ ] Contact form submits successfully
- [ ] New row appears in table after submission
- [ ] No console errors
- [ ] Success message appears

---

## 🚀 NEXT STEPS

1. **Run migration script** (copy-paste from `supabase-migration-leads-table.sql`)
2. **Test contact form** (submit test lead)
3. **Verify in database** (check Supabase Table Editor)
4. **Configure email notifications** (see FIXES_COMPLETE.md)
5. **Set up admin dashboard** (optional - to view leads)

---

**Status:** Ready to fix!  
**Time Required:** 2-3 minutes  
**Difficulty:** Easy (just copy-paste SQL)

**Need help?** Check the troubleshooting section or contact Supabase support.
