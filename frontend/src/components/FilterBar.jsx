const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

// Used on the Neighborhood list page
export function NameStateFilter({ nameFilter, onNameChange, stateFilter, onStateChange }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by name"
        value={nameFilter}
        onChange={(e) => onNameChange(e.target.value)}
        aria-label="Filter by name"
      />
      <select
        value={stateFilter}
        onChange={(e) => onStateChange(e.target.value)}
        aria-label="Filter by state"
      >
        <option value="">All states</option>
        {US_STATES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}

// Used on the Property detail page
export function ValueSortToggle({ sortDirection, onToggle }) {
  return (
    <button type="button" className="sort-toggle" onClick={onToggle}>
      Value {sortDirection === "desc" ? "high → low" : "low → high"}
      <span aria-hidden="true">{sortDirection === "desc" ? " ↓" : " ↑"}</span>
    </button>
  );
}

export { US_STATES };