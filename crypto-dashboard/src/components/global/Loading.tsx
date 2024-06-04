import React from 'react'
import { Spinner } from 'react-bootstrap'
// import './loading.module.css'

const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: 'calc(100vh - 131px)' }}
    >
      <Spinner animation="grow" variant="primary" />
    </div>
  )
}

export default Loading
