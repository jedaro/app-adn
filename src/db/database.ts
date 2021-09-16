import mongoose from 'mongoose'
import * as dotenv from "dotenv";
import {Logger} from 'tslog'
const log = new Logger({name: 'loggerApp'})
dotenv.config();
let uri_database = process.env.URI;
if (process.env.NODE_ENV === "testing") {
    uri_database = process.env.MONGO_URI_TEST;
  }

mongoose.connect(uri_database+'',
)
.then(() => {
    console.log('MongoDB is connected!');
})
.catch((err) => {
    log.error(err)
    
 
});

export {mongoose} 





