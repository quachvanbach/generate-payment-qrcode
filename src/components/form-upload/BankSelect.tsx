"use client";
import React from "react";

export function BankSelect({ acqId, setAcqId, banks, selectedOption }: any) {
    return (
        <select
            value={acqId}
            onChange={(e) => setAcqId(e.target.value)}
            disabled={selectedOption !== "Khác" && selectedOption !== ""}
            className="border p-2 w-full"
        >
            <option value="">Chọn ngân hàng</option>
            {banks.map((b: any) => (
                <option key={b.code} value={b.code}>
                    {b.name}
                </option>
            ))}
        </select>
    );
}
