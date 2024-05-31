import React from 'react'
import { Row, Image, Col } from 'react-bootstrap'

interface Props {
  name: string
  shortName: string
  image: string
}

const CoinInfo: React.FC<Props> = ({ name, shortName, image }) => {
  return (
    <div>
      <Row>
        <Row className="d-flex justify-content-center align-items-center">
          <Image
            src={image}
            roundedCircle
            style={{ width: '60px', height: '35px' }}
          />
          <Col className="d-flex flex-column align-items-start">
            <span className="fw-bolder">{shortName}</span>
            <span>{name}</span>
          </Col>
        </Row>
      </Row>
    </div>
  )
}

export default CoinInfo
