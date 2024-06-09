import express from 'express';
import note from '../controllers/note.js';

const router = express.Router();
router.post('/addNote', note.addNote);
router.get('/', note.getNotes); 
router.get('/:note_id', note.getNote);
router.delete('/:note_id', note.deleteNote);
router.put('/:note_id', note.updateNote);


export { router };
