import express from "express";
import { createTask, deleteTask, getAllTask, getTask, updateTask } from "../controllers/taskController.js"

const router = express.Router();

router.post('/create-task', createTask);
router.put('/:id', updateTask);
router.get('/', getAllTask);
router.get('/:id', getTask);
router.delete('/:id', deleteTask);

export default router;