import { Router } from "express";
import globalRouter from "./globals";
import reserveRouter from "./reserve";
import adminRouter from "./admin";


const router = Router();

router.use(globalRouter);
router.use('/reserve', reserveRouter);
router.use("/admin", adminRouter);


export default router;
