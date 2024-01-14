export interface BlockInfo {
  blockHash: string;
  blockHeight: string;
  blockRecieved: string;
  totalBTCTransacted: string;
  totalFees: string;
  totalTransactions: string;
}

export interface TransactionInfo {
  transactionId: string;
  transactionIn: TranactionIn[];
  transactionOut: TransactionOut[];
}

interface TranactionIn {
  txId: string;
}

export interface TransactionOut {
  value: string;
  address: string;
}
