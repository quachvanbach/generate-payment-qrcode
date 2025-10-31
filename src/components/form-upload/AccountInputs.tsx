"use client";
import React from "react";

export function AccountInputs({
                                  accountNo,
                                  setAccountNo,
                                  accountName,
                                  setAccountName,
                                  selectedOption,
                              }: any) {
    const disabled = selectedOption !== "Khác" && selectedOption !== "";

    return (
        <>
            <input
                type="text"
                placeholder="Số tài khoản"
                value={accountNo}
                disabled={disabled}
                onChange={(e) => setAccountNo(e.target.value)}
                className="border p-2 w-full"
            />

            <input
                type="text"
                placeholder="Tên người nhận"
                value={accountName}
                disabled={disabled}
                onChange={(e) => setAccountName(e.target.value)}
                className="border p-2 w-full"
            />
        </>
    );
}
