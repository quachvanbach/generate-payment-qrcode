'use client';
import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import { BrowserQRCodeReader } from '@zxing/browser';
import NextImage from 'next/image';

export default function OCRtoQR() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [qrUrl, setQrUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [orderCode, setOrderCode] = useState('');

    const resetState = () => {
        setAmount('');
        setOrderCode('');
        setQrUrl(null);
        setText('');
        setImageUrl(null);
        setLoading(true);
    };

    const enhanceForOCR = (imageSrc: string): Promise<string> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve(imageSrc);
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL());
            };
            img.src = imageSrc;
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        resetState();
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = async () => {
            if (typeof reader.result === 'string') {
                const processedImage = await enhanceForOCR(reader.result);
                setImageUrl(processedImage);
                await extractText(processedImage);
                await extractQRCode(processedImage);
            }
        };
        reader.readAsDataURL(file);
    };

    const extractText = async (image: string) => {
        setLoading(true);
        const result = await Tesseract.recognize(image, 'eng+vie');
        const rawText = result.data.text;
        setText(rawText);

        console.log(rawText)

        // Tìm mã vận đơn sau "SPX Express:"
        const orderCodeMatch = rawText.match(/SPX Express:\s*(\S+)/i);
        const extractedOrderCode = orderCodeMatch?.[1] ?? 'Chuyen tien hang';
        setOrderCode(extractedOrderCode);

        // Tìm số tiền sau "Thành tiền:"
        const amountMatch = rawText.match(/Thành tiền:\s*[đ]?\s*([\d,.]+)/i);
        const extractedAmount = amountMatch
            ? amountMatch[1].replace(/[.,]/g, '')
            : '0';
        setAmount(extractedAmount);

        console.log('Extracted OrderCode:', extractedOrderCode);
        console.log('Extracted Amount:', extractedAmount);

        setLoading(false);
    };

    const extractQRCode = async (imageUrl: string) => {
        try {
            const codeReader = new BrowserQRCodeReader();
            const img = document.createElement('img');
            img.src = imageUrl;
            await img.decode();
            const result = await codeReader.decodeFromImageElement(img);
            console.log('QR result:', result.getText());
            setOrderCode(result.getText());
        } catch (err) {
            console.warn('Không tìm thấy QR code trong ảnh:', err);
        }
    };

    const generateQR = () => {
        const qr = `https://img.vietqr.io/image/VCB-0341007172853-compact.png?amount=${amount}&addInfo=${orderCode}`;
        setQrUrl(qr);
        console.log('Generated QR URL:', qr);
    };

    useEffect(() => {
        if (amount && orderCode) {
            generateQR();
        }
    }, [amount, orderCode]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-[80px]">
            <div className="left-block">
                <h1 className="title">Hình ảnh đơn hàng:</h1>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {imageUrl && (
                    <div className="w-full max-w-[500px] mx-auto">
                        <p className="mt-4 text-sm text-gray-600">Ảnh đã chọn:</p>
                        <NextImage
                            src={imageUrl}
                            alt="Uploaded"
                            width={1000}
                            height={1000}
                            className="max-w-full h-auto border rounded"
                        />
                    </div>
                )}
                {loading && (
                    <p>
                        <span className="inline-block mr-2 animate-spin">⏳</span> Đang xử
                        lý ảnh...
                    </p>
                )}
            </div>

            <div className="right-block">
                <h1 className="title">Thông tin chuyển khoản:</h1>
                <div className="mt-4">
                    <label className="text-sm font-medium">📄 Mã vận đơn:</label>
                    <input
                        type="text"
                        value={orderCode}
                        onChange={(e) => setOrderCode(e.target.value)}
                        className="block mt-1 w-full border px-2 py-1 rounded"
                    />
                </div>
                <div>
                    <p className="mt-4 text-sm">
                        💰 Số tiền:{' '}
                        <strong>{parseInt(amount).toLocaleString('vi-VN')} VND</strong>
                    </p>
                </div>

                {qrUrl && (
                    <div className="w-full max-w-[500px] mx-auto mt-8">
                        <p className="font-medium mb-4">✅ Mã QR VietQR:</p>
                        <img src={qrUrl} alt="QR Code" className="w-full h-auto" />
                    </div>
                )}
            </div>
        </div>
    );
}
