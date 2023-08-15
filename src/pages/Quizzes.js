import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { addQuizzes, getQuizzes } from "./API"

function Quizzes()
{
    const [questions,setQue] = useState([])
    const [loader,setLoader] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()
    const {role} = location.state
    const id = useRef()
    const title = useRef()
    const description = useRef()
    useEffect(() =>{
        getQuizzes().then(data => {
            // console.log(res.data)
            setQue(data)
            setLoader(false)
        }).catch(error => alert(error))
    },[])

    const submit = (event) => {
        event.preventDefault()
        const input = {
            course_id:id.current.value,
            quiz_title:title.current.value,
            quiz_description:description.current.value
        }
        console.log(input)
        addQuizzes(input).then(data => console.log(data))
        .catch(err => console.error(err))
    }
    return (
        <>
            <div className="quizpage">
            {role === 'admin' && <form className="admin-form" onSubmit={submit}>
                        <input type="text" ref={id} placeholder="course id" required/>
                        <input type="text" ref={title} placeholder="quiz title" required/>
                        <input type="text" ref={description} placeholder="quiz description" required/>
                        <input type="submit" value="+"/>
                    </form>}
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