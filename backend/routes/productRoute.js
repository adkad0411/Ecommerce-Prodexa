import { Router } from "express";
import { addProduct,listProduct,removeProduct,singleProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
const router=Router();


router.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct)
router.post('/remove',adminAuth,removeProduct)
router.post('/single',singleProduct)
router.get('/list',listProduct)


export default router;