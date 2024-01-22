import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./seederData/users.js";
import threads from "./seederData/threads.js";
import User from "./models/userModel.js";
import Thread from "./models/threadModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Thread.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleThreads = threads.map( (t) => {
            return{ ...t, user: adminUser._id }
        });
        await Thread.insertMany(sampleThreads);

        console.log("data imported".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        await User.deleteMany();
        await Thread.deleteMany();

        console.log("data deleted!!".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if(process.argv[2] === '-d'){
    deleteData();
} else{
    importData();
};