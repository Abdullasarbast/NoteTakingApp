import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Validation from '../validation/NoteValidation';

export default function Update() {
  const { note_id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: '',
    note: ''
  });
  const [errors, setErrors] = useState({});

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`http://localhost:8081/notes/${note_id}`)
      .then(response => {
        setValues(response.data.note); 
      })
      .catch(error => {
        console.error("Error fetching note:", error);
      });
  }, [note_id]);

  const handleInput = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(Validation(values));
  
    if (Object.keys(errors).every(key => errors[key] === '')) {
      try {
        await axios.put(`http://localhost:8081/notes/${note_id}`, values);
        navigate('/');
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-dark'>
      <div className='bg-light rounded ps-5 pe-5 pt-3 pb-3'>
        <h2 className='mt-3 me-5'>Update Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-bold">Title</label>
            <input 
              type="text" 
              className="form-control" 
              id="title" 
              name='title' 
              value={values.title} 
              onChange={handleInput} 
            />
            {errors.title && <span className='text-danger'>{errors.title} </span>}
          </div>
          <div className="mb-3">
            <label htmlFor="note" className="form-label fw-bold">Note</label>
            <textarea 
              className="form-control" 
              id="note" 
              rows="3" 
              name='note' 
              value={values.note} 
              onChange={handleInput} 
            ></textarea>
            {errors.note && <span className='text-danger'>{errors.note} </span>}
          </div>
          <div className="mb-3">
            <button type='submit' className='btn btn-dark w-100'>Update Note</button>
          </div>
        </form>
      </div>
    </div>
  );
}
