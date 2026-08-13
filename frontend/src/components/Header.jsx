function Header({ searchTerm, onSearchChange, onAddClick }) {
  return (
    <header className="page-header">
      <div className="page-header-text">
        <h1>Employee Management</h1>
        <p>Manage your organization's employees efficiently</p>
      </div>

      <div className="page-header-actions">
        <div className="search-box">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search by name or department..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search employees"
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={onAddClick}>
          <PlusIcon />
          Add Employee
        </button>
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default Header;
