import { useNavigate } from "react-router"
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
        <div className="home">
            {data.image && <img src={data.image} className={'image'} alt="avatar"/>}
            <h1>Welcome! {data.username}</h1>
            <input type="button" className={'Loginbutton'} value={'Log out'} onClick={logout}/>
        </div>
    )
}

export default Home