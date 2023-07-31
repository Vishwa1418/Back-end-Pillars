import axios from "axios"
import { useEffect, useState } from "react"

function Quiz()
{
    const url = "http://127.0.0.1:5000/quiz"
    const [questions,setQue] = useState([])
    let answers = []
    const [result,setRes] = useState(0)
    useEffect(() =>{
        axios.get(url).then(res => {
            // console.log(res.data)
            setQue(res.data)
        })
    },[url])

    const submit = () =>{
        setRes(prev => prev =questions.length)

        answers.length !== 0 && questions.map((question,index) => {
            return(
                answers[index] !== questions.ans ? setRes(prev => --prev) : null
            )
        })
        console.log(result)
    }

    return (
        <>
            <div className="quizpage">
                <span>You have scored {result}/{questions.length} </span>
                {questions.map((question,index)=>{
                    return(
                        <div className="ques" key={index}>
                            <span>{question.id}. {question.question}</span>
                            <div className="options">
                                {question.options.map((option,index) => {
                                    return(
                                        <div className="option" key={index}>
                                            <input type="radio" id={option} value={option} name={question.id} onChange={e => {
                                                answers[question.id - 1] = e.target.value
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
                <input type="submit" className="submit eval" onClick={submit}/>
            </div>
        </>
    )
}

export default Quiz