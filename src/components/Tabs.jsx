import React from "react";

export default function Tabs({ active, onChange }) {
    const base =
        "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none";

    const activeClass =
        "bg-green-600 text-white shadow-md scale-105";

    const inactiveClass =
        "bg-white/50 text-green-700 hover:bg-white backdrop-blur-md border border-gray-200";

    return (
        <nav className="flex justify-center space-x-3 mt-24">
            <button
                className={`${base} ${active === "students" ? activeClass : inactiveClass}`}
                onClick={() => onChange("students")}
            >
                Students
            </button>

            <button
                className={`${base} ${active === "sections" ? activeClass : inactiveClass}`}
                onClick={() => onChange("sections")}
            >
                Sections
            </button>

            <button
                className={`${base} ${active === "results" ? activeClass : inactiveClass}`}
                onClick={() => onChange("results")}
            >
                Results
            </button>
        </nav>
    );
}
