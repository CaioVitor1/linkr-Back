import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import postRouter from "./routes/postRouter.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(postRouter)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));