import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { googleSignIn } from './firebase';
function Loginpage() {

            const [input, setInput] = useState({username:'',password:''});
            const [errorMessage,seterrorMessage] = useState('')
            const navigate = useNavigate()
            const endpoint = `${process.env.REACT_APP_HOST}/login`
            const handleChange = (event) => {
                setInput({...input, [event.target.name]: event.target.value});
            }

            const login = async(event)=>{
                try {
                    event.preventDefault()
                    const res = await axios.post(endpoint,input)
                    console.log(res.data)
                    if(res.data.status === 'Success')
                    {
                        sessionStorage.setItem('userdata',JSON.stringify({username:res.data.username,email:res.data.email,role:res.data.role,image:res.data.image}))
                        navigate('/main/home')
                    }

                    if(res.data.status === 'Invalid username or password')
                    {
                        seterrorMessage(res.data.status)
                    }
                } catch (error) {
                    alert(error)
                }
            }
            
    
            return(
            <>
            <section>
                <form className='box-size' onSubmit={login}>
                <div className='Loginpage'>
                    <h2 className='h2f1'>Welcome to Kadit Institute</h2>
                    <h2 className='h2f2'>Login</h2>

                    {errorMessage.length > 0 && <div className='msg'>{errorMessage}</div>}
                
                <div className='input-box'>
                <div className='input-group mb-3'>
                    <span className='input-group-addon'><i className="uil uil-user-circle"></i></span>
                    <input type="email" id="email" className="form-control" name='email' placeholder='Email address' required onChange={handleChange}></input>
                </div>

                <div className='input-group mb-3'>
                    <span className='input-group-addon'><i className="uil-key-skeleton"></i></span>
                    <input type="password" id="password" className="form-control" name='password' placeholder='password' required onChange={handleChange}></input>
                </div>
                
                <div className='formcheck'>
                <div className="form-check form-check-inline mb-5">
                    <input type="checkbox" id="checkbox" className="form-check-input" value="" required/>
                    <label htmlFor="checkbox" className="form-check-label" style={{fontSize:"15px"}}>Remember me</label>
                    <a href="#" className='forgetpassword'>Forgot Password?</a>
                </div>
                </div>
                </div>

                    <input type="submit" className='Loginbutton' value='login'/>
                    
                    <p className="divider">OR</p>
                    <p className='p1f1'>Get started with your free account</p>

                <div className='Socialmediapage'>
                    <button type="button" className="Socialmediabutton" onClick={() => { googleSignIn().then(() => navigate('/password'))}}><i className="fa fa-google" style={{color:"green"}}></i> Login via Google</button><br></br><br></br>
                    <button type="button" className="Socialmediabutton facebook" disabled><i className="fa fa-facebook-square"> Login via Facebook</i></button><br></br><br></br>
                    <button type="button" className="Socialmediabutton twitter" disabled><i className="fa fa-twitter-square"> Login via Twitter</i></button>
                </div>

                    <p className='p1f2'>Don't have an account? <Link to="/signup" className='signup'>SignUp</Link></p>
                </div>
                </form>
            </section>
                
            </>
    )
}
export default Loginpage;