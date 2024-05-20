import React from 'react'
import { Col, Row } from 'react-bootstrap'
import BlockSVG from '../svg/BlockSVG'
import TimeSVG from '../svg/TimeSVG'
import BitcoinSVG from '../svg/BitcoinSVG'
import FeeSVG from '../svg/FeeSVG'
import TotalTransactionsSVG from '../svg/TotalTransactionsSVG'
import {
  calculateTimeBasedOnTimestamp,
  satoshisToBTC,
} from '../../util/helpers/helpers'
import { TransactionDetails } from '../../pages/Transaction'
import ConfirmationSVG from '../svg/CnfirmationSVG'
import { TransactionInfo } from '../../util/transaction/types'
import { sumTotalValue } from '../../util/transaction/helpers'

interface Props {
  transactionInfo: TransactionDetails
  transactionInputsAndOutputs: TransactionInfo
}

const TransactionInformations: React.FC<Props> = ({
  transactionInfo,
  transactionInputsAndOutputs,
}) => {
  return (
    <>
      {console.log(transactionInfo)}
      <h4 className="my-4 text-center">{transactionInfo.transactionId}</h4>
      <Row className="my-4 text-center">
        <Col>
          <BlockSVG />
          <h4 className="text-center">{transactionInfo.transactionHeight}</h4>
          <h6 className="text-center m-2">Transaction block hash</h6>
          <h4 className="text-center">
            {transactionInfo.transactionBlockHash}
          </h4>
        </Col>
      </Row>
      <Row>
        <hr className="mb-4" />
        <Col className="mx-5">
          <TimeSVG />
          <h6 className="text-center m-2">CONFIRMATION</h6>
          <h4 className="text-center">
            {calculateTimeBasedOnTimestamp(transactionInfo.transactionRecieved)}
          </h4>
        </Col>
        <Col className="mx-5">
          <BitcoinSVG />
          <h6 className="text-center m-2">TOTAL TRANSACTED</h6>
          <h4 className="text-center">
            {sumTotalValue(transactionInputsAndOutputs.transactionOut)} BTC
          </h4>
        </Col>
        <Col className="mx-5">
          <FeeSVG />
          <h6 className="text-center m-2">TOTAL FEES</h6>
          <h4 className="text-center">
            {transactionInfo.transactionFee === undefined
              ? '0.0 BTC'
              : `${transactionInfo.transactionFee} BTC`}
          </h4>
        </Col>
        <Col className="mx-5">
          <ConfirmationSVG />
          <h6 className="text-center m-2">CONFIRMATIONS</h6>
          <h4 className="text-center">
            {transactionInfo.transactionConfirmations}
          </h4>
        </Col>
      </Row>
    </>
  )
}

export default TransactionInformations
