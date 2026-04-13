import Leave from '../models/Leave.js';

export const applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create(req.body);
    return res.status(201).json(leave);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getLeaves = async (_req, res) => {
  const leaves = await Leave.find()
    .populate('employee', 'employeeCode fullName department')
    .sort({ createdAt: -1 });
  return res.json(leaves);
};

export const updateLeaveStatus = async (req, res) => {
  const leave = await Leave.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, reviewerComment: req.body.reviewerComment },
    { new: true, runValidators: true }
  );

  if (!leave) return res.status(404).json({ message: 'Leave request not found' });
  return res.json(leave);
};
