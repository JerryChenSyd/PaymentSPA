export interface IPaymentInfo {
    transactionID: number;
    bSB: string;
    accountNo: number;
    accountName: string;
    reference: string;
    amount: string;
    dateTime: Date;
}