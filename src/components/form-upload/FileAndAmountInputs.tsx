import React from "react";
import {FileAndAmountInputsProps} from "@/app/types/common";

export function FileAndAmountInputs({image, setImage, parsedAmount, amount, setAmount}: FileAndAmountInputsProps) {
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
                value={image !== null ? parsedAmount || amount : amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 w-full"
                disabled={!!parsedAmount && image !== null}
            />
        </>
    );
}
