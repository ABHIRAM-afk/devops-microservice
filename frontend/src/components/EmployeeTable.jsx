function formatCurrency(value) {
  return `₹${Math.round(Number(value || 0)).toLocaleString('en-IN')}`;
}

function EmployeeTable({
  employees,
  loading,
  error,
  departments,
  departmentFilter,
  onDepartmentFilterChange,
  onRetry,
  onEdit,
  onDelete,
}) {
  return (
    <div className="employee-table-card">
      <div className="employee-table-header">
        <h2>Employees</h2>
        <div className="table-controls">
          <label className="department-filter">
            <FilterIcon />
            <select
              value={departmentFilter}
              onChange={(e) => onDepartmentFilterChange(e.target.value)}
              aria-label="Filter by department"
            >
              <option value="">All departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="btn btn-ghost" onClick={onRetry}>
            <RefreshIcon />
            Refresh
          </button>
        </div>
      </div>

      {loading && (
        <div className="table-state">
          <span className="spinner" aria-hidden="true" />
          <p>Loading employees…</p>
        </div>
      )}

      {!loading && error && (
        <div className="table-state">
          <p className="table-state-title">Unable to connect to the employee service.</p>
          <p className="table-state-subtitle">Please check that the backend is running and try again.</p>
          <button type="button" className="btn btn-primary" onClick={onRetry}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && employees.length === 0 && (
        <div className="table-state">
          <p className="table-state-title">No employees found</p>
          <p className="table-state-subtitle">Try adjusting your search or filter, or add a new employee.</p>
        </div>
      )}

      {!loading && !error && employees.length > 0 && (
        <div className="table-scroll">
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Salary</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td data-label="ID">{employee.id}</td>
                  <td data-label="Name">
                    <div className="employee-name-cell">
                      <span className="avatar">{employee.name?.charAt(0)?.toUpperCase() || '?'}</span>
                      {employee.name}
                    </div>
                  </td>
                  <td data-label="Department">
                    <span className="dept-badge">{employee.department}</span>
                  </td>
                  <td data-label="Salary">{formatCurrency(employee.salary)}</td>
                  <td data-label="Actions" className="actions-col">
                    <div className="row-actions">
                      <button
                        type="button"
                        className="icon-btn edit"
                        onClick={() => onEdit(employee)}
                        aria-label={`Edit ${employee.name}`}
                      >
                        <EditIcon />
                      </button>
                      <button
                        type="button"
                        className="icon-btn delete"
                        onClick={() => onDelete(employee)}
                        aria-label={`Delete ${employee.name}`}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 4v6h-6M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16z" />
    </svg>
  );
}

export default EmployeeTable;
