const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 8081;

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["POST", "GET","DELETE",'PUT'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'note_app'
});

db.connect((err) => {
    if (err) throw err;
});

app.post('/', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json("error");
        }
        if (data.length > 0) {
            req.session.user_id = data[0].id;
            return res.json({ Message: "success" });
        } else {
            return res.json({ Message: "failed" });
        }
    });
});

app.get('/Home', (req, res) => {
    if (req.session.user_id) {
        return res.json({ valid: true, user_id: req.session.user_id });
    } else {
        return res.json({ valid: false });
    }
});

app.get('/addNote', (req, res) => {
    if (req.session.user_id) {
        return res.json({ valid: true, user_id: req.session.user_id });
    } else {
        return res.json({ valid: false });
    }
});
app.get('//note/:note_id', (req, res) => {
    if (req.session.user_id) {
        return res.json({ valid: true, user_id: req.session.user_id });
    } else {
        return res.json({ valid: false });
    }
});

app.post('/Signup', (req, res) => {
    const check = "SELECT * FROM users WHERE email = ?";
    db.query(check, [req.body.email], (err, data) => {
        if (err) {
            return res.json("error");
        }
        if (data.length == 1) {
            return res.json({ message: "emailExisted" });
        } else {
            const sql = "INSERT INTO users (`username`, `password`, `email`) VALUES (?, ?, ?)";
            db.query(sql, [req.body.username, req.body.password, req.body.email], (err, data) => {
                if (err) {
                    return res.json({ message: "error" });
                }
                return res.json({ message: 'success' });
            });
        }
    });
});

app.post('/addNote', (req, res) => {
    const check = "SELECT * FROM users WHERE id = ?";
    db.query(check, [req.body.user_id], (err, data) => {
        if (err) {
            return res.json({ message: "error" });
        }
        if (data.length == 0) {
            return res.json({ message: "failed" });
        } else {
            const sql = "INSERT INTO note (`title`, `note`, `user_id`) VALUES (?, ?, ?)";
            db.query(sql, [req.body.title, req.body.note, req.body.user_id], (err, data) => {
                if (err) {
                    return res.json({ message: "error" });
                }
                return res.json({ message: 'success' });
            });
        }
    });
});

app.get('/notes', (req, res) => {
    const userId = req.session.user_id;
    if (userId) {
        const sql = "SELECT * FROM note WHERE user_id = ?";
        db.query(sql, [userId], (err, data) => {
            if (err) {
                return res.json({ success: false, message: "Error retrieving notes" });
            }
            return res.json({ success: true, notes: data });
        });
    } else {
        return res.json({ success: false, message: "User not logged in" });
    }
});

app.get('/note/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    const sql = "SELECT * FROM note WHERE note_id = ?";
    db.query(sql, [noteId], (err, result) => {
        if (err) {
            console.error("Error fetching note:", err);
            res.status(500).json({ error: "Failed to fetch note" });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: "Note not found" });
            } else {
                res.json(result[0]); 
            }
        }
    });
});

app.delete('/note/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    const sql = "DELETE FROM note WHERE note_id = ?";
    db.query(sql, [noteId], (err, result) => {
        if (err) {
            console.error("Error deleting note:", err);
            res.status(500).json({ error: "Failed to delete note" });
        } else {
            res.json({ message: "Note deleted successfully" });
        }
    });
});

app.put('/note/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    const updatedNote = req.body;
  
    db.query('UPDATE note SET ? WHERE note_id = ?', [updatedNote, noteId], (err, result) => {
      if (err) {
        console.error("Error updating note:", err);
        return res.status(500).json({ error: "Failed to update note" });
      } else {
        console.log("Note updated successfully");
        return res.status(200).json({ message: "Note updated successfully" });
      }
    });
  });
  
  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ message: "Failed to logout" });
        }
        return res.json({ message: "Logout successful" });
    });
});



app.listen(port, () => {
    console.log("Listening...")
});
