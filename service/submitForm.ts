import { supabase } from "./dbconnection";

export type DataProps = {
    email: string | null;
    pergunta_01: number | null;
    pergunta_02: number | null;
    pergunta_03: number | null;
    pergunta_04: number | null;
    pergunta_05: number | null;
    pergunta_06: number | null;
    observacao_06: string;
    pergunta_07: number | null;
}

async function submitForm(data: DataProps) {
    const { data:response, error } = await supabase
        .from('tabela_inquerito')
        .insert([
            data,
        ])
        .select()
}

export default submitForm