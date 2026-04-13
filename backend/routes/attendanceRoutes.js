import { Router } from 'express';
import { getAttendance, markAttendance } from '../controllers/attendanceController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.get('/', getAttendance);
router.post('/', authorize('admin', 'hr'), markAttendance);

export default router;
