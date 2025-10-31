export interface VietQRRequest {
    accountNo: string;
    accountName: string;
    acqId: string;
    amount?: string;
    addInfo?: string;
}

export interface VietQRResponse {
    data?: {
        qrDataURL?: string;
    };
    error?: string;
}

export interface JsonResult {
    amount?: string;
    addInfo?: string;
    accountNo: string;
    accountName: string;
    acqId: string;
}
