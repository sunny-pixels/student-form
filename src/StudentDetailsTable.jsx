import React, { useState } from "react";

export default function StudentDetailsTable() {
  const [students, setStudents] = useState([
    { name: "", class: "", school: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const addRow = () => {
    setStudents([...students, { name: "", class: "", school: "" }]);
  };

  const removeRow = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };

  return (
    <div className="mt-6">

      {students.map((s, i) => (
        <div key={i} className="border p-3 sm:p-4 rounded-lg mb-3 bg-gray-50">
          <div className="flex justify-between mb-4">
            <span className="font-medium text-sm sm:text-base">Student {i + 1}</span>
            {students.length > 1 && (
              <button
                onClick={() => removeRow(i)}
                className="text-red-500 text-xs sm:text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-3">
            <label className="whitespace-nowrap text-sm sm:text-base">નામ :-</label>
            <input
              type="text"
              value={s.name}
              onChange={(e) => handleChange(i, "name", e.target.value)}
              className="flex-1 border-b outline-none text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-3">
            <label className="whitespace-nowrap text-sm sm:text-base">ધોરણ :-</label>
            <input
              type="text"
              value={s.class}
              onChange={(e) => handleChange(i, "class", e.target.value)}
              className="flex-1 border-b outline-none text-sm sm:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <label className="whitespace-nowrap text-sm sm:text-base">શાળાનું નામ :-</label>
            <input
              type="text"
              value={s.school}
              onChange={(e) => handleChange(i, "school", e.target.value)}
              className="flex-1 border-b outline-none text-sm sm:text-base"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addRow}
        className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base w-full sm:w-auto"
      >
        + Add Student
      </button>
    </div>
  );
}