export function marksToGrade(marks) {
    if (marks >= 97) return "A+";
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B";
    if (marks >= 60) return "C";
    if (marks >= 50) return "D";
    return "F";
}
export const gradeColors = {
    "A+": "bg-green-500 text-white",
    "A": "bg-blue-500 text-white",
    "B": "bg-purple-500 text-white",
    "C": "bg-yellow-400 text-black",
    "D": "bg-red-500 text-white",
    "F": "bg-red-700 text-white"
};
