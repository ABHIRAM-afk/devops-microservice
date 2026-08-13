function Toast({ message, type = 'success' }) {
  if (!message) return null;

  return (
    <div className={`toast toast-${type}`} role="status">
      {type === 'success' ? <CheckIcon /> : <AlertIcon />}
      <span>{message}</span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

export default Toast;
