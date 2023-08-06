import { useRef } from 'react'
import {NavLink, Outlet, useNavigate} from 'react-router-dom'
function Layout(){

    const nav = useRef()
    let data = sessionStorage.getItem('API_Key')
    data = JSON.parse(data)
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.removeItem('userdata')
        navigate('/login')
    }

    const navSlide = ()=>{
        nav.current.classList.toggle('slide')
        console.log('click')
    }

    return (
        <>
            <div className='layout'>
            <nav>
                <div class="logo">
                    <h4>KADIT</h4>
                </div>
                <div class="nav-links" ref={nav}>
                    <li>
                        <NavLink to='/main/home'>Home</NavLink>
                    </li>

                    <li>
                        <NavLink to='/main/educators'>Educators</NavLink>
                    </li>
                    
                    <li>
                        <NavLink to='/main/quiz'>Practice</NavLink>
                    </li>

                    <li>
                        <NavLink to='/main/successstories'>Success Stories</NavLink>
                    </li>

                    <li>
                        <NavLink to='/main/contactus'>Contact Us</NavLink>
                    </li>

                    <li className='profilepos'>
                        <div className='profile'>
                            <img src={data.image} className='image' alt='avatar'></img>
                            <div className={"details"}>
                                <span className={"name"}>{data.username}</span>
                            </div>
                        </div>
                        <li className={'logout'} onClick={logout}>Logout</li>
                    </li>
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