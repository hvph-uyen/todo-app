function FilterBar({ currentFilter, setFilter, theme }) {
  const FILTERS = ["All", "Upcoming", "Finished"];
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        justifyContent: "center",
        paddingBottom: 8,
        userSelect: "none"
      }}
    >
      {FILTERS.map(f => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          aria-pressed={currentFilter === f}
          style={{
            padding: "10px 16px",
            borderRadius: 999,
            border: currentFilter === f ? `2px solid ${theme.btn.background}` : "2px solid transparent",
            background: currentFilter === f ? theme.suggestBox.background : "transparent",
            cursor: "pointer",
            fontWeight: currentFilter === f ? 700 : 500,
            color: currentFilter === f ? theme.btn.background : theme.fontColorSecondary,
            transition: "background-color 0.3s ease, border-color 0.3s ease"
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;