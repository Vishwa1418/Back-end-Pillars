import { Link } from 'react-router-dom';
import { nameValidator,emailValidator,numberValidator,passwordValidator,repasswordValidator } from '../pages/SignupregexValidator.js';
import axios from 'axios';
import React, { useState, useRef } from 'react';
import { uploadToCloud } from './firebase.js';
function Signuppage() {
            
            const [image,setImg] = useState('https://www.aquaknect.com.au/wp-content/uploads/2014/03/blank-person-300x300.jpg')        
            const [input,setInput] = useState({username:'',email:'', number:'',password:'',repassword:'',role:'Student'})
            const [errorMessage,seterrorMessage] = useState('')
            const [successMessage,setsuccessMessage] = useState('')
            const user = useRef()
            const number = useRef()
            const files = useRef()
            const endpoint = `${process.env.REACT_APP_HOST}/register`
            const handleChange = (event) => {
                setInput({...input, [event.target.name]: event.target.value})
                if(number.current.value.length >= number.current.maxLength)
                {
                    number.current.value = number.current.value.substring(0,number.current.maxLength)
                }
            }
            const register = async()=>{
                try {
                    const res = await axios.post(endpoint,input)
                    console.log(res.data)
                    if(res.data.status !== "success")
                    {
                        setsuccessMessage(res.data.status)
                    }
                    else
                    {
                        setsuccessMessage('Successfully validated')
                    }
                } catch (error) {
                    alert(error)
                }
            }
            const formSubmitter = (event) => {
                event.preventDefault();
                setsuccessMessage('');
                seterrorMessage('');

                // if(!nameValidator(input.username)) 
                // return seterrorMessage('username should have minimum 8 character with combination of uppercase,lowercase and numbers');

                if(!emailValidator(input.email)) 
                return seterrorMessage('please enter valid email id');

                if(!numberValidator(input.number)) 
                return seterrorMessage('please enter number only');

                if(!passwordValidator(input.password)) 
                return seterrorMessage('password should have minimum 8 character with the combination of uppercase,lowercase,numbers and specialcharacter');

                if(!repasswordValidator(input.repassword)) 
                return seterrorMessage('please enter same password');

                setInput(prev => {
                    return {...prev,image}
                })
                register()
                // console.log(input)
            }

            const uploadImage = (e) => {
                // console.log(e.target.files[0])
                const file = e.target.files[0]
                const reader = new FileReader(file)
                reader.readAsDataURL(file)
                reader.onload = () => {
                    const image = document.createElement('img')
                    image.src = reader.result
                    const width = 200
                    image.onload = () => {
                        const canvas = document.createElement('canvas')
                        const ratio = width/image.width
                        canvas.width = width
                        canvas.height = image.height * ratio
                        const context = canvas.getContext('2d')
                        context.drawImage(image,0,0,canvas.width,canvas.height)
                        const new_url = context.canvas.toDataURL("image/jpeg",80)
                        // console.log(new_url)
                        uploadToCloud(user.current.value,new_url).then(imageURL => setImg(imageURL))
                    }
                }
            }

            return(
            <>
            <section>
                <form className='box-size'> 
                <div className='Signuppage'>
                    <h1 className='h1f1'><strong>New User Account</strong></h1>

                    {errorMessage.length > 0 && <div className='msg'>{errorMessage}</div>}
                <img src={image} className={'image'} alt='avatar'onClick={() => files.current.click() }/>
                <input type='file' accept='.jpg, .png' ref={files} onChange={uploadImage} hidden/>
                <div className='input-box'>
                <div className='input-group mb-3'>
                    <span className='input-group-addon' id='addon'><i className="uil uil-user-circle"></i></span>
                    <input type="text" id="name" className="form-control" name='username' ref={user} placeholder='Enter your name' required onChange={handleChange}></input>
                </div>

                <div className='input-group mb-3'>
                    <span className='input-group-addon' id='addon'><i className="uil uil-envelopes"></i></span>
                    <input type="text" id="email" className="form-control" name='email' placeholder='Enter email address' required onChange={handleChange}></input>
                </div>
             
                <div className='input-group mb-3'>
                    <span className='input-group-addon' id='addon'><i className="uil uil-calling"></i></span>
                    <span className="input-group-addon" id='form-select'required><select className="form-control" id="form-select1">
                        <option>IND +91</option>
                        <option>AUS +92</option>
                        </select>
                        </span>
                    <input type="number" id="number" className="form-control" name='number' placeholder='Enter phone number' ref={number} maxLength={10} required onChange={handleChange}></input>
                </div>

                <div className='input-group mb-3'>
                    <span className='input-group-addon' id='addon'><i className="uil uil-padlock"></i></span>
                    <input type="password" id="password" className="form-control" name='password' placeholder='Enter Password' required onChange={handleChange}></input>
                </div>

                <div className='input-group mb-3'>
                    <span className='input-group-addon' id='addon'><i className="uil uil-padlock"></i></span>
                    <input type="password" id="rpassword" className="form-control" name='repassword' placeholder='Repeat Password' required onChange={handleChange}></input>
                </div>
                <div className='formcheck1'>
                <div className="form-check form-check-inline mb-5">
                    <input type="checkbox" id="checkbox" name="checkbox" className="form-check-input" value="" required/>
                    <label htmlFor="checkbox" className="form-check-label">I accept all terms & conditions</label>
                </div>
                </div>
                </div>
            
                    <button type="submit" className='Signupbutton' value="send" onClick={formSubmitter}>Register</button>
                
                    <p className='p1f3'>Already have an account? <Link to='/login' className='signin'>SignIn</Link></p>
                </div>
                </form>
            </section>
        </>
    )
}
export default Signuppage;