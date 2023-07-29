import { Outlet, useNavigate } from "react-router"
function Home()
{
    let data = sessionStorage.getItem('userdata')
    data = JSON.parse(data)
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.removeItem('userdata')
        navigate('/login')
    }
    
    return (
       <>
            <div className="home">
                <img src={data.image} className={'image'} alt="avatar"/>
                <h1 className="heading">Welcome back! {data.username}</h1>
            </div>
       </>
    )
}

export default Home