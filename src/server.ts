import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from 'cors';

import { categoryRouter } from './routes/category.routes';
import { productRouter } from './routes/product.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(cors());

app.use('/category', categoryRouter);
app.use('/product', productRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
