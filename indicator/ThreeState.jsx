const SORT_STATES = {
  ASC: "asc",
  NONE: "none",
  DESC: "desc",
};

export default function ThreeState({ value, onChange }) {
  const states = [
    SORT_STATES.ASC,
    SORT_STATES.NONE,
    SORT_STATES.DESC,
  ];

  const colors = {
    asc: "green",
    none: "gold",
    desc: "red",
  };

  const titles = {
    asc: "Ascending",
    none: "None",
    desc: "Descending",
  };

  const currentIndex = states.indexOf(value);

  return (
    <div
      className="sort-indicator"
      title={`Sort: ${titles[value]}`}
      style={{
        "--sort-color": colors[value],
      }}
    >
      <input
        type="range"
        min="0"
        max="2"
        step="1"
        value={currentIndex}
        onChange={(e) => {
          onChange(states[Number(e.target.value)]);
        }}
        aria-label={`Sort: ${titles[value]}`}
      />

      <div className="sort-ticks">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}``