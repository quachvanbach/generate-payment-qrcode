/*
"use client";
import React, { useState } from "react";

interface JsonFormProps {
    onResult: (data: any) => void;
}

export default function JsonForm({ onResult }: JsonFormProps) {
    const [selectedOption, setSelectedOption] = useState("");
    const [formData, setFormData] = useState({
        acqId: "",
        accountName: "",
        accountNo: "",
        amount: "",
        addInfo: "",
    });
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const isCustom = selectedOption === "other";

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedOption(value);

        if (value === "SPX") {
            setFormData({
                acqId: "123456",
                accountName: "Nguyen Van A",
                accountNo: "1234567890",
                amount: "",
                addInfo: "",
            });
        } else if (value === "J&T") {
            setFormData({
                acqId: "234567",
                accountName: "Tran Van B",
                accountNo: "9876543210",
                amount: "",
                addInfo: "",
            });
        } else if (value === "GHN") {
            setFormData({
                acqId: "345678",
                accountName: "Le Van C",
                accountNo: "5555555555",
                amount: "",
                addInfo: "",
            });
        } else {
            setFormData({
                acqId: "",
                accountName: "",
                accountNo: "",
                amount: "",
                addInfo: "",
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return alert("Vui lòng chọn ảnh đơn hàng");

        const form = new FormData();
        form.append("image", image);
        form.append("acqId", formData.acqId);
        form.append("accountName", formData.accountName);
        form.append("accountNo", formData.accountNo);

        setLoading(true);

        const res = await fetch("/api/generate-json", {
            method: "POST",
            body: form,
        });

        const result = await res.json();
        setLoading(false);

        onResult(result); // gửi dữ liệu cho component cha hiển thị popup
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg w-full max-w-md mx-auto"
        >
            <select
                id="fruit"
                value={selectedOption}
                onChange={handleSelectChange}
                className="border p-2 rounded"
            >
                <option value="" disabled>
                    Tên người nhận
                </option>
                <option value="SPX">SPX</option>
                <option value="J&T">J&T</option>
                <option value="GHN">GHN</option>
                <option value="other">Khác</option>
            </select>

            <input
                name="acqId"
                value={formData.acqId}
                onChange={handleChange}
                placeholder="acqId"
                disabled={!isCustom}
                className="border p-2 rounded"
            />
            <input
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                placeholder="accountName"
                disabled={!isCustom}
                className="border p-2 rounded"
            />
            <input
                name="accountNo"
                value={formData.accountNo}
                onChange={handleChange}
                placeholder="accountNo"
                disabled={!isCustom}
                className="border p-2 rounded"
            />

            <input
                type="file"
                accept="image/!*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="border p-2 rounded"
            />

            <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                disabled={loading}
            >
                {loading ? "Đang xử lý..." : "Gửi ảnh & Tạo JSON"}
            </button>
        </form>
    );
}
*/
