import express from 'express';
import billsRoute from './src/routes/bills.routes';

const app = express();

app.use(express.json());
app.use('/boleto', billsRoute);

app.listen(8080, () => {
    console.log('App running in localhost:8080');
});
