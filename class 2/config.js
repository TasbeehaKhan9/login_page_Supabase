import  {createClient} from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = "https://pnkjnftmlbklzdwacwkk.supabase.co"
const supabaseKey = "sb_publishable_zqO4C6YX5XpRMo9ahcMAHw_iYt5b94s"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase