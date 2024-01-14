import React, { useEffect, useState } from 'react';
import TransactionInformations from '../components/transaction/TransactionInformations';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { TransactionUrlsApi } from '../api/transaction';
import TransactionInputAndOutputs from '../components/transaction/TransactionInputAndOutputs';
import { TransactionInfo } from '../util/transaction/types';
import OneTransactionDetail from '../components/transaction/OneTransactionDetail';

export interface TransactionDetails {
  transactionId: string;
  transactionHash: string;
  transactionHeight: string;
  transactionBlockHash: string;
  transactionConfirmations: number;
  transactionRecieved: number;
  transactionFee: number;
}

const Transaction = () => {
  const { transactionId } = useParams();

  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetails>();
  const [transactionsInfos, setTransactionsInfos] = useState<TransactionInfo>();

  useEffect(() => {
    transactionId &&
      TransactionUrlsApi.getTransactionInfo({ transactionId })
        .then((res) => {
          setTransactionDetails({
            transactionId: res.transactionId,
            transactionHash: res.transactionHash,
            transactionHeight: res.transactionHeight,
            transactionBlockHash: res.transactionBlockHash,
            transactionConfirmations: res.transactionConfirmations,
            transactionRecieved: res.transactionRecieved,
            transactionFee: res.transactionFee,
          });
          setTransactionsInfos({
            transactionId: res.transactionId,
            transactionIn: res.transactionIn,
            transactionOut: res.transactionOut,
          });
        })
        .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {transactionDetails && transactionsInfos && (
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <Row>
            <TransactionInformations
              transactionInfo={transactionDetails}
              transactionInputsAndOutputs={transactionsInfos}
            />
          </Row>
          <Row className="w-100">
            <OneTransactionDetail transactionInfos={[transactionsInfos]} />
          </Row>
        </Container>
      )}
    </>
  );
};

export default Transaction;
