import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import Notification from "../components/Notification";
import { marksToGrade, gradeColors } from "../utils/grade";

export default function ResultsTab() {
    const [results, setResults] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);

    const [form, setForm] = useState({
        studentId: "",
        subject: "",
        marks: "",
        examDate: ""
    });

    const [notif, setNotif] = useState(null);
    const [filterStudent, setFilterStudent] = useState("");
    const [filterSubject, setFilterSubject] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                const [r, s] = await Promise.all([api.getResults(), api.getStudents()]);
                setResults(r);
                setStudents(s);
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
        setForm({ studentId: "", subject: "", marks: "", examDate: "" });
        setModalOpen(true);
    }

    function openEdit(result) {
        setEditing(result);
        setForm({
            studentId: result.studentId || "",
            subject: result.subject || "",
            marks: result.marks || "",
            examDate: result.examDate || ""
        });
        setModalOpen(true);
    }

    async function handleSave() {
        if (!form.studentId || !form.subject || form.marks === "") {
            setNotif({ type: "error", message: "Student, subject and marks are required." });
            return;
        }

        const marksNum = Number(form.marks);
        if (isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
            setNotif({ type: "error", message: "Marks must be a number between 0 and 100." });
            return;
        }

        setSaving(true);
        try {
            const payload = {
                ...form,
                marks: marksNum,
                studentId: String(form.studentId)
            };

            if (editing) {
                const updated = await api.updateResult(editing.id, payload);
                setResults(prev => prev.map(r => (r.id === updated.id ? updated : r)));
                setNotif({ type: "success", message: "Result updated." });
            } else {
                const created = await api.createResult(payload);
                setResults(prev => [created, ...prev]);
                setNotif({ type: "success", message: "Result created." });
            }

            setModalOpen(false);
        } catch (err) {
            setNotif({ type: "error", message: err.message });
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Delete this result?")) return;
        try {
            await api.deleteResult(id);
            setResults(prev => prev.filter(r => r.id !== id));
            setNotif({ type: "success", message: "Result deleted." });
        } catch (err) {
            setNotif({ type: "error", message: err.message });
        }
    }

    const subjects = Array.from(new Set(results.map(r => r.subject))).filter(Boolean);

    const visible = results.filter(r => {
        if (filterStudent && String(r.studentId) !== String(filterStudent)) return false;
        if (filterSubject && r.subject !== filterSubject) return false;
        return true;
    });

    return (
        <section className="p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Results</h2>
                <Button icon="+" onClick={openAdd}>Add New Result</Button>
            </div>

            {/* Notification */}
            {notif && (
                <div className="mb-4">
                    <Notification {...notif} onClose={() => setNotif(null)} />
                </div>
            )}

            {/* Filters */}
            <div className="flex gap-4 mb-4">
                <Select
                    label="Student"
                    options={[
                        { value: "", label: "All" },
                        ...students.map(s => ({ value: s.id, label: s.name }))
                    ]}
                    value={filterStudent}
                    onChange={e => setFilterStudent(e.target.value)}
                />

                <Select
                    label="Subject"
                    options={[
                        { value: "", label: "All" },
                        ...subjects.map(s => ({ value: s, label: s }))
                    ]}
                    value={filterSubject}
                    onChange={e => setFilterSubject(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="overflow-auto rounded-lg shadow">
                {loading ? (
                    <div className="py-6 text-center text-gray-500">Loading...</div>
                ) : visible.length === 0 ? (
                    <div className="py-6 text-center text-gray-500">No records found</div>
                ) : (
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-3 text-left">Student</th>
                                <th className="p-3 text-left">Subject</th>
                                <th className="p-3 text-left">Marks</th>
                                <th className="p-3 text-left">Grade</th>
                                <th className="p-3 text-left">Exam Date</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visible.map(r => {
                                const student = students.find(s => String(s.id) === String(r.studentId));
                                const grade = marksToGrade(r.marks);

                                return (
                                    <tr key={r.id} className="border-t hover:bg-gray-50 transition">
                                        <td className="p-3">{student?.name || "-"}</td>
                                        <td className="p-3">{r.subject}</td>
                                        <td className="p-3">{r.marks}</td>

                                        <td className="p-3">
                                            <td><span className={`px-2 py-1 rounded ${gradeColors[grade]}`}>{grade}</span></td>
                                        </td>

                                        <td className="p-3">{r.examDate || "-"}</td>

                                        <td className="p-3 flex gap-3">
                                            <button
                                                onClick={() => openEdit(r)}
                                                className="text-white hover:text-yellow-300"
                                            >
                                                ✎
                                            </button>
                                            <button
                                                onClick={() => handleDelete(r.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                🗑
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            <Modal
                title={editing ? "Edit Result" : "Add Result"}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <div className="space-y-4">

                    <Select
                        label="Student"
                        options={[
                            { value: "", label: "-- Select --" },
                            ...students.map(s => ({ value: s.id, label: s.name }))
                        ]}
                        value={form.studentId}
                        onChange={e => setForm({ ...form, studentId: e.target.value })}
                    />

                    <Input
                        label="Subject"
                        value={form.subject}
                        onChange={e => setForm({ ...form, subject: e.target.value })}
                    />

                    <Input
                        label="Marks"
                        type="number"
                        value={form.marks}
                        onChange={e => setForm({ ...form, marks: e.target.value })}
                    />

                    <Input
                        label="Exam Date"
                        type="date"
                        value={form.examDate}
                        onChange={e => setForm({ ...form, examDate: e.target.value })}
                    />

                    <div className="flex justify-end gap-3 pt-2">
                        <Button variant="secondary" onClick={() => setModalOpen(false)}>
                            Cancel
                        </Button>

                        <Button variant="primary" onClick={handleSave} disabled={saving}>
                            {editing ? "Update" : "Create"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
