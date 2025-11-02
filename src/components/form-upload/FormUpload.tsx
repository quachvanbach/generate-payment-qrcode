import React from "react";
import { useFormLogic } from "./useFormLogic";
import { BankSelect } from "./BankSelect";
import { AccountInputs } from "./AccountInputs";
import { FileAndAmountInputs } from "./FileAndAmountInputs";
import { SubmitButton } from "./SubmitButton";
import {JsonDataProps} from "@/app/types/common";

type Props = { onJsonReady: (data: JsonDataProps, qrImage?: string, autoShow?: boolean) => void };

export default function FormUpload({ onJsonReady }: Props) {
    const form = useFormLogic(onJsonReady);
    return (
        <form onSubmit={form.handleSubmit} className="space-y-3 border p-4 rounded">
            <select
                value={form.selectedOption}
                onChange={(e) => form.handleSelectChange(e.target.value)}
                className="border p-2 w-full"
            >
                <option value="" disabled>
                    Tên người nhận
                </option>
                <option value="SPX">SPX</option>
                <option value="J&T">J&T</option>
                <option value="GHN">GHN</option>
                <option value="Khác">Khác</option>
            </select>

            <BankSelect {...form} />
            <AccountInputs {...form} />
            <FileAndAmountInputs {...form} />
            <SubmitButton loading={form.loading} />
        </form>
    );
}
