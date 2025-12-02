import React from "react";

export default function Select({ label, options = [], required, ...rest }) {
    return (
        <label className="flex flex-col mb-4 w-full relative">
            {label && (
                <span className="mb-1 text-gray-700 font-medium">
                    {label} {required && <span className="text-red-500">*</span>}
                </span>
            )}
            <div className="relative w-full">
                <select
                    className="
                        appearance-none w-full border border-gray-300 rounded-xl px-4 py-2
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        transition duration-200 shadow-sm hover:shadow-md bg-white text-gray-800
                    "
                    {...rest}
                >
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
                {/* Custom arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </label>
    );
}
