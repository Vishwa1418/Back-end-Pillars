import { useEffect, useRef, useState } from 'react'
import {NavLink, Outlet, useNavigate} from 'react-router-dom'
import { getUserdata } from './API'
function Layout(){

    const [data,setData] = useState()
    const navigate = useNavigate()
    const nav = useRef()
    
    useEffect(()=>{
        getUserdata().then(res => {
            setData(res)
        })
    },[])

    const logout = () => {
        sessionStorage.removeItem('userdata')
        navigate('/login')
    }

    const navSlide = ()=>{
        nav.current.classList.toggle('slide')
    }

    return (
        <>
            <div className='layout'>
            <nav>
                <div class="logo">
                    <h4>KADIT</h4>
                </div>
                <div class="nav-links" ref={nav}>
                    <li onClick={navSlide}>
                        <NavLink to='/main/home'>Home</NavLink>
                    </li>

                    <li onClick={navSlide}>
                        <NavLink to='/main/educators'>Educators</NavLink>
                    </li>
                    
                    <li onClick={navSlide}>
                        <NavLink to='/main/quiz'>Practice</NavLink>
                    </li>

                    <li onClick={navSlide}>
                        <NavLink to='/main/successstories'>Success Stories</NavLink>
                    </li>

                    <li onClick={navSlide}>
                        <NavLink to='/main/contactus'>Contact Us</NavLink>
                    </li>
                    {data && <li className='profilepos'>
                        <div className='profile'>
                            <img src={data.image} className='image' alt='avatar'></img>
                            <div className={"details"}>
                                <span className={"username"}>{data.username}</span>
                            </div>
                        </div>
                        <li className={'logout'} onClick={logout}>Logout</li>
                    </li>}
                </div>
                <div class="burger" onClick={navSlide}>
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
            </nav>
            <Outlet/>
            </div>
        </>
    )
}

export default Layout