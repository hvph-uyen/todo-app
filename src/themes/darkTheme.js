import { lightTheme } from './lightTheme';

export const darkTheme = {
  page: {
    ...lightTheme.page,
    background: "#121212",
    color: "#e0e0e0"
  },
  leftPanel: {
    ...lightTheme.leftPanel,
    background: "#1e1e1e",
    border: "1px solid #333"
  },
  rightPanel: {
    ...lightTheme.rightPanel
  },
  card: {
    ...lightTheme.card,
    background: "#1e1e1e",
    border: "1px solid #333",
    boxShadow: "0 8px 20px rgba(255, 255, 255, 0.06)"
  },
  suggestBox: {
    ...lightTheme.suggestBox,
    background: "linear-gradient(90deg, #2a2a72, #1e3799)",
    border: "1px solid #444",
    color: "#aad4ff"
  },
  btn: {
    ...lightTheme.btn,
    background: "#6799ff",
    boxShadow: "0 6px 12px rgba(103, 153, 255, 0.5)"
  },
  ghostBtn: {
    ...lightTheme.ghostBtn,
    color: "#6799ff",
    border: "2px solid #6799ff"
  },
  input: {
    ...lightTheme.input,
    border: "1.5px solid #555",
    backgroundColor: "#222",
    color: "#e0e0e0"
  },
  inputFocus: {
    borderColor: "#6799ff",
    boxShadow: "0 0 8px rgba(103, 153, 255, 0.75)"
  },
  checkbox: {
    ...lightTheme.checkbox,
    accentColor: "#6799ff"
  },
  overdueBg: "#552222",
  dueSoonBg: "#554422",
  fontColorSecondary: "#aaa",
  modalOverlay: {
    ...lightTheme.modalOverlay,
    backgroundColor: "rgba(0,0,0,0.85)"
  },
  modalContent: {
    ...lightTheme.modalContent,
    backgroundColor: "#222"
  }
};