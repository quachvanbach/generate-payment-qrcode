"use client";
import React, {useEffect, useState} from "react";
import FormUpload from "@/components/form-upload/FormUpload";
import QrDisplay from "@/components/qr-display/QrDisplay";

export default function MainComponent() {
    const [jsonData, setJsonData] = useState<never | null>(null);
    const [qrImage, setQrImage] = useState<string | null>(null);
    const [autoShow, setAutoShow] = useState(false);

    const handleJsonReady = (data: any, qrImg?: string, auto?: boolean) => {
        setJsonData(data);
        setQrImage(qrImg || null);
        setAutoShow(!!auto);
    };
    useEffect(() => {
        console.log("Jsondata", jsonData)
    }, []);
    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Tạo Mã QR Thanh Toán</h1>
            <FormUpload onJsonReady={handleJsonReady} />
            {jsonData && <QrDisplay jsonData={jsonData} qrImage={qrImage} autoShow={autoShow} />}
        </div>
    );
}
