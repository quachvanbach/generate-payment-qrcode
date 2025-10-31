import React from "react";

interface FileAndAmountInputsProps {
    setImage: (image: File | null) => void;
    parsedAmount?: number;
    amount: number;
    setAmount: (amount: number) => void;
}

export function FileAndAmountInputs({ setImage, parsedAmount, amount, setAmount }: FileAndAmountInputsProps) {
    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="border p-2 w-full"
            />
            <input
                type="number"
                placeholder="Nhập số tiền"
                value={parsedAmount || amount}
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : 0)}
                className="border p-2 w-full"
                disabled={!!parsedAmount}
            />
        </>
    );
}
