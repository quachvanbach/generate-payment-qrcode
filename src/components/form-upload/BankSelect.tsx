import React from "react";
import {Bank} from "@/config/site";

type BankSelectProps = {
    acqId: string;
    setAcqId: (acqId: string) => void;
    banks: Bank[];
    selectedOption: string;
}

export function BankSelect({acqId, setAcqId, banks, selectedOption}: BankSelectProps) {
    return (
        <select
            value={acqId}
            onChange={(e) => setAcqId(e.target.value)}
            disabled={selectedOption !== "Khác" && selectedOption !== ""}
            className="border p-2 w-full"
        >
            <option value="">Chọn ngân hàng</option>
            {banks.map((b: Bank) => (
                <option key={b.code} value={b.code}>
                    {b.name}
                </option>
            ))}
        </select>
    );
}
