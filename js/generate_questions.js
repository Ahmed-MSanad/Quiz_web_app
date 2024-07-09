
export class GenerateQuestions{
    constructor(){}

    async getQuiz(amount,categoryNumber,difficulty){
        try{
            const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${categoryNumber}&difficulty=${difficulty}&type=multiple`);
            const { results } = await response.json();
            // console.log(results);
            return results;
        }catch(error){
            console.log(error);
        }
    }
}