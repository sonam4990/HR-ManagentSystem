import { Router } from 'express';
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee
} from '../controllers/employeeController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.route('/').get(getEmployees).post(authorize('admin', 'hr'), createEmployee);
router
  .route('/:id')
  .get(getEmployeeById)
  .put(authorize('admin', 'hr'), updateEmployee)
  .delete(authorize('admin'), deleteEmployee);

export default router;
