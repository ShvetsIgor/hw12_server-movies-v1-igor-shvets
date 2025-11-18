import * as mongoose from "mongoose";
import {DB} from "./configurations/appCongif.ts";
import {launchServer} from "./server.ts";


mongoose.connect(DB).then(() => {
    console.log("Connected with Mongo");
    launchServer();
}).catch((err) => {
    console.log('Mongo connection failed: ', err, '')
})