import { useEffect, useMemo, useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import EmployeeTable from './components/EmployeeTable';
import EmployeeForm from './components/EmployeeForm';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from './services/employeeService';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getEmployees();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const departments = useMemo(
      () => [...new Set(employees.map((e) => e.department).filter(Boolean))].sort(),
      [employees]
  );

  const filteredEmployees = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return employees.filter((employee) => {
      const matchesSearch =
          !term ||
          employee.name?.toLowerCase().includes(term) ||
          employee.department?.toLowerCase().includes(term);
      const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
      return matchesSearch && matchesDepartment;
    });
  }, [employees, searchTerm, departmentFilter]);

  function handleAddClick() {
    setEditingEmployee(null);
    setFormOpen(true);
  }

  function handleEditClick(employee) {
    setEditingEmployee(employee);
    setFormOpen(true);
  }

  function handleFormCancel() {
    setFormOpen(false);
    setEditingEmployee(null);
  }

  async function handleFormSubmit(values) {
    setFormSubmitting(true);
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, values);
        showToast('Employee updated successfully.');
      } else {
        await createEmployee(values);
        showToast('Employee added successfully.');
      }
      setFormOpen(false);
      setEditingEmployee(null);
      await loadEmployees();
    } catch (err) {
      showToast('Something went wrong while saving the employee.', 'error');
    } finally {
      setFormSubmitting(false);
    }
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteEmployee(pendingDelete.id);
      showToast('Employee deleted successfully.');
      setPendingDelete(null);
      await loadEmployees();
    } catch (err) {
      showToast('Unable to delete employee. Please try again.', 'error');
    } finally {
      setDeleting(false);
    }
  }

  return (
      <div className="app-shell">
        <Sidebar activeView={activeView} onNavigate={setActiveView} />

        <div className="main-column">
          <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} onAddClick={handleAddClick} />

          <main className="main-content">
            {activeView === 'settings' ? (
                <div className="settings-placeholder">
                  <h2>Settings</h2>
                  <p>Settings for this portal aren't configured yet.</p>
                </div>
            ) : (
                <>
                  <SummaryCards employees={employees} />
                  <EmployeeTable
                      employees={filteredEmployees}
                      loading={loading}
                      error={error}
                      departments={departments}
                      departmentFilter={departmentFilter}
                      onDepartmentFilterChange={setDepartmentFilter}
                      onRetry={loadEmployees}
                      onEdit={handleEditClick}
                      onDelete={setPendingDelete}
                  />
                </>
            )}
          </main>
        </div>

        {formOpen && (
            <EmployeeForm
                employee={editingEmployee}
                departments={departments}
                onCancel={handleFormCancel}
                onSubmit={handleFormSubmit}
                submitting={formSubmitting}
            />
        )}

        {pendingDelete && (
            <ConfirmDialog
                title="Delete Employee"
                message={`Are you sure you want to delete ${pendingDelete.name}? This action cannot be undone.`}
                confirmLabel="Delete"
                danger
                submitting={deleting}
                onConfirm={handleConfirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        )}

        <Toast message={toast?.message} type={toast?.type} />
      </div>
  );
}

export default App;
