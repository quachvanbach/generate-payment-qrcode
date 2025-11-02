"use client";
import React, {useState} from "react";
import FormUpload from "@/components/form-upload/FormUpload";
import QrDisplay from "@/components/qr-display/QrDisplay";
import {JsonDataProps} from "@/app/types/common";

export default function MainComponent() {
    const [jsonData, setJsonData] = useState<JsonDataProps | null>(null);
    const [qrImage, setQrImage] = useState<string | null>(null);
    const [autoShow, setAutoShow] = useState(false);

    const handleJsonReady = (data: JsonDataProps, qrImg?: string, auto?: boolean) => {
        setJsonData(data);
        setQrImage(qrImg || null);
        setAutoShow(!!auto);
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Tạo Mã QR Thanh Toán</h1>
            <FormUpload onJsonReady={handleJsonReady} />
            {jsonData && <QrDisplay jsonData={jsonData} qrImage={qrImage} autoShow={autoShow} />}
        </div>
    );
}
