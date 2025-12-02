import React, { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import StudentsTab from "./screens/StudentsTab";
import SectionsTab from "./screens/SectionsTab";
import ResultsTab from "./screens/ResultsTab";

export default function App() {
  const [active, setActive] = useState("students");

  return (
    <div
      className="
        min-h-screen 
        flex flex-col items-center justify-center 
        bg-cover bg-center 
        bg-[url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b')] 
        before:content-[''] before:absolute before:inset-0 before:bg-black/30 before:z-0
      "
    >
      <div className="relative w-full max-w-5xl bg-white/80 shadow-2xl rounded-2xl p-6 backdrop-blur-md z-10">
        <Header />

        <div className="mt-6">
          <Tabs active={active} onChange={setActive} />
        </div>

        <main className="mt-6 px-2">
          {active === "students" && <StudentsTab />}
          {active === "sections" && <SectionsTab />}
          {active === "results" && <ResultsTab />}
        </main>
      </div>
    </div>
  );
}
