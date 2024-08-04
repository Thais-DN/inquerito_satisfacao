import { DataProps } from "@/service/submitForm"

function convertData(responses:Array<number | null>, comments:string, userEmail:string | null) {

    var data: DataProps = {
        email: userEmail,
        pergunta_01: responses[0],
        pergunta_02: responses[1],
        pergunta_03: responses[2],
        pergunta_04: responses[3],
        pergunta_05: responses[4],
        pergunta_06: responses[5],
        observacao_06: comments,
        pergunta_07: responses[6]
    }

    return data
}

export default convertData