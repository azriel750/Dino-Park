import { Router } from "express";
import { reserveController } from "../controllers/reserveController";


const reserveRouter = Router();

// BROWSE
reserveRouter.get("/", (request, response) => {
  const controller = new reserveController(request, response);
  controller.browsereserves();
});

// EDIT
reserveRouter.get("/edit/:id", (request, response) => {
  const controller = new reserveController(request, response);
  controller.editreserve();
});

reserveRouter.post("/edit/:id", (request, response) => {
  const controller = new reserveController(request, response);

});

// ADD
reserveRouter.get("/create", (request, response) => {
  const controller = new reserveController(request, response);
  controller.createreserve();
});

reserveRouter.post("/create", (request, response) => {

});

// DELETE
reserveRouter.get("/delete/:id", (request, response) => {
  const controller = new reserveController(request, response);
  controller.deletereserve();
});

// READ
reserveRouter.get("/:id", (request, response) => {
  const controller = new reserveController(request, response);
  controller.readreserve();
});
reserveRouter.post("/paiement", (req, res) => {
  const controller = new reserveController(req, res);
  controller.paiement();
});

export default reserveRouter;
