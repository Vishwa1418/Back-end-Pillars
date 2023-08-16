import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { addQuiz, evaluateQuiz, getQuiz, getUserdata } from "./API"

function Quiz()
{
    const params = useParams()
    const [data,setData] = useState('')
    const [loader,setLoader] = useState(false)
    const [questions,setQue] = useState([])
    const [result,setRes] = useState('')
    const question = useRef()
    const options = useRef()
    const answer = useRef()
    
    useEffect(() =>{
        fetchQuiz()
    },[params])

    const fetchQuiz = () => {
        setLoader(true)
        getQuiz(params.id).then(data => {
            // console.log(res.data)
            setQue(data)
            setLoader(false)
            getUserdata().then(res => {
                setData(res.role)
                console.log(res)
            })
        }).catch(error => alert(error))
    }
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

    const addQuestion = (event) => {
        event.preventDefault()
        setQue([])
        setLoader(true)
        const input = {
            quiz_id:params.id,
            question_text:question.current.value,
            question_options:options.current.value.split(","),
            correct_answer:answer.current.value
        }
        // console.log(input)
        addQuiz(params.id,input).then(data => fetchQuiz())
        .catch(err => console.error(err))
    }

    return (
        <>
            <div className="quizpage">
            {data !== '' && data !== 'Student' && <form className="admin-form" onSubmit={addQuestion}>
                        <input type="text" ref={question} placeholder="Question" required/>
                        <input type="text" ref={options} placeholder="options" required/>
                        <input type="text" ref={answer} placeholder="answer" required/>
                        <input type="submit" value="+"/>
                    </form>}
                {loader && <div className="loader"/>}
                {questions.length > 0 && <h1 className="heading" id="heading">{questions[0].quiz_title}</h1>}
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