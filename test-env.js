/**
 * Environment Configuration Test Script
 * 
 * Run this with: node test-env.js
 * 
 * This will check if your .env.local file is properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Environment Configuration...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
const envExamplePath = path.join(__dirname, '.env.local.example');

if (!fs.existsSync(envPath)) {
  console.error('❌ ERROR: .env.local file not found!');
  console.error('📝 Copy .env.local.example to .env.local and fill in your values');
  process.exit(1);
}

console.log('✅ .env.local file found\n');

// Read and parse .env.local
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

const envVars = {};
envLines.forEach(line => {
  const match = line.match(/^([^#][^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    envVars[key] = value;
  }
});

// Check required Supabase variables
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

let allValid = true;

console.log('📋 Checking Required Variables:\n');

requiredVars.forEach(varName => {
  const value = envVars[varName];
  
  if (!value) {
    console.error(`❌ ${varName}: NOT SET`);
    allValid = false;
  } else if (value.includes('your-') || value.includes('placeholder')) {
    console.error(`❌ ${varName}: Still has placeholder value!`);
    console.error(`   Current value: ${value}`);
    console.error(`   Please update with your actual credentials from Supabase dashboard`);
    allValid = false;
  } else {
    console.log(`✅ ${varName}: Configured`);
  }
});

console.log('\n');

// Validate Supabase URL format
const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
if (supabaseUrl && !supabaseUrl.includes('your-')) {
  const urlPattern = /^https:\/\/[a-zA-Z0-9-]+\.supabase\.co\/?$/;
  if (!urlPattern.test(supabaseUrl)) {
    console.error(`⚠️  Warning: Supabase URL format looks incorrect`);
    console.error(`   Expected format: https://xxxxx.supabase.co`);
    console.error(`   Your value: ${supabaseUrl}`);
    allValid = false;
  } else {
    console.log('✅ Supabase URL format: Valid');
  }
}

// Validate API key format
const anonKey = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
if (anonKey && !anonKey.includes('your-')) {
  if (anonKey.length < 50) {
    console.error(`⚠️  Warning: Anon key seems too short`);
    console.error(`   Length: ${anonKey.length} characters (expected ~200+)`);
    allValid = false;
  } else {
    console.log('✅ Supabase Anon Key length: OK');
  }
}

console.log('\n');

if (allValid) {
  console.log('🎉 SUCCESS! All environment variables are properly configured!');
  console.log('\n✅ Next steps:');
  console.log('   1. Restart your development server: npm run dev');
  console.log('   2. Test login/signup at: http://localhost:3000/login');
  console.log('   3. Check browser console for any errors');
} else {
  console.error('❌ CONFIGURATION INCOMPLETE');
  console.error('\n📝 To fix:');
  console.error('   1. Open .env.local file');
  console.error('   2. Replace placeholder values with your actual Supabase credentials');
  console.error('   3. Get credentials from: https://supabase.com/dashboard/project/_/settings/api');
  console.error('   4. Save the file');
  console.error('   5. Restart your development server');
  console.error('\n📖 See QUICK_FIX_LOGIN_ERROR.md for detailed instructions\n');
  process.exit(1);
}
