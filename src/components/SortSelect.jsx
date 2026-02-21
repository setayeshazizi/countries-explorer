import React from "react";

function SortSelect({ sort, setSort }) {
  return (
    <div className="controls">
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="none">Sort by population</option>
        <option value="asc">Population: Smallest First</option>
        <option value="desc">Population: Largest First</option>
      </select>
    </div>
  );
}

export default SortSelect;
