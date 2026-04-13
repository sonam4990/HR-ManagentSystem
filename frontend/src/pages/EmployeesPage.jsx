import { useEffect, useState } from 'react';
import api from '../api/client';

const initial = {
  employeeCode: '',
  fullName: '',
  email: '',
  department: '',
  designation: '',
  dateOfJoining: ''
};

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(initial);

  const loadEmployees = async () => {
    const { data } = await api.get('/employees');
    setEmployees(data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const addEmployee = async (e) => {
    e.preventDefault();
    await api.post('/employees', form);
    setForm(initial);
    loadEmployees();
  };

  const deleteEmployee = async (id) => {
    await api.delete(`/employees/${id}`);
    loadEmployees();
  };

  return (
    <div>
      <div className="card">
        <h3>Add Employee</h3>
        <form className="grid-form" onSubmit={addEmployee}>
          {Object.keys(initial).map((field) => (
            <input
              key={field}
              type={field === 'dateOfJoining' ? 'date' : 'text'}
              placeholder={field}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              required
            />
          ))}
          <button>Add</button>
        </form>
      </div>

      <div className="card">
        <h3>Employee List</h3>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.employeeCode}</td>
                <td>{emp.fullName}</td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>
                  <button onClick={() => deleteEmployee(emp._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesPage;
