import React from "react";

type AccountInputProps = {
    accountNo: string,
    setAccountNo: React.Dispatch<React.SetStateAction<string>>,
    accountName: string,
    setAccountName: React.Dispatch<React.SetStateAction<string>>,
    selectedOption: string,
}

export function AccountInputs({
                                  accountNo,
                                  setAccountNo,
                                  accountName,
                                  setAccountName,
                                  selectedOption,
                              }: AccountInputProps) {
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
