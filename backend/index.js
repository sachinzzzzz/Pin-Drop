import express from 'express';
import mongoose from 'mongoose';
import pinRoute from './routes/pins.js';
import userRoute from './routes/users.js';

const app = express();
const PORT = 8800;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/map-pin')
    .then(() =>{
        console.log("database is connected")
    })
    .catch((err) => console.log("something is wrong", err));

    app.use("/api/pins",pinRoute);
    app.use("/api/users",userRoute);
    
    

app.listen(PORT, () => {
    console.log("server is connected");
});
