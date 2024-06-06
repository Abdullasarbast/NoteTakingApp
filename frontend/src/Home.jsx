import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Home() {
    const [user_id,setUser_id] = useState('');
    const navigate = useNavigate();
    const [userNotes, setUserNotes] = useState([]);
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:8081/Home')
        .then(res => {
            if (res.data.valid) {
                setUser_id(res.data.user_id);
            }else{
                navigate('/')
            }
        })
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
      axios.get('http://localhost:8081/notes')
          .then(res => {
              if (res.data.success) {
                  setUserNotes(res.data.notes);
              } else {
                  navigate('/');
              }
          })
          .catch(err => console.log(err));
  }, []);
  const handleNoteClick = (noteId) => {
    navigate(`/note/${noteId}`);
};const handleLogout = () => {
  axios.get('http://localhost:8081/logout', { withCredentials: true })
      .then(res => {
          navigate('/');
      })
      .catch(err => console.error("Logout error:", err));
}

  return (
    <>
      <div className="container text-center">
      <div className='d-flex  justify-content-center'>
        <div className='p-5 m-lg-5 m-3 border border-black rounded'>
           <Link to="/addNote"><button className='btn btn-dark'>Add new notes</button></Link>
        </div>
        
      </div>
      <button onClick={handleLogout} className='btn btn-danger'>LOGOUT</button>

  <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 m-lg-2 m-md-2 mt-2">
  {userNotes.map((d,i)=>(
    <div className="col" key={i} >
      <div className="p-3 border rounded-2" onClick={() => handleNoteClick(d.note_id)}>{d.title} </div>
    </div>
  ))}
  </div>
</div>
    </>
  )
}
