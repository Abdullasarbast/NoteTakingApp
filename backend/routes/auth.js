import { Router } from 'express';
import auth from '../controllers/auth.js';

const router = Router();

router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.get('/logout', auth.logout);

export { router }; 
