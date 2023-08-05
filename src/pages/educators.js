import { useEffect, useState } from "react"
import { getEducators } from "./API"

function Educators()
{
    const [educators,setEd] = useState([])
    useEffect(() => {
        getEducators().then(data => {
            setEd(data)
            // console.log(data)
        }).catch(error => alert(error))
    },[educators])
    return (
        <>
            <div className="educators">
                {educators.length <= 0 && <div className="loader"/>}
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
        </>
    )
}

export default Educators