import Attendance from '../models/Attendance.js';

export const markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findOneAndUpdate(
      { employee: req.body.employee, date: req.body.date },
      req.body,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.status(201).json(attendance);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAttendance = async (req, res) => {
  const query = {};
  if (req.query.employeeId) query.employee = req.query.employeeId;
  if (req.query.date) query.date = req.query.date;

  const records = await Attendance.find(query)
    .populate('employee', 'employeeCode fullName department')
    .sort({ date: -1 });

  return res.json(records);
};
