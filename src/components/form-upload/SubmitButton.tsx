"use client";
import React from "react";

export function SubmitButton({ loading }: { loading: boolean }) {
    return (
        <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded w-full"
        >
            {loading ? "Đang xử lý..." : "Tạo QR"}
        </button>
    );
}
