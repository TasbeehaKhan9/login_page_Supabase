
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = "https://ddmarjvauymcqhjrvwdt.supabase.co"
const supabaseKey =  "sb_publishable_bvAoF10cfqHeTm-9LCb3aw_Juf5XCsR"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase