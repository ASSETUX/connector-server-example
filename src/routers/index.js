import { Router } from "express";
import { webhook, createPayment } from "../controllers/index.js";

export default Router()
  .post("/webhook", webhook)
  .get("/createPayment", createPayment);
