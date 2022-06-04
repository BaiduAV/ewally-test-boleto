import { Router } from 'express';
import boletoController from '../controller/boleto';

const boletoRoute = Router();

boletoRoute.get('/:boleto', boletoController);

export default boletoRoute;
