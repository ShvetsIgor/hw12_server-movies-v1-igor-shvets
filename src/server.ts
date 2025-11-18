import express from 'express';
import {PORT} from "./configurations/appCongif.ts";
import morgan from 'morgan';
import * as fs from "node:fs";
import {moviesRouter} from "./router/moviesRouter.ts";
import {errorHandler} from "./errorHandler/errorHandler.ts";

export const launchServer = () => {
    const app = express();

    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

    app.use(express.json());

    //logger
    app.use(morgan('combined'));
    const writeStream = fs.createWriteStream('log.txt', {flags: 'a'});
    app.use(morgan('combined', {stream: writeStream}));

    app.use('/movies', moviesRouter);

    app.use((req, res) => {
        res.status(404).json({message: 'Page not found'})
    })

    app.use(errorHandler);

}