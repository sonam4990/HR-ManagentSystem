import Employee from '../models/Employee.js';
import Attendance from '../models/Attendance.js';
import Leave from '../models/Leave.js';

export const getDashboardStats = async (_req, res) => {
  const [totalEmployees, activeEmployees, pendingLeaves, todaysAttendance] = await Promise.all([
    Employee.countDocuments(),
    Employee.countDocuments({ status: 'active' }),
    Leave.countDocuments({ status: 'pending' }),
    Attendance.countDocuments({
      date: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lte: new Date(new Date().setHours(23, 59, 59, 999))
      },
      status: { $in: ['present', 'wfh', 'half-day'] }
    })
  ]);

  return res.json({
    totalEmployees,
    activeEmployees,
    pendingLeaves,
    todaysAttendance
  });
};
