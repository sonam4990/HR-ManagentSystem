import { useEffect, useState } from 'react';
import api from '../api/client';

const LeavesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    employee: '',
    leaveType: 'casual',
    fromDate: '',
    toDate: '',
    reason: ''
  });

  const load = async () => {
    const [empRes, leaveRes] = await Promise.all([api.get('/employees'), api.get('/leaves')]);
    setEmployees(empRes.data);
    setLeaves(leaveRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const apply = async (e) => {
    e.preventDefault();
    await api.post('/leaves', form);
    setForm({ employee: '', leaveType: 'casual', fromDate: '', toDate: '', reason: '' });
    load();
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/leaves/${id}/status`, { status });
    load();
  };

  return (
    <div>
      <div className="card">
        <h3>Apply Leave</h3>
        <form className="grid-form" onSubmit={apply}>
          <select value={form.employee} onChange={(e) => setForm({ ...form, employee: e.target.value })} required>
            <option value="">Select employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.fullName}
              </option>
            ))}
          </select>
          <select value={form.leaveType} onChange={(e) => setForm({ ...form, leaveType: e.target.value })}>
            <option value="casual">Casual</option>
            <option value="sick">Sick</option>
            <option value="earned">Earned</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <input type="date" value={form.fromDate} onChange={(e) => setForm({ ...form, fromDate: e.target.value })} required />
          <input type="date" value={form.toDate} onChange={(e) => setForm({ ...form, toDate: e.target.value })} required />
          <input placeholder="Reason" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} required />
          <button>Apply</button>
        </form>
      </div>
      <div className="card">
        <h3>Leave Requests</h3>
        <ul>
          {leaves.map((leave) => (
            <li key={leave._id}>
              {leave.employee?.fullName} ({leave.leaveType}) {leave.status}
              <button onClick={() => updateStatus(leave._id, 'approved')}>Approve</button>
              <button onClick={() => updateStatus(leave._id, 'rejected')}>Reject</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeavesPage;
