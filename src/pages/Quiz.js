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
        }).catch(error => alert(error))
    },[url])

    const submit = () =>{
        setRes(prev => prev =questions.length)

        answers.length !== 0 && questions.map((question,index) => {
            if(!answers[index] === question.correct_answer)
            setRes(prev => --prev)
        })
        alert(`You have scored ${result}/${questions.length}`)
    }

    return (
        <>
            <div className="quizpage">
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