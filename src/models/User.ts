
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
});

const User = mongoose.model("User", UserSchema);

export default User;