import { useEffect, useRef, useState } from "react"
import { addEducators, getEducators } from "./API"
import { useLocation } from "react-router"

function Educators()
{
    const [educators,setEd] = useState([])
    const [loader,setLoader] = useState(false)
    const location = useLocation()
    const {role} = location.state
    const email = useRef()
    const subjects = useRef()
    const biography = useRef()
    useEffect(() => {
        fetchEducators()
    },[])

    const fetchEducators = () => {
        setLoader(true)
        getEducators().then(data => {
            setEd(data)
            // console.log(data)
            setLoader(false)
        }).catch(error => alert(error))
    }
    const submit = (event) => {
        event.preventDefault()
        setEd([])
        setLoader(true)
        const input = {
            email:email.current.value,
            biography:biography.current.value,
            subjects:subjects.current.value.split(',')
        }
        // console.log(input)
        addEducators(input).then(() => fetchEducators())
        .catch(err => console.error(err))
    }
    return (
        <>
            <div className="educators">
                {role === 'admin' && <form className="admin-form" onSubmit={submit}>
                        <input type="email" ref={email} placeholder="Enter email" required/>
                        <input type="text" ref={biography} placeholder="biography" required/>
                        <input type="text" ref={subjects} placeholder="subjects" required/>
                        <input type="submit" value="+"/>
                    </form>}
                {educators.length > 0 && <h1 className="heading">Our Experts</h1>}
                <div className="educators">
                    {loader && <div className="loader"/>}
                    {educators.length > 0 && educators.map((educator,index) => {
                        return(
                            <div className={"profilecard"} key={index}>
                            <div>
                                <img src={educator.image} className="image" alt="avatar"/>
                            </div>
                                <div className={"details"}>
                                    <span className={"name"}>{educator.username}</span>
                                    <span>{educator.email}</span>
                                    <div className="subjects">
                                        {educator.subjects.map((subject,index) => {
                                            return <span className="subject" key={index}>{subject}</span>
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Educators