import { useEffect, useState } from "react"
import { getUsersdata } from "./API"

const Users = () => {

    const [users,setUsers] = useState([])
    const [loader,setLoader] = useState(false)
    const f = new Intl.DateTimeFormat(('en-US'),{
        dateStyle:'short',
        timeStyle:'short'
      })

    const fetchUsers = () => {
        setUsers([])
        setLoader(true)
        getUsersdata().then((data) => {
            console.log(data)
            setUsers(data)
            setLoader(false)
        }).catch(err => alert(err))
    }

    useEffect(() => {
        fetchUsers()
    },[])
    return (
        <>
            <div className="users">
            {loader && <div className="loader"/>}
                {users.map((user,index) => {
                    return <div className="user">
                        <img src={user.image} className="image" alt="avatar"/>
                        <div className="details">
                            <span><i className="uil uil-user-circle"/> {user.username}</span>
                            <span><i className="uil uil-envelope"/> {user.email}</span>
                            <div className="details">
                                <span> <i className="uil uil-calender"/>Registration_date: {f.format(new Date(user.registration_date))}</span>
                            </div>
                        </div>
                        <div className="edit">
                            <input type="button" className="updatebtn" value={'Promote'}/>
                            <input type="button"  className="deletebtn" value={'Delete'}/>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default Users