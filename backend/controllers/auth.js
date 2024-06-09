import db from '../db.js';

const auth = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await db('users').where({ email, password }).first();
      if (user) {
        req.session.user_id = user.id;
        return res.json({ message: "success" });
      } else {
        return res.json({ message: "failed" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Error logging in: " + error.message });
    }
  },
  signup: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const existingUser = await db('users').where({ email }).first();
      if (existingUser) {
        return res.json({ message: "emailExisted" });
      } else {
        await db('users').insert({ username, email, password });
        return res.json({ message: "success" });
      }
    } catch (error) {
      console.error("Error signing up:", error);
      return res.status(500).json({ message: "Error signing up: " + error.message });
    }
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Failed to logout" });
      }
      return res.json({ message: "Logout successful" });
    });
  }
};

export default auth;
