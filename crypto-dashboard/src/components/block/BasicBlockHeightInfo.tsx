import React from 'react';
import { Col, Row } from 'react-bootstrap';
import BlockSVG from '../svg/BlockSVG';
import TimeSVG from '../svg/TimeSVG';
import BitcoinSVG from '../svg/BitcoinSVG';
import FeeSVG from '../svg/FeeSVG';
import TotalTransactionsSVG from '../svg/TotalTransactionsSVG';
import {
  calculateTimeBasedOnTimestamp,
  satoshisToBTC,
} from '../../util/helpers';

interface Props {
  blockHeight: string;
  blockRecieved: string;
  totalBTCTransacted: string;
  totalFees: string;
  totalTransactions: string;
  blockHash: string;
}

const BasicBlockHeightInfo: React.FC<Props> = ({
  blockHeight,
  blockRecieved,
  totalBTCTransacted,
  totalFees,
  totalTransactions,
  blockHash,
}) => {
  return (
    <>
      <h4 className="my-4 text-center">{blockHash}</h4>
      <Row className="my-4 text-center">
        <Col>
          <BlockSVG />
          <h6 className="text-center m-2">HEIGHT</h6>
          <h4 className="text-center">{blockHeight}</h4>
        </Col>
      </Row>
      <Row>
        <hr className="mb-4" />
        <Col className="mx-5">
          <TimeSVG />
          <h6 className="text-center m-2">RECEIVED</h6>
          <h4 className="text-center">
            {calculateTimeBasedOnTimestamp(parseInt(blockRecieved))}
          </h4>
        </Col>
        <Col className="mx-5">
          <BitcoinSVG />
          <h6 className="text-center m-2">TOTAL TRANSACTED</h6>
          <h4 className="text-center">
            {satoshisToBTC(parseInt(totalBTCTransacted))}
          </h4>
        </Col>
        <Col className="mx-5">
          <FeeSVG />
          <h6 className="text-center m-2">TOTAL FEES</h6>
          <h4 className="text-center">{satoshisToBTC(parseInt(totalFees))}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <TotalTransactionsSVG />
          <h6 className="text-center m-2">TOTAL TRANSACTIONS</h6>
          <h4 className="text-center">{totalTransactions}</h4>
        </Col>
      </Row>
    </>
  );
};

export default BasicBlockHeightInfo;
