import { Router } from "express";
import RoomController from "../controllers/RoomController";

const router=Router()

router.post('/create',RoomController.createRoom);
router.delete('/:roomId',RoomController.deleteRoom);
router.get('/',RoomController.getRooms);

export default router;
