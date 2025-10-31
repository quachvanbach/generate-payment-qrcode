"use client";
import { useState } from "react";

export default function UploadForm() {
    const [image, setImage] = useState<File | null>(null);
    const [accountNo, setAccountNo] = useState("");
    const [accountName, setAccountName] = useState("");
    const [acqId, setAcqId] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image) return alert("Please select an image");

        const formData = new FormData();
        formData.append("image", image);
        formData.append("accountNo", accountNo);
        formData.append("accountName", accountName);
        formData.append("acqId", acqId);

        const res = await fetch("/api/generate-json", {
            method: "POST",
            body: formData, // KHÔNG cần headers, fetch tự set multipart/form-data
        });

        const data = await res.json();
        console.log("Response:", data);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            <input
                type="text"
                placeholder="Account No"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
            />
            <input
                type="text"
                placeholder="Account Name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Acq ID"
                value={acqId}
                onChange={(e) => setAcqId(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}
