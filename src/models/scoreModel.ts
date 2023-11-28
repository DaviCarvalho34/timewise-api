import mongoose, { Document, Schema, InferSchemaType } from "mongoose";

interface ScoreDocument extends Document {
    generalPontuation: number;
    tasksCompleted: number;
}

const scoreSchema = new Schema<ScoreDocument>(
    {
        generalPontuation: {
            type: Number,
            required: true
        },
        tasksCompleted: {
            type: Number,
            required: true
        },
        
    },
    { timestamps: true }
);

export default mongoose.model<ScoreDocument>('Score', scoreSchema);