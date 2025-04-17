export interface CreateTransferModel {
    fromAccountCode: string;
    toAccountCode: string;
    channel: string;
    amount: number;
}