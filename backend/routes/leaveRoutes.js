import { Router } from 'express';
import { applyLeave, getLeaves, updateLeaveStatus } from '../controllers/leaveController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.get('/', getLeaves);
router.post('/', applyLeave);
router.patch('/:id/status', authorize('admin', 'hr'), updateLeaveStatus);

export default router;
