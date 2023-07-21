import './Loginpagestyle.css';
import { usernameValidator,passwordValidator } from '../pages/LoginregexValidator.js';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { googleSignIn } from './firebase';
function Loginpage() {

            const [input, setInput] = useState({username:'',password:''});
            const [errorMessage,seterrorMessage] = useState('')
            const [successMessage,setsuccessMessage] = useState('')
            const navigate = useNavigate()
            const endpoint = "http://127.0.0.1:5000/login"
            const handleChange = (event) => {
                setInput({...input, [event.target.name]: event.target.value});
            }

            const login = async()=>{
                const res = await axios.post(endpoint,input)
                console.log(res.data)
                if(res.data.status === 'Success')
                {
                    sessionStorage.setItem('userdata',JSON.stringify({username:res.data.username,email:res.data.email,role:res.data.role,image:res.data.image}))
                    navigate('/home')
                }

                if(res.data.status === 'Invalid username or password')
                {
                    seterrorMessage(res.data.status)
                }
            }
            
            const formSubmitter = (event) => {
                event.preventDefault();
                setsuccessMessage('');
                seterrorMessage('');
                if(!usernameValidator(input.username)) 
                return seterrorMessage('username should have minimum 8 character with combination of uppercase,lowercase and numbers');
          
                if(!passwordValidator(input.password)) 
                return seterrorMessage('password should have minimum 8 character with the combination of uppercase,lowercase,numbers and specialcharacter');
                // setsuccessMessage('Login Successfully');
                // console.log(input);
                login()
            };
    
            return(
            <>
            <form className='Loginpage-container'>
                <div>
                <div className='Loginpage'>
                    <h2 className='h2f1'>Welcome to Kadit Institute</h2>
                    <h2 className='h2f2'>Login</h2>

                    {errorMessage.length > 0 && <div style={{marginBottom:"10px", color:"red",backgroundColor:"yellow"}}>{errorMessage}</div>}
                    {successMessage.length > 0 && <div style={{marginBottom:"10px",color:"green",backgroundColor:"yellow"}}>{successMessage}</div>}
            
                <div className='input-group input-group-lg mb-3'>
                    <span className='input-group-addon'><i className="uil uil-user-circle"></i></span>
                    <input type="text" id="username" className="form-control" name='username' placeholder='Username' required onChange={handleChange}></input>
                </div>

                <div className='input-group input-group-lg mb-3'>
                    <span className='input-group-addon'><i className="uil-key-skeleton"></i></span>
                    <input type="text" id="password" className="form-control" name='password' placeholder='password' required onChange={handleChange}></input>
                </div>

                <div className="form-check form-check-inline mb-5">
                    <input type="checkbox" id="checkbox" className="form-check-input" value=""/>
                    <label htmlFor="checkbox" className="form-check-label">Remember me</label>
                    <Link to='/' className='forgetpassword'>Forget Password?</Link>
                </div>
                </div>

                <div className='mb-3'>
                    <button type="submit" method="POST" className='Loginbutton' onClick={formSubmitter}>Submit</button>
                </div>
                </div>
                    <span className="divider-text">OR</span>
                        <p className="divider"></p>

                    <div className='Socialmedipage mb-3'>
                        <p className='p1f2'>Get started with your free account</p>
                        <button type="button" className="Socialmediabutton3" onClick={() => { googleSignIn().then(() => navigate('/password'))}}><i className="fa fa-google" style={{color:"green"}}></i> Login via Google</button><br></br><br></br>
                        <button type="button" className="Socialmediabutton2" disabled><i className="fa fa-facebook-square"> Login via Facebook</i></button><br></br><br></br>
                        <button type="button" className="Socialmediabutton1" disabled><i className="fa fa-twitter-square"> Login via Twitter</i></button>
                    </div>

                        <p className='p1f3'>Don't have an account?<Link to='/signup'>Sign up</Link></p>
                </form>
                
            </>
    )
}
export default Loginpage;