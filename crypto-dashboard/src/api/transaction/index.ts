import { axiosClient } from '..';
import { API_URL } from '../../util/env';

const TransactionUrls = {
  getTransactionInfo: `${API_URL.api_url}/api/transactions/transaction-info`,
};

export const TransactionUrlsApi = {
  getTransactionInfo: async ({ transactionId }: { transactionId: string }) =>
    axiosClient
      .post(TransactionUrls.getTransactionInfo, { transactionId })
      .then((res) => res.data),
};
