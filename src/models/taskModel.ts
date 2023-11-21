import mongoose, { Document, Schema, InferSchemaType } from "mongoose";

interface TaskDocument extends Document {
    description: string;
    priorityLevel: string;
    pontuation: number;
    status: boolean;
}

const taskSchema = new Schema<TaskDocument>(
    {
        description: {
            type: String,
            required: true
        },
        priorityLevel: {
            type: String,
            required: true
        },
        pontuation: {
            type: Number,
            required: true
        },
        status: {
            type: Boolean, 
            default: false
        }
    },
    { timestamps: true }
);

export type TaskType = InferSchemaType<typeof taskSchema>

export default mongoose.model<TaskDocument>('Task', taskSchema);