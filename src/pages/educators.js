import axios from "axios"
import { useEffect, useState } from "react"

function Educators()
{
    const url = `${process.env.REACT_APP_HOST}/educators`
    const [educators,setEd] = useState([])
    useEffect(() => {
        axios.get(url).then(res => {
            setEd(res.data)
            console.log(res.data)
        }).catch(error => alert(error))
    },[url])
    return (
        <>
            <div className="educators">
                {educators.length > 0 && educators.map((educator,index) => {
                    return(
                        <div className={"profilecard"} key={index}>
                        <div className={"logo"}>
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
        </>
    )
}

export default Educators