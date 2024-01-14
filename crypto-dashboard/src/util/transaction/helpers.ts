import { TransactionOut } from './types';

export const sumTotalValue = (transactionOut: TransactionOut[]): String => {
  const totalValue = transactionOut.reduce(
    (sum, transaction) => sum + parseFloat(transaction.value),
    0
  );

  return totalValue.toString();
};
