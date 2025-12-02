import React from "react";

export default function Button({
    children,
    variant = "primary",
    icon,
    iconRight,
    disabled,
    className = "",
    ...rest
}) {
    const base =
        "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium " +
        "transition-all duration-200 select-none disabled:cursor-not-allowed " +
        "focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 focus:ring-blue-500",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-300 focus:ring-gray-400",
        success: "bg-green-500 text-white hover:bg-green-600 disabled:bg-green-300 focus:ring-green-500",
        danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300 focus:ring-red-500",
    };

    return (
        <button
            className={`${base} ${variants[variant]} ${className}`}
            disabled={disabled}
            {...rest}
        >
            {/* Left icon */}
            {icon && <span className="text-lg leading-none">{icon}</span>}

            {/* Button text */}
            <span>{children}</span>

            {/* Right icon */}
            {iconRight && <span className="text-lg leading-none">{iconRight}</span>}
        </button>
    );
}
