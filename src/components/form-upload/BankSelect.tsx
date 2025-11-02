import React, { useEffect, useRef, useState } from "react";
import { Bank } from "@/config/site";

type BankSelectProps = {
    acqId: string;
    setAcqId: (acqId: string) => void;
    banks: Bank[];
    selectedOption: string;
};

export function BankSelect({
                               acqId,
                               setAcqId,
                               banks,
                               selectedOption,
                           }: BankSelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [highlight, setHighlight] = useState(0);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const disabled = selectedOption !== "Khác" && selectedOption !== "";

    const selectedBank = banks.find((b) => b.code === acqId);

    const filtered = banks.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
    );

    // close when click outside
    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    // keyboard navigation
    useEffect(() => {
        if (!open) return;
        function onKey(e: KeyboardEvent) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlight((h) => Math.min(h + 1, Math.max(0, filtered.length - 1)));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlight((h) => Math.max(h - 1, 0));
            } else if (e.key === "Enter") {
                e.preventDefault();
                const item = filtered[highlight];
                if (item) {
                    setAcqId(item.code);
                    setOpen(false);
                    setSearch("");
                }
            } else if (e.key === "Escape") {
                setOpen(false);
            }
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, filtered, highlight, setAcqId]);

    // reset highlight when filtered changes
    useEffect(() => {
        setHighlight(0);
    }, [search]);

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <button
                type="button"
                onClick={() => !disabled && setOpen((o) => !o)}
                disabled={disabled}
                className={`w-full text-left border p-2 rounded flex items-center justify-between ${
                    disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                }`}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span>{selectedBank ? selectedBank.name : "Chọn ngân hàng"}</span>
                <svg
                    className={`w-4 h-4 transform ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            {open && !disabled && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow-lg max-h-64 overflow-hidden">
                    {/* Search inside dropdown */}
                    <div className="p-2">
                        <input
                            autoFocus
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm ngân hàng..."
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* List */}
                    <ul
                        role="listbox"
                        aria-activedescendant={filtered[highlight]?.code || undefined}
                        tabIndex={-1}
                        className="max-h-44 overflow-auto divide-y"
                    >
                        {filtered.length === 0 ? (
                            <li className="p-3 text-sm text-gray-500">Không tìm thấy ngân hàng</li>
                        ) : (
                            filtered.map((b, i) => {
                                const isHighlighted = i === highlight;
                                const isSelected = b.code === acqId;
                                return (
                                    <li
                                        id={b.code}
                                        key={b.code}
                                        role="option"
                                        aria-selected={isSelected}
                                        onMouseEnter={() => setHighlight(i)}
                                        onClick={() => {
                                            setAcqId(b.code);
                                            setOpen(false);
                                            setSearch("");
                                        }}
                                        className={`p-2 cursor-pointer flex items-start gap-2 ${
                                            isHighlighted ? "bg-gray-100" : ""
                                        } ${isSelected ? "font-semibold" : ""}`}
                                    >
                                        <div className="flex-1">
                                            <div className="truncate text-sm">{b.name}</div>
                                            <div className="text-xs text-gray-500">{b.code}</div>
                                        </div>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
