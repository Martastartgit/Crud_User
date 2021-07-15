import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as expressFileUpload from 'express-fileupload';
import * as mongoose from 'mongoose';
import * as path from 'path';

import {config} from './config';
import {CodesEnum} from './constants';
import {apiRouter} from './router';

dotenv.config();

class App {
    public readonly app: express.Application = express();

    constructor() {
      (global as any).appRoot = path.resolve(process.cwd(), '../');

      this.app.use(express.json());
      this.app.use(express.urlencoded({extended: true}));

      this.app.use(express.static(path.resolve((global as any).appRoot, 'public')));

      this.app.use(expressFileUpload());

      this.app.use('/', apiRouter);

      this.connectMongoDB();

      this.app.use(this.customErrorHandler);

    }
    private connectMongoDB(): void {
      mongoose.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });

      const connection = mongoose.connection;

      connection.on('error', console.log.bind(console, 'error'));

    }

    private customErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
      res
        .status(err.status || CodesEnum.SERVER)
        .json({
          code: err.code,
          message: err.message || 'Unknown Error'
        });

    }

}
export const app = new App().app;

