export const lightTheme = {
  page: {
    display: "flex",
    gap: "1.5rem",
    padding: "1.5rem",
    boxSizing: "border-box",
    height: "100vh",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    background: "#f0f4ff",
    color: "#1a1a1a"
  },
  leftPanel: {
    width: "34%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1.5rem",
    borderRadius: 16,
    background: "#ffffff",
    border: "1px solid #d0d7ff",
    boxShadow: "0 10px 30px rgba(0, 86, 255, 0.1)",
    overflowY: "auto"
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  card: {
    padding: "16px",
    borderRadius: 16,
    background: "#ffffff",
    border: "1px solid #d0d7ff",
    boxShadow: "0 8px 20px rgba(0, 86, 255, 0.06)"
  },
  suggestBox: {
    padding: "16px",
    borderRadius: 16,
    background: "linear-gradient(90deg, #e6f0ff, #f9fbff)",
    border: "1px solid #b3c7ff",
    color: "#2a3dfd",
    fontWeight: 500
  },
  btn: {
    padding: "10px 16px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    background: "#2a3dfd",
    color: "#fff",
    fontWeight: 700,
    boxShadow: "0 6px 12px rgba(42, 61, 253, 0.3)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease"
  },
  ghostBtn: {
    padding: "8px 16px",
    borderRadius: 12,
    border: "2px solid #2a3dfd",
    background: "transparent",
    cursor: "pointer",
    color: "#2a3dfd",
    fontWeight: 600,
    transition: "background-color 0.3s ease, color 0.3s ease"
  },
  input: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1.5px solid #aabfff",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease"
  },
  inputFocus: {
    borderColor: "#2a3dfd",
    boxShadow: "0 0 8px rgba(42, 61, 253, 0.5)"
  },
  checkbox: {
    width: 20,
    height: 20,
    cursor: "pointer",
    accentColor: "#2a3dfd"
  },
  overdueBg: "#ffe7e7",
  dueSoonBg: "#fff9e5",
  fontColorSecondary: "#6b7280",
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.2)",
    padding: "24px",
    width: "400px",
    maxWidth: "90vw"
  }
};