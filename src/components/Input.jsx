import React from "react";

export default function Input({ label, required, ...rest }) {
    return (
        <label className="flex flex-col gap-1 mb-5 w-full">

            {label && (
                <span className="text-gray-800 font-semibold tracking-wide">
                    {label}{" "}
                    {required && <span className="text-red-600">*</span>}
                </span>
            )}

            <input
                className="
                    w-full px-4 py-2.5
                    rounded-xl
                    border border-gray-300
                    bg-white/80 backdrop-blur
                    text-gray-900 placeholder-gray-500
                    shadow-md shadow-gray-200/50
                    hover:bg-white/90
                    focus:bg-white 
                    focus:outline-none 
                    focus:ring-2 focus:ring-blue-500/70 
                    focus:border-blue-600
                    transition-all duration-200
                "
                {...rest}
            />
        </label>
    );
}
