import { Router } from "express";
import { reserveController } from "../controllers/reserveController";

const reserveRouter = Router();

reserveRouter.get("/", async (req, res) => {
  const controller = new reserveController(req, res);
  await controller.browsereserve();
});

reserveRouter.post("/paiement", async (req, res) => {
  const controller = new reserveController(req, res);
  await controller.paiement(); 
});

export default reserveRouter;
