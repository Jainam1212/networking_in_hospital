import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userRouter from './routes/user.js';
import { connectDataBase } from './data/database.js';
import bodyParser from 'body-parser';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 9000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'css')));

try {
  connectDataBase();
} catch (error) {
  console.log(error);
}
app.use(userRouter);

app.listen(port, () => {
  console.log(`application successfully started at port ${port}`);
});

// export { appointmetHandler };
