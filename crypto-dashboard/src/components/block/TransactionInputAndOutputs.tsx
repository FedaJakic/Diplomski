import React from 'react';
import { Alert, Col, ListGroup, Row } from 'react-bootstrap';
import { TransactionInfo, TransactionOut } from '../../util/block/types';

interface Props {
  transactionInfos: any[] | undefined;
}

const TransactionInputAndOutputs: React.FC<Props> = ({ transactionInfos }) => {
  const sumTotalValue = (transactionOut: TransactionOut[]): String => {
    const totalValue = transactionOut.reduce(
      (sum, transaction) => sum + parseFloat(transaction.value),
      0
    );

    return totalValue.toString();
  };
  return (
    <>
      {transactionInfos &&
        transactionInfos?.map((transaction: TransactionInfo, index) => (
          <ListGroup key={index} className="my-3" style={{ boxShadow: 'none' }}>
            <ListGroup.Item className="text-center">
              {transaction?.transactionId}
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col style={{ maxWidth: '50%' }}>
                  <p>Number of inputs {transaction?.transactionIn.length}</p>
                  {transaction?.transactionIn.map((tIn, index) => (
                    <Alert key={tIn.txId + index} variant={'primary'}>
                      <p>{tIn?.txId}</p>
                    </Alert>
                  ))}
                </Col>
                <Col style={{ maxWidth: '50%' }}>
                  <p>Number of outputs {transaction?.transactionOut.length}</p>
                  {transaction?.transactionOut.map((tOut, index) => (
                    <Alert key={tOut.address + index} variant={'info'}>
                      <p>{tOut?.value} BTC</p>
                      <p>send to {tOut?.address}</p>
                    </Alert>
                  ))}
                </Col>
              </Row>
              <Row>
                <Alert key={`send ${index}`} variant={'success'}>
                  <p className="text-center">
                    Value Transacted:{' '}
                    {sumTotalValue(transaction.transactionOut)} BTC
                  </p>
                </Alert>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        ))}
    </>
  );
};

export default TransactionInputAndOutputs;
