import express from "express";
import morgan from "morgan";

import { systemLog } from "./libs/logs.js";

import router from "./routers/index.js";

import { PORT } from "./secrets/env.js";

const app = express();

app.use(express.json());
app.use(morgan("short")); // short type for tracking ip and status code

app.use("/api", router);

app.listen(PORT, () => systemLog(`[System] PORT - ${PORT}`));
