import { Router } from 'express';
import billsController from '../controller/boleto';

const billsRoute = Router();

billsRoute.get('/:boleto', billsController);

export default billsRoute;
