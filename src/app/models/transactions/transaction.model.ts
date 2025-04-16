export interface TransactionModel {
    channel: string;
    balance: number;
    updatedBalance: number;
    createdDate: string;
    id: string;
    accountId: string;
    amount: number;
    type: string;
    description: string;
}