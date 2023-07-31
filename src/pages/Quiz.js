import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

function Quiz()
{
    const params = useParams()
    const url = `${process.env.REACT_APP_HOST}/quiz/${params.id}`
    const [questions,setQue] = useState([])
    let answers = []
    const [result,setRes] = useState(0)
    useEffect(() =>{
        axios.get(url).then(res => {
            // console.log(res.data)
            setQue(res.data)
            console.log(res.data)
        }).catch(error => alert(error))
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
                <h1 className="heading">{questions.length > 0 && questions[0].quiz_title}</h1>
                {questions.map((question,index)=>{
                    return(
                        <div className="ques" key={index}>
                            <span>{question.question_id}. {question.question_text}</span>
                            <div className="options">
                                {question.question_options.map((option,index) => {
                                    return(
                                        <div className="option" key={index}>
                                            <input type="radio" id={option} value={option} name={question.question_id} onChange={e => {
                                                answers[question.question_id - 1] = e.target.value
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
                <input type="submit" className="Loginbutton" onClick={submit}/>
            </div>
        </>
    )
}

export default Quiz