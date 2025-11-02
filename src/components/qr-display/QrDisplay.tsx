"use client";
import React, {useState} from "react";
import Image from "next/image";
import {IoMdClose} from "react-icons/io";
import {JsonDataProps} from "@/app/types/common";

type Props = { jsonData: JsonDataProps; qrImage: string | null; autoShow?: boolean };

export default function QrDisplay({jsonData, qrImage, autoShow}: Props) {
    const [qrSrc, setQrSrc] = useState<string | null>(qrImage || null);
    const [showPopup, setShowPopup] = useState(autoShow || false);
    const [loading, setLoading] = useState(false);

    const handleGenerateQR = async () => {
        setLoading(true);
        const qrRes = await fetch("/api/vietqr", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(jsonData),
        });

        const qrData = await qrRes.json();
        if (qrRes.ok && qrData?.data?.qrDataURL) {
            setQrSrc(qrData.data.qrDataURL);
            setShowPopup(true);
        } else alert("Lỗi khi tạo mã QR.");
        setLoading(false);
    };

    console.log("loading:",loading)

    return (
        <div className="mt-4">
            <button
                onClick={handleGenerateQR}
                disabled={loading}
                className="bg-green-600 text-white p-2 rounded w-full"
            >
                {loading ? "Đang tạo QR..." : "Hiển thị QR"}
            </button>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg relative">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute text-2xl top-2 right-2 text-gray-500"
                        >
                            <IoMdClose/>
                        </button>

                        {/*<h2 className="text-lg font-bold mb-2">Dữ liệu JSON</h2>
                        <pre className="bg-gray-100 p-2 rounded mb-3 text-sm overflow-auto">
              {JSON.stringify(jsonData, null, 2)}
            </pre>*/}

                        {qrSrc ? (
                            <Image width={100} height={100} src={qrSrc} alt="QR Code" className="w-full mx-auto"/>
                        ) : (
                            <p className="text-gray-500 text-center">QR chưa được tạo.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
