import React from 'react';
import { Alert, Col, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TransactionInfo, TransactionOut } from '../../util/transaction/types';
import { sumTotalValue } from '../../util/transaction/helpers';
import { isObjectEmpty } from '../../util/helpers';

interface Props {
  transactionInfos: any[] | undefined;
}

const TransactionInputAndOutputs: React.FC<Props> = ({ transactionInfos }) => {
  return (
    <>
      {transactionInfos &&
        transactionInfos?.map((transaction: TransactionInfo, index) => (
          <ListGroup key={index} className="my-3" style={{ boxShadow: 'none' }}>
            <ListGroup.Item active className="text-center">
              <Link
                to={`/transaction/${transaction.transactionId}`}
                style={{ color: '#fff', textDecoration: 'none' }}
              >
                {transaction?.transactionId}
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col style={{ maxWidth: '50%' }}>
                  <p>Number of inputs {transaction?.transactionIn.length}</p>
                  {transaction?.transactionIn.map((tIn, index) => (
                    <Alert key={tIn.txId + index} variant={'primary'}>
                      <p
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {isObjectEmpty(tIn) || tIn.txId === undefined ? (
                          'From Block Reward'
                        ) : (
                          <Link
                            to={`/transaction/${tIn.txId}`}
                            style={{ textDecoration: 'none' }}
                          >
                            {tIn?.txId}
                          </Link>
                        )}
                      </p>
                    </Alert>
                  ))}
                </Col>
                <Col style={{ maxWidth: '50%' }}>
                  <p>Number of outputs {transaction?.transactionOut.length}</p>
                  {transaction?.transactionOut.map((tOut, index) => (
                    <Alert key={tOut.address + index} variant={'info'}>
                      <p>{tOut?.value} BTC</p>
                      <p
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {parseFloat(tOut?.value) === 0
                          ? 'Null Data Transaction'
                          : `send to ${tOut?.address}`}
                      </p>
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
