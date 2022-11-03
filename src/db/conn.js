const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully!");
    } catch (error) {
        console.log(error);
        console.log("FAILED to connect database!");
    }
}

connectDb();