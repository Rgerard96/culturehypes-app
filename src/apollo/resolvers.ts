import Note from "../models/Note";

export const resolvers = {
    Query: {
        async getNotes(_: any, { userId }: { userId: string; }) {
            try {
                const notes = await Note.find({ userId }).sort({ createdAt: 1 });
                return notes;
            } catch (error) {
                throw new Error(error instanceof Error ? error.message : String(error));
            }
        }
    },
    Mutation: {
        async createNote(_: any, { userId, title, content }: { userId: string; title: string; content: string; }) {
            const newNote = new Note({
                userId,
                title,
                content,
                createdAt: new Date().toISOString(),
            });

            const note = await newNote.save();

            return {
                ...note.toObject(),
                id: note._id,
            };
        },
        async updateNote(_: any, { id, title, content }: { id: number; title: string; content: string; }) {
            try {
                // Update the note and return the updated document
                const updatedNote = await Note.findByIdAndUpdate(
                    id,
                    {
                        title: title,
                        content: content,
                        updatedAt: new Date().toISOString(),
                    },
                    { new: true } // Return the updated document
                );

                if (!updatedNote) {
                    throw new Error("Note not found");
                }

                return {
                    ...updatedNote.toObject(),
                    id: updatedNote._id, // Return the MongoDB `_id` field as `id`
                };
            } catch (error) {
                console.error("Error updating note:", error);
                throw new Error("Failed to update note");
            }
        },
        async deleteNote(_: any, { id }: { id: any; }) {
            try {

                const note = await Note.findById(id);

                await note?.deleteOne();
                return 'Note deleted succesfully';
            } catch (error) {
                throw new Error(error instanceof Error ? error.message : String(error));
            }
        },
    }
};