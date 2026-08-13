function formatCurrency(value) {
  return `₹${Math.round(value).toLocaleString('en-IN')}`;
}

function SummaryCards({ employees }) {
  const totalEmployees = employees.length;
  const departmentCount = new Set(employees.map((e) => e.department)).size;
  const averageSalary =
    totalEmployees === 0
      ? 0
      : employees.reduce((sum, e) => sum + Number(e.salary || 0), 0) / totalEmployees;

  const cards = [
    {
      key: 'total',
      label: 'Total Employees',
      value: totalEmployees,
      icon: <PeopleIcon />,
      tone: 'blue',
    },
    {
      key: 'departments',
      label: 'Departments',
      value: departmentCount,
      icon: <BuildingIcon />,
      tone: 'green',
    },
    {
      key: 'salary',
      label: 'Average Salary',
      value: formatCurrency(averageSalary),
      icon: <RupeeIcon />,
      tone: 'purple',
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div key={card.key} className={`summary-card tone-${card.tone}`}>
          <div className="summary-card-icon">{card.icon}</div>
          <div>
            <p className="summary-card-label">{card.label}</p>
            <p className="summary-card-value">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 22v-4h6v4M9 6h.01M9 10h.01M9 14h.01M15 6h.01M15 10h.01M15 14h.01" />
    </svg>
  );
}

function RupeeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3h12M6 8h12M6 3c3.5 0 6 1.5 6 5s-2.5 5-6 5h-1l7 8" />
    </svg>
  );
}

export default SummaryCards;
