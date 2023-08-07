import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { evaluateQuiz, getQuiz } from "./API"

function Quiz()
{
    const params = useParams()
    const [questions,setQue] = useState([])
    const [result,setRes] = useState('')
    
    useEffect(() =>{
        getQuiz(params.id).then(data => {
            // console.log(res.data)
            setQue(data)
        }).catch(error => alert(error))
    },[params])

    let answers = questions.length > 0 ? new Array(questions.length).fill(null) : null

    const submit = () =>{
        evaluateQuiz(answers,params.id).then(data =>{
            setRes(data)
            // setAns(new Array(data.length).fill(null))
            let heading = document.getElementById('heading')
            heading.scrollIntoView()
        })
        // alert(`You have scored ${result}/${questions.length}`)
    }

    return (
        <>
            <div className="quizpage">
                {questions.length <= 0 && <div className="loader"/>}
                <h1 className="heading" id="heading">{questions.length > 0 && questions[0].quiz_title}</h1>
                {result !== '' && result >= 0 && <h2 className="result">You have scored {result}/{questions.length}</h2>}
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
                                                console.log(answers)
                                            }}/>
                                            <label for={option}>{option}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                {questions.length > 0 && <input type="submit" className="Loginbutton" onClick={submit}/>}
            </div>
        </>
    )
}

export default Quiz