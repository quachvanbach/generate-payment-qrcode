"use client";
import { useState } from "react";
import { banks } from "@/config/site";

export const useFormLogic = (
    onJsonReady: (data: any, qrImage?: string, autoShow?: boolean) => void
) => {
    const [image, setImage] = useState<File | null>(null);
    const [accountNo, setAccountNo] = useState("");
    const [accountName, setAccountName] = useState("");
    const [acqId, setAcqId] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [amount, setAmount] = useState("");
    const [parsedAmount, setParsedAmount] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSelectChange = (value: string) => {
        setSelectedOption(value);
        const presets: Record<string, { accountNo: string; accountName: string; acqId: string }> = {
            SPX: { accountNo: "1234567890", accountName: "Trịnh Tuấn Anh", acqId: "970436" },
            "J&T": { accountNo: "9876543210", accountName: "Trần Văn B", acqId: "970415" },
            GHN: { accountNo: "5555555555", accountName: "Lê Thị C", acqId: "970418" },
        };

        const preset = presets[value];
        if (preset) {
            setAccountNo(preset.accountNo);
            setAccountName(preset.accountName);
            setAcqId(preset.acqId);
        } else {
            setAccountNo("");
            setAccountName("");
            setAcqId("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!accountNo || !accountName || !acqId) return alert("Vui lòng nhập đầy đủ thông tin tài khoản!");
        setLoading(true);

        let jsonData: any = {};
        if (image) {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("accountNo", accountNo);
            formData.append("accountName", accountName);
            formData.append("acqId", acqId);

            const res = await fetch("/api/generate-json", { method: "POST", body: formData });
            jsonData = await res.json();
            if (!res.ok) {
                setLoading(false);
                return alert("AI thất bại trong việc đọc ảnh: " + jsonData.error);
            }

            if (!jsonData.amount) jsonData.amount = amount || "";
            else setParsedAmount(jsonData.amount);
            if (!jsonData.addInfo) jsonData.addInfo = "chuyen tien";
        } else {
            if (!amount) {
                setLoading(false);
                return alert("Vui lòng nhập số tiền vì bạn không tải ảnh lên!");
            }
            jsonData = { accountNo, accountName, acqId, amount, addInfo: "chuyen tien" };
        }

        const qrRes = await fetch("/api/vietqr", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData),
        });

        const qrData = await qrRes.json();
        if (!qrRes.ok || !qrData?.data?.qrDataURL) {
            setLoading(false);
            return alert("Lỗi khi tạo mã QR.");
        }

        onJsonReady(jsonData, qrData.data.qrDataURL, true);
        setLoading(false);
    };

    return {
        image,
        setImage,
        accountNo,
        setAccountNo,
        accountName,
        setAccountName,
        acqId,
        setAcqId,
        selectedOption,
        handleSelectChange,
        amount,
        setAmount,
        parsedAmount,
        loading,
        handleSubmit,
        banks,
    };
};
