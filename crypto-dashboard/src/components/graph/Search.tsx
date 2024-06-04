import React from 'react'

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <input
      type="text"
      placeholder="Search by name or code"
      value={searchQuery}
      onChange={onSearchChange}
      className="form-control w-25"
    />
  )
}

export default SearchBar
