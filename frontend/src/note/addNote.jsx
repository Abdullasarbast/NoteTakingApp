import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Validation from '../validation/NoteValidation';

export default function AddNote() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [values, setValues] = useState({
        title: '',
        note: '',
        user_id: ''
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/Home', { withCredentials: true })
            .then(res => {
                if (!res.data.valid) {
                    navigate('/');
                } else {
                    setUser(res.data.user_id);
                    setValues(prevValues => ({ ...prevValues, user_id: res.data.user_id }));
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).every(key => validationErrors[key] === '')) {
            axios.post('http://localhost:8081/addNote', values, { withCredentials: true })
                .then(res => {
                    if (res.data.message === 'success') {
                        navigate('/Home');
                    }
                })
                .catch(err => console.log(err));
        }
    };
    

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 bg-dark'>
            <div className='bg-light rounded ps-5 pe-5 pt-3 pb-3'>
                <h2 className='mt-3 me-5'>Add new notes</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label fw-bold">Title</label>
                        <input type="text" className="form-control" id="title" name='title' onChange={handleInput} />
                        {errors.title && <span className='text-danger'>{errors.title} </span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="note" className="form-label fw-bold">Note</label>
                        <textarea className="form-control" id="note" rows="3" name='note' onChange={handleInput}></textarea>
                        {errors.note && <span className='text-danger'>{errors.note} </span>}
                    </div>
                    <div className="mb-3">
                        <button type='submit' className='btn btn-dark w-100'>Add note</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
