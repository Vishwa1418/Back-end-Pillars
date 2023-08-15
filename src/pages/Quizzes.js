import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getQuizzes } from "./API"

function Quizzes()
{
    const [questions,setQue] = useState([])
    const [loader,setLoader] = useState(true)
    const navigate = useNavigate()

    useEffect(() =>{
        getQuizzes().then(data => {
            // console.log(res.data)
            setQue(data)
            setLoader(false)
        }).catch(error => alert(error))
    },[])

    return (
        <>
            <div className="quizpage">
                {questions.length > 0 && <h1 className="heading">Practice quiz</h1>}
                <div className="quizpage">
                    {loader && <div className="loader"/>}
                    {questions.length > 0 && questions.map((question,index)=>{
                        return(
                            <div className="ques quiz" onClick={() => {navigate(`/main/quiz/${question.quiz_id}`)}}>
                                <span className="title">{index+1}. {question.quiz_title}</span>
                                <p>{question.quiz_description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Quizzes