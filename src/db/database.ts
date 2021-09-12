import mongoose from 'mongoose'
import * as dotenv from "dotenv";
import {Logger} from 'tslog'

const log = new Logger({name: 'loggerApp'})

dotenv.config();


mongoose.connect(process.env.URI+'',
)
.then(() => {
    console.log('MongoDB is connected');
})
.catch((err) => {
    log.error(err)
 
});

export {mongoose} 





