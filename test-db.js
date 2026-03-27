const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testDB() {
  const { data, error } = await supabase.from('users').select('*').limit(1);
  if (error) {
    console.error("DB Error:", error.message);
  } else {
    console.log("DB Success, Rows:", data.length);
  }
}

testDB();
