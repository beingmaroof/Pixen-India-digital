# 🔧 Database Migration Guide - Profile Enhancement

## ⚠️ Error Explanation

**Error:** "Could not find the 'company' column of 'users' in the schema cache"

**Cause:** The frontend has new profile fields, but the database table doesn't have the corresponding columns yet.

---

## ✅ Solution: Run Database Migration

### **Step 1: Open Supabase Dashboard**

1. Go to https://supabase.com/dashboard
2. Select your Pixen India project
3. Navigate to **SQL Editor** (left sidebar)

---

### **Step 2: Run Migration Script**

#### **Option A: Copy from File**
1. Open file: `supabase-profile-columns-migration.sql`
2. Copy entire contents
3. Paste into SQL Editor
4. Click **Run** (or Ctrl+Enter)

#### **Option B: Copy from Below**

```sql
-- Add new columns for enhanced profile information
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS dob DATE,
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS job_title TEXT,
ADD COLUMN IF NOT EXISTS location TEXT;

-- Add comments to document the new columns
COMMENT ON COLUMN public.users.dob IS 'Date of birth';
COMMENT ON COLUMN public.users.gender IS 'Gender identity';
COMMENT ON COLUMN public.users.phone IS 'Phone number with country code';
COMMENT ON COLUMN public.users.company IS 'Company or organization name';
COMMENT ON COLUMN public.users.job_title IS 'Job title or position';
COMMENT ON COLUMN public.users.location IS 'City and country';
```

---

### **Step 3: Verify Migration**

After running the script, you should see:

**Success Message:**
```
✅ Success. No rows returned
```

**Or if columns already exist:**
```
✅ Success. 6 rows returned (from verification query)
```

---

### **Step 4: Test Profile Page**

1. Go back to your app
2. Refresh browser (Ctrl+Shift+R)
3. Navigate to `/profile`
4. Click "Edit Profile"
5. Fill in all fields
6. Click "Save Changes"
7. ✅ Should save successfully!

---

## 📊 What the Migration Does

### **Adds 6 New Columns:**

| Column | Type | Description |
|--------|------|-------------|
| `dob` | DATE | Date of birth |
| `gender` | TEXT | Gender selection |
| `phone` | TEXT | Phone number |
| `company` | TEXT | Company name |
| `job_title` | TEXT | Job title |
| `location` | TEXT | City/Country |

### **Features:**
- ✅ Uses `IF NOT EXISTS` (safe to run multiple times)
- ✅ Adds helpful comments for documentation
- ✅ Includes verification query
- ✅ Non-destructive (won't delete existing data)

---

## 🐛 Troubleshooting

### **Error: "relation 'users' does not exist"**

**Solution:** Your table might be named differently. Check what tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

If your table is named something else (e.g., `profiles`, `user_data`), update the migration:

```sql
ALTER TABLE public.profiles -- Change 'users' to your actual table name
ADD COLUMN IF NOT EXISTS dob DATE,
-- ... rest of columns
```

---

### **Error: "permission denied"**

**Solution:** Make sure you're using the service role key in your `.env.local`:

```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Not the anon/public key!

---

### **Columns Already Exist**

If you get "column already exists" errors, that's fine! The migration uses `IF NOT EXISTS` so it won't break anything. Just verify the columns are there:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users'
  AND column_name IN ('dob', 'gender', 'phone', 'company', 'job_title', 'location');
```

---

## ✅ Success Indicators

### **In Supabase Table Editor:**

1. Go to **Table Editor** → **users** table
2. You should see these columns:
   - ✅ dob
   - ✅ gender
   - ✅ phone
   - ✅ company
   - ✅ job_title
   - ✅ location

### **In Your App:**

After migration:
1. ✅ Can save profile without errors
2. ✅ All fields persist after reload
3. ✅ No "column not found" errors
4. ✅ Success message appears
5. ✅ Page reloads with updated data

---

## 🎯 Quick Checklist

Before running migration:
- [ ] Backup important data (always good practice)
- [ ] Have admin access to Supabase project
- [ ] Service role key available

After running migration:
- [ ] Verify all 6 columns exist
- [ ] Test profile save functionality
- [ ] Confirm no console errors
- [ ] Check data persists correctly

---

## 📝 Alternative: Manual Column Addition

If you prefer to add columns manually via UI:

1. Go to **Table Editor**
2. Select **users** table
3. Click **"Insert column"** (6 times)
4. Create each column:

| Name | Type | Default | Nullable |
|------|------|---------|----------|
| dob | date | null | ✓ |
| gender | text | null | ✓ |
| phone | text | null | ✓ |
| company | text | null | ✓ |
| job_title | text | null | ✓ |
| location | text | null | ✓ |

---

## 🚀 Next Steps

After migration is complete:

1. **Test Profile Saving**
   ```
   http://localhost:3000/profile
   ```
   
2. **Fill in All Fields**
   - Display Name
   - Date of Birth
   - Gender
   - Phone Number
   - Company Name
   - Job Title (dropdown)
   - Location

3. **Save & Verify**
   - Click "Save Changes"
   - Should complete successfully
   - Page reloads
   - Data persists

---

## 📞 Need Help?

### **Still Getting Errors?**

1. **Check Console Logs**
   - Open browser DevTools (F12)
   - Look for specific error message
   - Which column is missing?

2. **Verify Table Structure**
   ```sql
   \d users
   ```
   (Run in Supabase SQL Editor to see table schema)

3. **Check RLS Policies**
   Make sure users can update their own profiles:
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename = 'users' 
   AND cmd = 'UPDATE';
   ```

---

**Status:** ⏳ Pending Migration  
**Action Required:** Run SQL script in Supabase  
**Time Needed:** 2 minutes  

Once migration is complete, profile saving will work perfectly! 🎉
