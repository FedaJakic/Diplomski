import React from 'react'
import ValuePicker from '../../components/conversion/ValuePicker'

const Conversion = () => {
  return (
    <div
      className="mt-4 d-flex flex-column justify-content-center align-items-center"
      style={{ height: '80vh' }}
    >
      <h1>Crypto conversion</h1>

      <ValuePicker />
    </div>
  )
}

export default Conversion
