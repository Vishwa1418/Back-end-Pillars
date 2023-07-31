import {NavLink, Outlet, useNavigate} from 'react-router-dom'
function Layout(){
    let data = sessionStorage.getItem('userdata')
    data = JSON.parse(data)
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.removeItem('userdata')
        navigate('/login')
    }
    return (
        <>
            <div className='layout'>
            <nav>
                <div class="logo">
                    <h4>KADIT</h4>
                </div>
                <ul class="nav-links">
                    <li>
                        <NavLink to='/main/home'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/main/educators'>Educators</NavLink>
                    </li>
                    
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn">Courses</a>
                        <div class="dropdown-content">
                        <a href="#">Railway</a>
                        <a href="#">TNPSC</a>
                        <a href="#">UPSE</a>
                        <a href="#">BANK</a>
                        </div>
                    </li>
                    <li>
                        <NavLink to='/main/quiz'>Practice</NavLink>
                    </li>
                    <li>
                        <NavLink to='/main/home'>Success Stories</NavLink>
                    </li>
                    <li>
                        <NavLink to='/main/home'>Reports</NavLink>
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
                </ul>
                <div class="burger">
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