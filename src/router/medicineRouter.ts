import { Router } from "express";
import { createMedicine, deleteMedicine, readMedicine, updateMedicine } from "../controller/medicineController";
import { createValidation, updateValidation } from "../middleware/medicineValidatiton";
const router = Router()

// router for add new medicine
router.post(`/`,[createValidation], createMedicine)

// route for all medicine
router.get(`/`, readMedicine)

// route for update medicine
router.put(`/:id`,[updateValidation], updateMedicine)

//route for delete medicine 
router.delete(`/:id`, deleteMedicine)

export default router