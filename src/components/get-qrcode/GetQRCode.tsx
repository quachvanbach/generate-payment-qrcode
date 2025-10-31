"use client";
import React from "react";

interface JsonResultPopupProps {
    data: any;
    onClose: () => void;
}

export default function JsonResultPopup({ data, onClose }: JsonResultPopupProps) {
    if (!data) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg shadow-xl relative">
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-red-500 font-semibold hover:underline"
                >
                    Đóng
                </button>
            </div>
        </div>
    );
}
