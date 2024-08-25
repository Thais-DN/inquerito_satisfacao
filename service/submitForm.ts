import { supabase } from "./dbconnection";

export type DataProps = {
    email: string | null;
    pergunta_01: number | null;
    pergunta_02: number | null;
    pergunta_03: number | null;
    pergunta_04: number | null;
    pergunta_05: number | null;
    observacao?: string;
}

async function submitForm(data: DataProps) {
    const { data:response, error } = await supabase
        .from('tabela_inquerito_v2')
        .insert([
            data,
        ])
        .select()
        console.log(response, error, data)
}

export default submitForm