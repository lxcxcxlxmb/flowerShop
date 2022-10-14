import dotenv from 'dotenv';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import User from './models/User';
import routes from './routes/index';

const app: Express = express();
app.use(express.json());

app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3000;

async function authentication(request: Request) {
  let authorization = request.headers.authorization + "";
  authorization = authorization.replace("Basic ", '');
  let ascii = Buffer.from(authorization, 'base64').toString('ascii')
  let dados = ascii.split(":");
  console.log(authorization);
  console.log(ascii);

  let username = dados[0];
  let password = dados[1];

  let logado = await User.locateUser(username, password);
  console.log(logado?.toJSON());
  return logado;
}

app.get('/auth', async function (request, response) {
  response.json(await authentication(request));
});

app.get('/verify', async function (request, response) {
  let usuario = await authentication(request)
  response.json(usuario);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('[' + (new Date()) + '] ' + req.method + ' ' + req.url);
  next();
});

app.use(routes);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
