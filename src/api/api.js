const API_ROOT = "http://localhost:4000";

async function request(path, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
        const res = await fetch(`${API_ROOT}${path}`, {
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            ...options,
        });
        clearTimeout(timeout);

        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || res.statusText);
        }

        if (res.status === 204) return null;
        return res.json();
    } catch (err) {
        if (err.name === "AbortError") throw new Error("Request timed out.");
        throw err;
    }
}

export const api = {
    // Students
    getStudents: () => request("/students?_sort=name"),
    createStudent: (data) => request("/students", { method: "POST", body: JSON.stringify(data) }),
    updateStudent: (id, data) => request(`/students/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    deleteStudent: (id) => request(`/students/${id}`, { method: "DELETE" }),

    // Sections
    getSections: () => request("/sections?_sort=name"),
    createSection: (data) => request("/sections", { method: "POST", body: JSON.stringify(data) }),
    updateSection: (id, data) => request(`/sections/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    deleteSection: (id) => request(`/sections/${id}`, { method: "DELETE" }),

    // Results
    getResults: () => request("/results?_sort=examDate&_order=desc"),
    createResult: (data) => request("/results", { method: "POST", body: JSON.stringify(data) }),
    updateResult: (id, data) => request(`/results/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    deleteResult: (id) => request(`/results/${id}`, { method: "DELETE" }),
};
