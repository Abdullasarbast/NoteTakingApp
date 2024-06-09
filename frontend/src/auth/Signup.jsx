import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../validation/SignupValidation';
import axios from 'axios';

export default function Signup() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).every(key => validationErrors[key] === '')) {
            axios.post('http://localhost:8081/Signup', values)
                .then(res => {
                    if (res.data.message === 'success') {
                        navigate('/login');
                    } else if (res.data.message === 'emailExisted') {
                        alert("Account already exists");
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 bg-dark'>
            <div className='bg-light p-4 rounded-2 w-25'>
                <h2>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label fw-bold">Name</label>
                        <input type="text" className="form-control" id="username" name='username' onChange={handleInput} />
                        {errors.username && <span className='text-danger'>{errors.username}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name='email' onChange={handleInput} />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label fw-bold">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleInput} />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-dark w-100">Sign up</button>
                    <p className='mt-3 text-center'>Already have an account? <Link to='/login'>Login</Link></p>
                </form>
            </div>
        </div>
    );
}
