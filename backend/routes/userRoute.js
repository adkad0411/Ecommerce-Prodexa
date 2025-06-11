import { Router } from "express";
import { loginUser,registerUser,adminLogin } from "../controllers/userController.js";

const router=Router();

router.post('/register',registerUser);
router.post('/login',loginUser)

//admin
router.post('/admin',adminLogin)

export default router;