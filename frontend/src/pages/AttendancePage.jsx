import { useEffect, useState } from 'react';
import api from '../api/client';

const AttendancePage = () => {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ employee: '', date: '', status: 'present' });

  const load = async () => {
    const [empRes, attendanceRes] = await Promise.all([api.get('/employees'), api.get('/attendance')]);
    setEmployees(empRes.data);
    setRecords(attendanceRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await api.post('/attendance', form);
    setForm({ employee: '', date: '', status: 'present' });
    load();
  };

  return (
    <div>
      <div className="card">
        <h3>Mark Attendance</h3>
        <form className="grid-form" onSubmit={save}>
          <select value={form.employee} onChange={(e) => setForm({ ...form, employee: e.target.value })} required>
            <option value="">Select employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.fullName}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="wfh">WFH</option>
            <option value="half-day">Half Day</option>
          </select>
          <button>Save</button>
        </form>
      </div>

      <div className="card">
        <h3>Attendance Records</h3>
        <ul>
          {records.map((record) => (
            <li key={record._id}>
              {record.employee?.fullName} - {new Date(record.date).toLocaleDateString()} - {record.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AttendancePage;
