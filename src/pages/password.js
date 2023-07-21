import { Link, useNavigate } from 'react-router-dom';
import { passwordValidator,repasswordValidator } from '../pages/SignupregexValidator.js';
import './Signuppagestyle.css';
import axios from 'axios';
import React, { useState } from 'react';

function Password() {
            
            let data = sessionStorage.getItem('userdata')
            data = JSON.parse(data)        
            const [input,setInput] = useState({...data,password:'',repassword:''})
            const [errorMessage,seterrorMessage] = useState('')
            const [successMessage,setsuccessMessage] = useState('')
            const navigate = useNavigate()
            const endpoint = "http://127.0.0.1:5000/register"
            const handleChange = (event) => {
                setInput({...input, [event.target.name]: event.target.value})
            }
            const register = async()=>{
                const res = await axios.post(endpoint,input)
                // console.log(res.data)
                if(res.data.status === 'success')
                {
                    sessionStorage.setItem('userdata',JSON.stringify({username:data.username,email:data.email,image:data.image}))
                    navigate('/home')
                }
            }
            const formSubmitter = (event) => {
                event.preventDefault();
                setsuccessMessage('');
                seterrorMessage('');
                // if(!nameValidator(input.username)) 
                // return seterrorMessage('username should have minimum 8 character with combination of uppercase,lowercase and numbers');

                // if(!emailValidator(input.email)) 
                // return seterrorMessage('please enter valid email id');

                // if(!numberValidator(input.number)) 
                // return seterrorMessage('please enter number only');

                if(!passwordValidator(input.password)) 
                return seterrorMessage('password should have minimum 8 character with the combination of uppercase,lowercase,numbers and specialcharacter');

                if(!repasswordValidator(input.repassword)) 
                return seterrorMessage('please enter same password');
                
                setsuccessMessage('Successfully validated')
                register()
                console.log(input)
            }

            return(
            <>
            <form>
                <div className='Signuppage-container'>
                <div className='Signuppage'>
                    <h1 className='h1f1'><u><strong>New User Account</strong></u></h1>

                    {errorMessage.length > 0 && <div style={{marginBottom:"10px",backgroundColor:"yellow", color:"red"}}>{errorMessage}</div>}
                    {successMessage.length > 0 && <div style={{marginBottom:"10px", backgroundColor:"yellow", color:"green"}}>{successMessage}</div>}
                

                <div className='input-group input-group-lg mb-3'>
                    <span className='input-group-addon'><i className="uil uil-padlock"></i></span>
                    <input type="text" id="password" className="form-control" name='password' placeholder='Enter Password' required onChange={handleChange}></input>
                </div>

                <div className='input-group input-group-lg mb-3'>
                    <span className='input-group-addon'><i className="uil uil-padlock"></i></span>
                    <input type="text" id="rpassword" className="form-control" name='repassword' placeholder='Repeat Password' required onChange={handleChange}></input>
                </div>

                <div className="form-check form-check-inline mb-5">
                    <input type="checkbox" id="checkbox" className="form-check-input" value=""/>
                    <label htmlFor="checkbox" className="form-check-label">I accept all terms & conditions</label>
                </div>
            
                    <button type="submit" className='Signupbutton' value="send" onClick={formSubmitter}>Register</button>
                </div>
                <p className='p1f3'>Already have an account?<Link to='/login'>Sign in</Link></p>
                </div>
                </form>
        </>
    )
}
export default Password;