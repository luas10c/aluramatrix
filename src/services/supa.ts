import { createClient } from '@supabase/supabase-js';

const supa = createClient("https://rcirkncpiwcgmzdirbjk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM1MDY4MSwiZXhwIjoxOTU4OTI2NjgxfQ.Z90TYUme8oKB291TeYHmgokfPYqsX6CNUBfjiGTIzGc");
export default supa;