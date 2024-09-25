import { Router } from "express";
import { authentication, createAdmin, deleteAdmin, readAdmin, updateAdmin } from "../controller/adminController";
import { authValidation, createValidation, updateValidation } from "../middleware/adminValidation";
import { verifyToken } from "../middleware/authorization";
const router = Router()

// router for add new admin
router.post(`/`, [verifyToken, createValidation], createAdmin)

// route for all admin
router.get(`/`, [verifyToken], readAdmin)

// route for update admin
router.put(`/:id`,[verifyToken, updateValidation], updateAdmin)

//route for delete admin 
router.delete(`/:id`,[verifyToken], deleteAdmin)

router.post(`/auth`,[authValidation], authentication)

export default router