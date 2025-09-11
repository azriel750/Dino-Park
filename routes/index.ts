import { Router } from "express";
import globalRouter from "./globals";

import reserveRouter from "./reserve";

const router = Router();

router.use(globalRouter);
router.use('/reserve', reserveRouter);


export default router;
