export interface JsonDataProps {
    accountName: string;
    accountNo: string;
    acqId: string;
    addInfo: string;
    amount: string;
}

export interface FileAndAmountInputsProps {
    setImage: (file: File | null) => void;
    parsedAmount: string;
    amount: string|number;
    setAmount: (value: string) => void;
}

export interface VietQRResponse {
    "code": string;
    "desc": string;
    "data": {
        "qrCode": string
        "qrDataURL": string;
    };
}

export interface VietQrDataSent {
    accountName:string;
    accountNo:string;
    acqId:string;
    addInfo:string;
    amount:string;
    format:string;
    template:string;
}