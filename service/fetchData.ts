// fetchData.ts

import { supabase } from "./dbconnection";

export const fetchSurveyData = async () => {
  const { data, error } = await supabase
    .from('tabela_inquerito')
    .select('*');

  if (error) {
    console.error('Erro ao buscar dados:', error);
    return [];
  }
  return data;
};
