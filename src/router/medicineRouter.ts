import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../controller/medicineController";
import { createValidation, updateValidation } from "../middleware/medicineValidatiton";
import { uploadMedicinePhoto } from "../middleware/uploadMedicinePhoto";
import { verifyToken } from "../middleware/authorization";
const router = Router()

// router for add new medicine
router.post(`/`,[verifyToken, uploadMedicinePhoto.single(`photo`), createValidation], createMedicine) //single = yang di upload 1 file saja

// route for all medicine
router.get(`/`,[verifyToken], readMedicine)

// route for update medicine
router.put(`/:id`,[verifyToken, uploadMedicinePhoto.single(`photo`), updateValidation], updateMedicine)

//route for delete medicine 
router.delete(`/:id`,[verifyToken], deleteMedicine)

export default router 