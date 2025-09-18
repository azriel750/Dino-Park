import { Router } from "express";
import { GlobalsController } from "../controllers/GlobalsController";

const globalRouter = Router();

globalRouter.get("/", (request, response) => {
  const controller = new GlobalsController(request, response);
  controller.homepage();
});
globalRouter.get("/login", (request, response) => {
  const controller = new GlobalsController(request, response);
  controller.login();
});globalRouter.get("/Attractions", (request, response) => {
  const controller = new GlobalsController(request, response);
  controller.attractions();
});
export default globalRouter;
