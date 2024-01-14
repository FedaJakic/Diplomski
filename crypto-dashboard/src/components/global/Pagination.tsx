import React from 'react';
import { returnPaginationRange } from '../../util/helpers';
interface Props {
  totalPage: number;
  page: number;
  siblings: number;
  onPageChange: any;
}
const Pagination: React.FC<Props> = ({
  totalPage,
  page,
  siblings,
  onPageChange,
}) => {
  let transactionData = returnPaginationRange(totalPage, page, siblings);
  return (
    <ul className="pagination d-flex align-items-center justify-content-center">
      <li className="page-item">
        <a className="page-link" onClick={() => onPageChange('&laquo;')}>
          &laquo;
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" onClick={() => onPageChange('&lsaquo;')}>
          &lsaquo;
        </a>
      </li>
      {transactionData.map((transaction: any) => {
        if (transaction === page) {
          return (
            <li key={transaction} className="page-item">
              <a className="page-link active" onClick={() => onPageChange(transaction)}>
                {transaction}
              </a>
            </li>
          );
        } else
          return (
            <li key={transaction} className="page-item">
              <a className="page-link" onClick={() => onPageChange(transaction)}>
                {transaction}
              </a>
            </li>
          );
      })}
      <li className="page-item">
        <a className="page-link" onClick={() => onPageChange('&rsaquo;')}>
          &rsaquo;
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" onClick={() => onPageChange('&raquo;')}>
          &raquo;
        </a>
      </li>
    </ul>
  );
};
export default Pagination;
