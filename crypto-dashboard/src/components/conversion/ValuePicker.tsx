import React, { useState } from 'react'
import { Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'
import { CurrenciesList } from '../../util/coinTypes'
import styles from './valuePicker.module.css'
import { ConversionUrlsApi } from '../../api/conversion'

const ValuePicker: React.FC = () => {
  const [currencyPickFrom, setCurrencyPickFrom] = useState<string>('---')
  const [currencyPickTo, setCurrencyPickTo] = useState<string>('---')
  const [value, setValue] = useState<number>(0.0)
  const [convertedValue, setConvertedValue] = useState<number>(0.0)

  const handleConversion = async () => {
    try {
      const convert = await ConversionUrlsApi.convertCurrencies({
        currencyFrom: currencyPickFrom,
        currencyTo: currencyPickTo,
        value: value,
      })
      setConvertedValue(convert.convertedValue)

      console.log(convert)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="m-4 d-flex justify-content-center align-items-center">
        <div className="mx-4">
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title="Currency From"
              id="input-group-dropdown-1"
            >
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {CurrenciesList.map((currencie, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setCurrencyPickFrom(currencie.shortName)}
                  >
                    {currencie.name} | {currencie.shortName}
                  </Dropdown.Item>
                ))}
              </div>
            </DropdownButton>
            <Form.Control
              placeholder="0.0"
              type="number"
              min={0}
              onChange={(e) => setValue(parseFloat(e.target.value))}
            />
            <InputGroup.Text
              className="d-flex justify-content-center align-items-center"
              style={{
                minWidth: '80px',
              }}
            >
              {currencyPickFrom}
            </InputGroup.Text>
          </InputGroup>
        </div>

        <div className="mx-4">
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              title="Currency To"
              id="input-group-dropdown-1"
            >
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {CurrenciesList.map((currencie, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setCurrencyPickTo(currencie.shortName)}
                  >
                    {currencie.name} | {currencie.shortName}
                  </Dropdown.Item>
                ))}
              </div>
            </DropdownButton>
          </InputGroup>
        </div>
      </div>
      <button className={styles.button} onClick={handleConversion}>
        Convert
      </button>
      <div className="d-flex justify-content-center align-items-center">
        <Form.Control
          className="my-4"
          style={{
            width: '250px',
          }}
          value={convertedValue}
          disabled
        />
        <InputGroup.Text
          className="d-flex justify-content-center align-items-center"
          style={{
            minWidth: '80px',
          }}
        >
          {currencyPickTo}
        </InputGroup.Text>
      </div>
    </>
  )
}

export default ValuePicker
