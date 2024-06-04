import React from 'react'

interface SortDropdownProps {
  sortOption: string
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOption,
  onSortChange,
}) => {
  return (
    <select
      value={sortOption}
      onChange={onSortChange}
      className="form-control w-25"
    >
      <option value="rank_asc">Rank Ascending</option>
      <option value="rank_desc">Rank Descending</option>
    </select>
  )
}

export default SortDropdown
