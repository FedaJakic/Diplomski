import React, { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Row, Pagination } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BasicBlockHeightInfo from '../components/block/BasicBlockHeightInfo';
import { BlockInfo } from '../util/block/types';
import TransactionInputAndOutputs from '../components/transaction/TransactionInputAndOutputs';
import { BlockUrlsApi } from '../api/block';
import { TransactionInfo } from '../util/transaction/types';

const BlockInformation: React.FC = () => {
  const { blockHeight } = useParams();
  const [blockInfo, setBlockInfo] = useState<BlockInfo>();
  const [transactionsInfos, setTransactionsInfos] =
    useState<TransactionInfo[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;
  const transactionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    blockHeight &&
      BlockUrlsApi.getBlockInfo({ blockHeight })
        .then((res) => {
          setBlockInfo({
            blockHash: res.hash,
            blockHeight: res.height,
            blockRecieved: res.time,
            totalBTCTransacted: res.totalSent,
            totalFees: res.totalFees,
            totalTransactions: res.transactions,
          });
          setTransactionsInfos(res.transactionInfos);
        })
        .catch((err) => console.log(err));
  }, [blockHeight]);

  useEffect(() => {
    if (transactionsRef.current) {
      transactionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const getCurrentTransactions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return transactionsInfos && transactionsInfos.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {blockInfo && (
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <Row>
            {blockHeight && (
              <BasicBlockHeightInfo
                blockHeight={blockInfo.blockHeight}
                blockRecieved={blockInfo.blockRecieved}
                totalBTCTransacted={blockInfo.totalBTCTransacted}
                totalFees={blockInfo.totalFees}
                totalTransactions={blockInfo.totalTransactions}
                blockHash={blockInfo.blockHash}
              />
            )}
            <hr className="my-3" />
            <h4 ref={transactionsRef} className="text-center">
              Transactions
            </h4>
            {transactionsInfos && (
              <>
                <TransactionInputAndOutputs
                  transactionInfos={getCurrentTransactions()}
                />
                <Pagination
                  className="mt-3 d-flex justify-content-center"
                  size="sm"
                >
                  {[
                    ...Array(
                      Math.ceil(transactionsInfos.length / itemsPerPage)
                    ),
                  ].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </>
            )}
          </Row>
        </Container>
      )}
    </>
  );
};

export default BlockInformation;
