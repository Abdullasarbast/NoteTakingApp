import db from '../db.js';

const note = {
    addNote: async (req, res) => {
        let { title, note, user_id } = req.body;
        user_id = req.session.user_id;
        try {
          const user = await db('users').where('id', user_id).first();
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          await db('note').insert({ title, note, user_id });
          return res.status(201).json({ message: "success" });
        } catch (error) {
          console.error("Error adding note:", error);
          return res.status(500).json({ message: "Internal server error" });
        }
      },
  getNotes: async (req, res) => {
    const userId = req.session.user_id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const notes = await db('note').where('user_id', userId);
      return res.json({ notes });
    } catch (error) {
      console.error("Error fetching notes:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  getNote: async (req, res) => {
    const note_id = req.params.note_id;
    try {
      const note = await db('note').where('note_id', note_id).first();
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      return res.json({ note });
    } catch (error) {
      console.error("Error fetching note:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteNote: async (req, res) => {
    const noteId = req.params.note_id;
    try {
      const deleted = await db('note').where('note_id', noteId).del();
      if (!deleted) {
        return res.status(404).json({ message: "Note not found" });
      }
      return res.json({ message: "Note deleted successfully" });
    } catch (error) {
      console.error("Error deleting note:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  updateNote: async (req, res) => {
    const noteId = req.params.note_id;
    const { title, note } = req.body;
    try {
      const updated = await db('note').where('note_id', noteId).update({ title, note });
      if (!updated) {
        return res.status(404).json({ message: "Note not found" });
      }
      return res.json({ message: "Note updated successfully" });
    } catch (error) {
      console.error("Error updating note:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default note;
