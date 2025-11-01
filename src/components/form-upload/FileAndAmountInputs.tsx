import React from "react";
import {FileAndAmountInputsProps} from "@/app/types/common";

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
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 w-full"
                disabled={!!parsedAmount}
            />
        </>
    );
}
