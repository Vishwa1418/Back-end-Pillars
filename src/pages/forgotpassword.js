import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ForgotPassword } from "./API"

function Forgotpassword()
{
    const [errorMessage,seterrorMessage] = useState('')
    const email = useRef()
    const navigate = useNavigate()
    const login = async(event)=>{
        seterrorMessage('')
        try {
            event.preventDefault()
            seterrorMessage('')
            const data = await ForgotPassword({email:email.current.value})
            // console.log(data)
            if(data.message !== "Password reset email sent successfully.")
            {
                seterrorMessage(data.error)
            }
            else
            {
                alert(data.message)
                navigate('/login')
            }

        } catch (error) {
            alert(error)
        }
    }
    return (
        <>
            <section>
                <form className="box-size" onSubmit={login}>
                    <h2 className='h2f1'>Enter your email</h2>
                    {errorMessage !== '' && <div className='msg'>{errorMessage}</div>}
                    <div className='input-box'>
                    <div className='input-group mb-3'>
                        <span className='input-group-addon'><i className="uil uil-user-circle"></i></span>
                        <input type="email" id="email" className="form-control" ref={email} placeholder='Email address' required/>
                    </div>
                    </div>
                    <input type="submit" className='Loginbutton' value='Send'/>
                    <p className='p1f2'>Don't have an account? <Link to="/signup" className='signup'>Sign Up</Link></p>
                </form>
            </section>
        </>
    )
}

export default Forgotpassword