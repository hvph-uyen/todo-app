function AppNameLogo({ theme }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        paddingBottom: 20,
        userSelect: "none",
        color: theme.page.color
      }}
    >
      <img
        src="/logo.png"
        alt="App logo"
        style={{ width: 48, height: 48, borderRadius: 12 }}
      />
      <h1 style={{ margin: 0, fontSize: 24, color: theme.btn.background, userSelect: "none" }}>
        TaskFlow
      </h1>
    </div>
  );
}

export default AppNameLogo;