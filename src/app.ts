import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';

import { MongodbURI } from './config';

import codeRouter from './router'

mongoose.connect(MongodbURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', err => {
  console.log('Connect Error');
  console.log(err);
  process.exit(1);
});
db.once('open', () => {
  console.log('Mongodb Connected');
});

const app = express();

app.set('port', process.env.PORT ? process.env.PORT : 3000);

app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}));

app.use('/', codeRouter);

export default app;
