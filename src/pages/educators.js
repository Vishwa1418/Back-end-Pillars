import axios from "axios"
import { useEffect, useState } from "react"

function Educators()
{
    const url = "http://127.0.0.1:5000/educators"
    const [educators,setEd] = useState([])
    useEffect(() => {
        axios.get(url).then(res => {
            setEd(res.data)
            console.log(res.data)
        })
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
                                {/* <span>{ed.subject}</span> */}
                                <span>{educator.email}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Educators