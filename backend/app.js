import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import {router as authRouter} from './routes/auth.js';
import {router as noteRouter} from './routes/note.js';

const app = express();
const port = 8081;





app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ["POST", "GET", "DELETE", 'PUT'],
  credentials: true
}));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use('/', authRouter);
app.use('/notes', noteRouter);

app.listen(port, () => {
  console.log("Listening...")
});


  