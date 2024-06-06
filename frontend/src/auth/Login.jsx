import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from '../validation/LoginValidation'
import axios from 'axios'

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();
    const handleInput = (e) => {
        setValues(prev => ({...prev,[e.target.name]: [e.target.value]}));
    }
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).every(key => validationErrors[key] === '')) {
            axios.post('http://localhost:8081/', values)
                .then(res => {
                    if (res.data.Message === 'success') {
                        navigate('/Home');
                    } else {
                        alert("No account existed");
                    }
                })
                .catch(err => console.log(err));
        }
    }
    
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-dark'>
    <div className='bg-light p-4 rounded-2 w-25'>
    <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email address</label>
                <input type="email" className="form-control" name='email' id="exampleInputEmail1" onChange={handleInput} />
                {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Password</label>
                <input type="password" className="form-control" name='password' id="exampleInputPassword1" onChange={handleInput} />
                {errors.password && <span className='text-danger'>{errors.password} </span>}
            </div>
            {errors.exist && <p className='text-danger text-center'>{errors.exist} </p>}
            <button type="submit" className="btn btn-dark w-100">Login</button>
            <p className='mt-3 text-center'>don't have an account? <Link to='/signup'>Create Account</Link> </p> 
        </form>
        </div>
    </div>
  )
}

export default Login
