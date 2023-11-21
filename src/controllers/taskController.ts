import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Task, { TaskType } from '../models/taskModel.js';
import validadeMongobdid from '../utils/validateMongodbid.js';


const createTask = asyncHandler(async (req: Request, res: Response) => {

    const description = req.body.description;

    const findDescription = await Task.findOne({ description: description });

    if(!findDescription) {
        const newTask = await Task.create(req.body);
        return res.json(newTask);
    } 
    return res.status(400).json({ error: "task already exists" });  
});

const updateTask = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    validadeMongobdid(id);

    try{
        const updateTask = await Task.findByIdAndUpdate(
            id,
            {
                description: req?.body?.description,
                priorityLevel: req?.body?.priorityLevel,
                pontuation: req?.body?.pontuation,
                status: req?.body?.status
            },{
                new: true,
            }
        );
        res.json(updateTask);
    } catch(error) {
        return res.status(400).json({ error: "update error" });
    }
});

const getTask = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    validadeMongobdid(id);

    try {
        const getTask = await Task.findById(id);
        res.json({ getTask });
    } catch(error) {
        return res.status(400).json({ error: "get error" });
    }
});

const getTaskByDate = asyncHandler(async (req: Request, res: Response) => {
    const { date } = req.params;
    const formatedDate = new Date(date).toDateString();
    try {
        const getTask = await Task.find();
        const tasksArray = getTask.filter((item: any) => {
            if(new Date(item.createdAt).toDateString() === formatedDate) {
                console.log(item)
                return item;
            } else {
                return;
            }
        })
        /*.where("createdAt").equals(date);*/
        res.json({ tasksArray });
    } catch(error) {
        console.error(error);
        return res.status(400).json({ error: "get error" });
    }
});

const getAllTask = asyncHandler(async (req: Request, res: Response) => {
    try {   
        const queryObj = { ...req.query };
        const excludeFields = ['page','sort','limit','fields'];
        excludeFields.forEach((el) => delete queryObj[el]);
        
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let query = Task.find(JSON.parse(queryStr));
        if(req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
        
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if(req.query.page) {
          const taskCount = await Task.countDocuments();
          if(skip >= taskCount) throw new Error("This Page does not exists");
        }

        const tasks = await query;
        res.json(tasks);

    } catch (error) {
        return res.status(400).json({ error: "get error" });
    }
})

const deleteTask = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    validadeMongobdid(id);

    try {
        const deleteTask = await Task.findByIdAndDelete(id);
        res.json({
          deleteTask,
        });
      } catch (error) {
        throw new Error(error);
      }
});

export { createTask, updateTask, getTask, getTaskByDate, deleteTask, getAllTask };