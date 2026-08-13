function ConfirmDialog({ title, message, confirmLabel = 'Confirm', onConfirm, onCancel, danger, submitting }) {
  return (
    <div className="modal-overlay" role="presentation" onClick={onCancel}>
      <div
        className="modal-panel modal-panel-small"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-dialog-title">{title}</h2>
        <p className="confirm-message">{message}</p>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
          <button
            type="button"
            className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
            disabled={submitting}
          >
            {submitting ? 'Please wait…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
