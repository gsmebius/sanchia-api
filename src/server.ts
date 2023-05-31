import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from 'cors';

import { categoryRouter } from './routes/category.routes';
import { productRouter } from './routes/product.routes';
import { userRouter  } from './routes/user.routes';
import { clientRouter } from './routes/client.routes';
import { cartRouter } from './routes/cart.routes';
import { orderRouter } from './routes/order.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(cors());

app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);
app.use('/client', clientRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});