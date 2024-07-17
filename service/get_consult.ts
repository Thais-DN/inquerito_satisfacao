// Outro arquivo onde você está usando o Supabase
import { supabase } from "@/service/dbconnection";

export async function getEmail(){
    let response = await supabase
      .from('tabela_inquerito')
      .select('pergunta_02')

    return response
}