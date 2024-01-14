import { Tracing } from 'trace_events';

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
  scriptPubKey: ScriptPubKey;
}

export interface ScriptPubKey {
  address: string;
  asm: string;
  desc: string;
  hex: string;
  type: string;
}
