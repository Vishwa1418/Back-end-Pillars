import {NavLink, Outlet} from 'react-router-dom'
function Layout(){
    return (
        <>
           <nav>
                <div class="logo">
                    <h4>KADIT</h4>
                </div>
                <ul class="nav-links">
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
                        <NavLink to='/main/educators'>Practice</NavLink>
                    </li>
                    <li>
                        <NavLink to='/main/educators'>Success Stories</NavLink>
                    </li>
                    <li>
                        <NavLink to='/main/educators'>Reports</NavLink>
                    </li>
                    <li>
                    <NavLink to='/login'>logout</NavLink>
                    </li>
                </ul>
                <div class="burger">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
            </nav>
            <Outlet/>
            <section></section>
        </>
    )
}

export default Layout