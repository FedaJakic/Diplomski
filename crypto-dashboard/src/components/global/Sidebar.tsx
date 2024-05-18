// components/global/Sidebar.jsx
import React from 'react'

function Sidebar() {
  return (
    <div
      style={{
        width: '250px',
        minHeight: '100vh',
        background: '#f4f4f4',
        padding: '20px',
      }}
    >
      <h3>Sidebar Content</h3>
      <ul>
        <li>Link 1</li>
        <li>Link 2</li>
        <li>Link 3</li>
      </ul>
    </div>
  )
}

export default Sidebar
