import React from "react";

type AccountInputsProps = {
    accountNo: string;
    setAccountNo: (accountNo: string) => void;
    accountName: string;
    setAccountName: (accountName: string) => void;
    selectedOption: string;
}

export function AccountInputs({
                                  accountNo,
                                  setAccountNo,
                                  accountName,
                                  setAccountName,
                                  selectedOption,
                              }: AccountInputsProps) {
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
