import { useEffect, useState } from 'react';
import api from '../api/client';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard').then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="grid">
      <div className="card">
        <h4>Total Employees</h4>
        <p>{stats.totalEmployees}</p>
      </div>
      <div className="card">
        <h4>Active Employees</h4>
        <p>{stats.activeEmployees}</p>
      </div>
      <div className="card">
        <h4>Pending Leaves</h4>
        <p>{stats.pendingLeaves}</p>
      </div>
      <div className="card">
        <h4>Today's Attendance</h4>
        <p>{stats.todaysAttendance}</p>
      </div>
    </div>
  );
};

export default DashboardPage;
