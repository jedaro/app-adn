import mongoose from 'mongoose'
import * as dotenv from "dotenv";

dotenv.config();


mongoose.connect(process.env.URI+'',
)
.then(() => {
    console.log('MongoDB is connected');
})
.catch((err) => {
    console.log(
        err
    );
 
});

export {mongoose} 





