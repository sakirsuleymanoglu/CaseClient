export interface TransactionModel {
    id: string;
    channel: string;
    type: string;
    amount: number;
    balance: number;
    updatedBalance: number;
    description: string;
    createdDate: string;
}