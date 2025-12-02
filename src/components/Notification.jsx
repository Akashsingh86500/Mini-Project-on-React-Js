import React from "react";

export default function Notification({ type = "success", message, onClose }) {
    const base =
        "flex items-center justify-between px-5 py-3 rounded-xl shadow-lg mb-4 w-full animate-slideFade";

    const colors = {
        success: "bg-green-50 text-green-700 border border-green-200",
        error: "bg-red-50 text-red-700 border border-red-200",
        info: "bg-blue-50 text-blue-700 border border-blue-200",
        warning: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    };

    const icons = {
        success: "✓",
        error: "⚠",
        info: "ℹ",
        warning: "!",
    };

    return (
        <div className={`${base} ${colors[type]}`}>
            {/* Left side icon + message */}
            <div className="flex items-center gap-3">
                <span className="text-xl font-semibold">{icons[type]}</span>
                <span className="font-medium">{message}</span>
            </div>

            {/* Close button */}
            <button
                onClick={onClose}
                aria-label="Close"
                className="
                    text-xl font-bold text-current 
                    hover:bg-black/10 
                    w-7 h-7 rounded-full flex items-center justify-center
                    transition-all duration-150
                "
            >
                ×
            </button>
        </div>
    );
}
