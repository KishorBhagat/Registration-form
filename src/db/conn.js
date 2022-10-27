const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/userRegistered", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully!");
    } catch (error) {
        console.log("FAILED to connect database!");
    }
}

connectDb();