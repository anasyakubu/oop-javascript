import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/author.controller';

const router = express.Router();

router.post('/author', createUser);
router.get('/author', getUsers);
// router.get('/:id', getUserById);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);

export default router;
