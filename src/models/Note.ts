import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

const Note = mongoose.model("Note", NoteSchema);

export default Note;