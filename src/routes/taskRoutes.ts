import express from "express";
import { createTask, deleteTask, getAllTask, getTask, getTaskByDate, updateTask } from "../controllers/taskController.js"

const router = express.Router();

router.post('/create-task', createTask);
router.put('/:id', updateTask);
router.get('/', getAllTask);
router.get('/:id', getTask);
router.get('/get-task-date/:date', getTaskByDate);
router.delete('/:id', deleteTask);

export default router;