import { useState } from 'react';

function EmployeeForm({ employee, departments, onCancel, onSubmit, submitting }) {
  const isEditing = Boolean(employee);

  const [name, setName] = useState(employee?.name || '');
  const [department, setDepartment] = useState(employee?.department || '');
  const [salary, setSalary] = useState(employee?.salary ?? '');
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = 'Name is required.';
    if (!department.trim()) nextErrors.department = 'Department is required.';
    if (salary === '' || salary === null) {
      nextErrors.salary = 'Salary is required.';
    } else if (Number.isNaN(Number(salary)) || Number(salary) <= 0) {
      nextErrors.salary = 'Salary must be greater than 0.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      name: name.trim(),
      department: department.trim(),
      salary: Number(salary),
    });
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onCancel}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="employee-form-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="employee-form-title">{isEditing ? 'Edit Employee' : 'Add Employee'}</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="employee-name">Name</label>
            <input
              id="employee-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              autoFocus
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="employee-department">Department</label>
            <input
              id="employee-department"
              type="text"
              list="department-options"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g. Engineering"
            />
            <datalist id="department-options">
              {departments.map((dept) => (
                <option key={dept} value={dept} />
              ))}
            </datalist>
            {errors.department && <p className="field-error">{errors.department}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="employee-salary">Salary (₹)</label>
            <input
              id="employee-salary"
              type="number"
              min="1"
              step="any"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter salary"
            />
            {errors.salary && <p className="field-error">{errors.salary}</p>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving…' : isEditing ? 'Save Changes' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
