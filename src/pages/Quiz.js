import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getQuiz } from "./API"

function Quiz()
{
    const params = useParams()
    const [questions,setQue] = useState([])
    let answers = []
    const [result,setRes] = useState(0)
    useEffect(() =>{
        getQuiz(params.id).then(data => {
            // console.log(res.data)
            setQue(data)
        }).catch(error => alert(error))
    },[params])

    const submit = () =>{
        setRes(prev => prev =questions.length)

        answers.length !== 0 && questions.map((question,index) => {
            return ((!answers[index] === question.correct_answer) &&
            setRes(prev => --prev))
        })
        alert(`You have scored ${result}/${questions.length}`)
    }

    return (
        <>
            <div className="quizpage">
                {questions.length <= 0 && <div className="loader"/>}
                <h1 className="heading">{questions.length > 0 && questions[0].quiz_title}</h1>
                {questions.length > 0 && questions.map((question,index)=>{
                    return(
                        <div className="ques" key={index}>
                            <span>{index+1}. {question.question_text}</span>
                            <div className="options">
                                {question.question_options.map((option,opt_index) => {
                                    return(
                                        <div className="option" key={opt_index}>
                                            <input type="radio" id={option} value={option} name={question.question_id} onChange={e => {
                                                answers[index] = e.target.value
                                                // console.log(answers)
                                            }}/>
                                            <label for={option}>{option}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                <input type="submit" className="Loginbutton" onClick={submit}/>
            </div>
        </>
    )
}

export default Quiz