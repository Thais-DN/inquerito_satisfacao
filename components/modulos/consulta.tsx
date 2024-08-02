
interface Props {
    handleBeforeStep: () => void;
    handleNextStep: () => void;
}


export default function Consulta({handleBeforeStep, handleNextStep}:Props){
    return (
        <div>
            

            <div className="flex mt-4">
                <button onClick={handleBeforeStep} className="mr-2 p-2 bg-gray-200 rounded">Previous</button>
                <button onClick={handleNextStep} className="ml-2 p-2 bg-gray-200 rounded">Next</button>
            </div>
        </div>
    )
}