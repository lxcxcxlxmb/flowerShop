// const router = require('express').Router();
import express, { Express, Request, Response } from 'express';
import router from './index';
import User from '../models/User';
const routerLogin = express.Router();

async function authentication(request) {
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

routerLogin.get('/auth', async function (request: Request, response: Response) {
    response.json(await authentication(request));
});

routerLogin.get('/verify', async function (request: Request, response: Response) {
    let usuario = await authentication(request)
    response.json(usuario);
});

export default routerLogin;