import React from "react";

export default function Modal({ title, open, onClose, children }) {
    if (!open) return null;

    return (
        <div
            className="
                fixed inset-0 
                bg-black/40 backdrop-blur-sm
                flex items-center justify-center 
                z-50 
                animate-fadeIn
            "
            role="dialog"
            aria-modal="true"
        >
            <div
                className="
                    bg-white/95 
                    rounded-2xl 
                    shadow-2xl shadow-black/10 
                    w-full max-w-lg mx-4
                    animate-scaleIn
                "
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="
                            text-gray-500 hover:text-gray-800 
                            hover:bg-gray-200 
                            rounded-full 
                            w-8 h-8 flex items-center justify-center
                            transition-all duration-150
                        "
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
