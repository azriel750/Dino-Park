import { Router } from "express";
import { reserveController } from "../controllers/reserveController";

const reserveRouter = Router();

// GET formulaire
reserveRouter.get("/", async (req, res) => {
  const controller = new reserveController(req, res);
  await controller.browsereserve();
});

// POST paiement
reserveRouter.post("/paiement", async (req, res) => {
  const controller = new reserveController(req, res);
  await controller.paiement(); 
});

export default reserveRouter;
