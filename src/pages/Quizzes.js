import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

function Quizzes()
{
    const url = `${process.env.REACT_APP_HOST}/quiz`
    const [questions,setQue] = useState([])
    const navigate = useNavigate()

    useEffect(() =>{
        axios.get(url).then(res => {
            // console.log(res.data)
            setQue(res.data)
        }).catch(error => alert(error))
    },[url])

    return (
        <>
            <div className="quizpage">
                {questions.length <= 0 && <div className="loader"/>}
                {questions.length > 0 && questions.map((question,index)=>{
                    return(
                        <div className="ques quiz" onClick={() => {navigate(`/main/quiz/${question.quiz_id}`)}}>
                            <span className="title">{index+1}. {question.quiz_title}</span>
                            <p>{question.quiz_description}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Quizzes