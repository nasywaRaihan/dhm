const SUPABASE_URL = 'https://mdbsnynhjzxezbyvhxjq.supabase.co';

const SUPABASE_ANON_KEY = 'sb_publishable_jj0IBzQ6KKSf4gX6RAmvxA_2firJB1G';

window.db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
