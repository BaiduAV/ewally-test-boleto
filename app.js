import express from 'express';
import boletoRoute from './src/routes/boleto.routes';

const app = express();

app.use(express.json());
app.use('/', boletoRoute);

app.listen(4000, () => {
    console.log('App running in localhost:4000');
});
