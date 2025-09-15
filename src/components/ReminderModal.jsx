function ReminderModal({ task, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, width: "100vw", height: "100vh",
        backgroundColor: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(3px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reminder-modal-title"
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 24,
          maxWidth: "400px",
          width: "90%",
          boxShadow: "0 12px 28px rgba(0,0,0,0.25)"
        }}
        onClick={e => e.stopPropagation()}
      >
        <h2 id="reminder-modal-title" style={{ marginTop: 0, marginBottom: 16 }}>Task Reminder</h2>
        <p>{task.text}</p>
        <button onClick={onClose} style={{ backgroundColor: '#2a3dfd', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 12, cursor: 'pointer' }}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ReminderModal;