import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Home() {
  const [userNotes, setUserNotes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8081/notes')
      .then(res => {
        if (res.status === 200) {
          setUserNotes(res.data.notes);
          setError(null);
        } else {
          navigate('/Login')
          setError("Unauthorized"); 
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          navigate('/Login')
          setError("Unauthorized"); 
        } else {
          setError("Error fetching notes");
          console.error('Error fetching notes:', err);
        }
      });
  }, []);

  const handleNoteClick = (noteId) => {
    navigate(`/getNote/${noteId}`);
  };
  

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout', { withCredentials: true })
      .then(res => {
        navigate('/login');
      })
      .catch(err => console.error("Logout error:", err));
  };

  return (
    <>
      <div className="container text-center">
        <div className='d-flex justify-content-center'>
          <div className='p-5 m-lg-5 m-3 border border-black rounded'>
            <Link to="/addNote"><button className='btn btn-dark'>Add new notes</button></Link>
          </div>
        </div>
        <button onClick={handleLogout} className='btn btn-danger'>LOGOUT</button>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 m-lg-2 m-md-2 mt-2">
            {userNotes.map((d, i) => (
              <div className="col" key={i} >
                <div className="p-3 border rounded-2" onClick={() => handleNoteClick(d.note_id)}>{d.title} </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
