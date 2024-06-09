import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function Note() {
  const { note_id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`http://localhost:8081/notes/${note_id}`)
      .then(response => {
        setNote(response.data.note);
      })
      .catch(error => {
        console.error("Error fetching note:", error);
      });
  }, [note_id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8081/notes/${note_id}`)
      .then(response => {
        console.log("Note deleted successfully");
        navigate('/'); 
      })
      .catch(error => {
        console.error("Error deleting note:", error);
      });
  };

  return (
    <div className='bg-dark'>
      {note && (
        <div className='d-flex justify-content-center align-items-center vh-100'>
          <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.note}</p>
              <button className='btn btn-danger w-50' onClick={handleDelete}>DELETE</button>
              <Link to={`/Update/${note_id}`}><button className='btn btn-dark w-50'>UPDATE</button></Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
