import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Notification from "../components/Notification";

export default function StudentsTab() {
    const [students, setStudents] = useState([]);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        sectionId: "",
        enrollmentDate: ""
    });

    const [notif, setNotif] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const [s, secs] = await Promise.all([
                    api.getStudents(),
                    api.getSections()
                ]);
                setStudents(s);
                setSections(secs);
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
        setForm({
            name: "",
            email: "",
            sectionId: "",
            enrollmentDate: ""
        });
        setModalOpen(true);
    }

    function openEdit(student) {
        setEditing(student);
        setForm({
            name: student.name || "",
            email: student.email || "",
            sectionId: student.sectionId || "",
            enrollmentDate: student.enrollmentDate || ""
        });
        setModalOpen(true);
    }

    async function handleSave() {
        if (!form.name || !form.email) {
            setNotif({ type: "error", message: "Name and Email are required." });
            return;
        }

        setSaving(true);
        try {
            if (editing) {
                const updated = await api.updateStudent(editing.id, form);
                setStudents((prev) =>
                    prev.map((s) => (s.id === updated.id ? updated : s))
                );
                setNotif({ type: "success", message: "Student updated." });
            } else {
                const created = await api.createStudent(form);
                setStudents((prev) => [created, ...prev]);
                setNotif({ type: "success", message: "Student created." });
            }

            setModalOpen(false);
        } catch (err) {
            setNotif({ type: "error", message: err.message });
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Delete this student?")) return;

        try {
            await api.deleteStudent(id);
            setStudents((prev) => prev.filter((s) => s.id !== id));
            setNotif({ type: "success", message: "Student deleted." });
        } catch (err) {
            setNotif({ type: "error", message: err.message });
        }
    }

    return (
        <section className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Students</h2>
                <Button icon="+" onClick={openAdd}>Add New Student</Button>
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
                    <div className="text-center py-6 text-gray-500">Loading...</div>
                ) : students.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">No records found</div>
                ) : (
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="text-left p-3">Name</th>
                                <th className="text-left p-3">Email</th>
                                <th className="text-left p-3">Section</th>
                                <th className="text-left p-3">Enrollment Date</th>
                                <th className="text-left p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s) => (
                                <tr
                                    key={s.id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="p-3">{s.name}</td>
                                    <td className="p-3">{s.email}</td>
                                    <td className="p-3">
                                        {sections.find(sec => String(sec.id) === String(s.sectionId))?.name || "-"}
                                    </td>
                                    <td className="p-3">{s.enrollmentDate || "-"}</td>
                                    <td className="p-3 flex gap-3">
                                        <button
                                            onClick={() => openEdit(s)}
                                            className="text-black hover:text-red-300"
                                        >
                                            ✎
                                        </button>
                                        <button
                                            onClick={() => handleDelete(s.id)}
                                            className="text-red-600 hover:text-green-800"
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
                title={editing ? "Edit Student" : "Add Student"}
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
                        label="Email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />
                    <Select
                        label="Section"
                        options={[
                            { value: "", label: "-- Select --" },
                            ...sections.map((s) => ({
                                value: s.id,
                                label: s.name
                            }))
                        ]}
                        value={form.sectionId}
                        onChange={(e) =>
                            setForm({ ...form, sectionId: e.target.value })
                        }
                    />

                    <Input
                        label="Enrollment Date"
                        type="date"
                        value={form.enrollmentDate}
                        onChange={(e) =>
                            setForm({ ...form, enrollmentDate: e.target.value })
                        }
                    />

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            variant="secondary"
                            onClick={() => setModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            disabled={saving}
                            onClick={handleSave}
                        >
                            {editing ? "Update" : "Create"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
