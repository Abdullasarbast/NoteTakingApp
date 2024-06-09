import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./Home";
import Login from './auth/Login';
import Signup from './auth/Signup';
import AddNote from './note/addNote';
import Note from './note/note';
import Update from './note/Update';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/addnote' element={<AddNote />}></Route>
        <Route path='/getNote/:note_id' element={<Note />} />
        <Route path='/update/:note_id' element={<Update />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
