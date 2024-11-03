import { Router } from "express";
import MessageController from "../controllers/MessageController";

const router=Router();

router.get('/:roomId',MessageController.getMessage)
router.post('/:roomId',MessageController.addMessage);


export default router;