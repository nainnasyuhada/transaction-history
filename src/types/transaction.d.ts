export interface Transaction {
    id: string;
    amount: number;
    date: number;
    description: string;
    type: 'debit' | 'credit';
  }