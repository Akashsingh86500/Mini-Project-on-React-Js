import React from "react";

export default function Header() {
    return (
        <header
            className="
                fixed top-0 left-0 w-full z-50
                bg-white/20 backdrop-blur-xl
                shadow-lg border border-white/30
                rounded-3xl
            "
        >
            <div
                className="
                    max-w-4xl mx-auto 
                    py-4 px-6 
                    flex flex-col items-center text-center
                "
            >
                <h1 className="text-3xl font-extrabold text-gray-900 drop-shadow-sm tracking-tight">
                    Student Result Management
                </h1>

                <small className="text-gray-700 text-sm mt-1 font-medium">
                    Mayank Maurya • JSON Server
                </small>
            </div>
        </header>
    );
}
