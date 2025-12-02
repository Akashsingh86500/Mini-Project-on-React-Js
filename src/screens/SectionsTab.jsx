import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Input from "../components/Input";
import Notification from "../components/Notification";

export default function SectionsTab() {
    const [sections, setSections] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const [form, setForm] = useState({
        name: "",
        description: ""
    });

    const [notif, setNotif] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const [secs, studs] = await Promise.all([
                    api.getSections(),
                    api.getStudents()
                ]);
                setSections(secs);
                setStudents(studs);
            } catch (err) {
                setNotif({ type: "error", message: err.message });
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    function openAdd() {
        setEditing(null);
        setForm({ name: "", description: "" });
        setModalOpen(true);
    }

    function openEdit(section) {
        setEditing(section);
        setForm({
            name: section.name || "",
            description: section.description || ""
        });
        setModalOpen(true);
    }

    async function handleSave() {
        if (!form.name) {
            setNotif({ type: "error", message: "Name is required." });
            return;
        }

        try {
            if (editing) {
                const updated = await api.updateSection(editing.id, {
                    ...editing,
                    ...form
                });
                setSections((prev) =>
                    prev.map((s) => (s.id === updated.id ? updated : s))
                );
                setNotif({ type: "success", message: "Section updated." });
            } else {
                const created = await api.createSection(form);
                setSections((prev) => [created, ...prev]);
                setNotif({ type: "success", message: "Section created." });
            }

            setModalOpen(false);
        } catch (err) {
            setNotif({ type: "error", message: err.message });
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Delete this section? Students will lose this section assignment.")) return;

        try {
            await api.deleteSection(id);
            setSections((prev) => prev.filter((s) => s.id !== id));
            setNotif({ type: "success", message: "Section deleted." });
        } catch (err) {
            setNotif({ type: "error", message: err.message });
        }
    }

    function totalStudentsFor(sectionId) {
        return students.filter(
            (s) => String(s.sectionId) === String(sectionId)
        ).length;
    }

    return (
        <section className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Sections</h2>
                <Button icon="+" onClick={openAdd}>
                    Add New Section
                </Button>
            </div>

            {/* Notification */}
            {notif && (
                <div className="mb-4">
                    <Notification {...notif} onClose={() => setNotif(null)} />
                </div>
            )}

            {/* Table */}
            <div className="overflow-auto rounded-lg shadow">
                {loading ? (
                    <div className="py-6 text-center text-gray-500">
                        Loading...
                    </div>
                ) : sections.length === 0 ? (
                    <div className="py-6 text-center text-gray-500">
                        No records found
                    </div>
                ) : (
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Description</th>
                                <th className="p-3 text-left">
                                    Total Students
                                </th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sections.map((s) => (
                                <tr
                                    key={s.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="p-3">{s.name}</td>
                                    <td className="p-3">
                                        {s.description || "-"}
                                    </td>
                                    <td className="p-3">
                                        {totalStudentsFor(s.id)}
                                    </td>

                                    <td className="p-3 flex gap-3">
                                        <button
                                            onClick={() => openEdit(s)}
                                            className="text-white hover:text-yellow-300"
                                        >
                                            ✎
                                        </button>
                                        <button
                                            onClick={() => handleDelete(s.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            🗑
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            <Modal
                title={editing ? "Edit Section" : "Add Section"}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <div className="space-y-4">
                    <Input
                        label="Name"
                        required
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />
                    <Input
                        label="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                    />

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            variant="secondary"
                            onClick={() => setModalOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button variant="primary" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
