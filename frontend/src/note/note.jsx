import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';




export default function Note() {
    const { note_id } = useParams();
    const [note, setNote] = useState(null);
    const navigate = useNavigate()
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

    useEffect(() => {
        axios.get(`http://localhost:8081/note/` + note_id)
            .then(response => {
                setNote(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching note:", error);
            });
    }, []);

    const handleDelete = () => {
        axios.delete(`http://localhost:8081/note/` + note_id)
            .then(response => {
                console.log("Note deleted successfully");
                Navigate('/Home');
            })
            .catch(error => {
                console.error("Error deleting note:", error);
            });
    };
    return (
        <div className='bg-dark'>
            {note && (
                <>
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
                </>
            )}
        </div>
    );
}
