import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import router from "./routes/router.js";

import router from "./routes/router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


app.use(router);


const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(chalk.bold.blue(`Server listening on port ${process.env.PORT}`))
);
