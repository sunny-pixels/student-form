import { useState } from "react";

export default function FamilyMembersTable({ members, setMembers }) {
  const handleChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addRow = () => {
    setMembers([...members, { name: "", mobile: "" }]);
  };

  const removeRow = (index) => {
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
  };

  return (
    <div className="space-y-4">

      {members.map((m, i) => (
        <div key={i} className="bg-white border-2 border-blue-100 p-4 sm:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-blue-100">
            <span className="font-semibold text-sm sm:text-base text-blue-900">સભ્ય {i + 1}</span>
            {members.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="text-red-600 hover:text-red-800 text-xs sm:text-sm font-medium hover:bg-red-50 px-3 py-1 rounded transition-colors"
              >
                દૂર કરો
              </button>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="whitespace-nowrap text-sm sm:text-base text-gray-700 font-medium min-w-fit">નામ :-</label>
              <input
                type="text"
                value={m.name}
                onChange={(e) => handleChange(i, "name", e.target.value)}
                className="flex-1 border-b-2 border-gray-300 focus:border-blue-600 outline-none text-sm sm:text-base px-2 py-1 bg-gray-50 rounded"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="whitespace-nowrap text-sm sm:text-base text-gray-700 font-medium min-w-fit">મોબાઈલ નંબર :-</label>
              <input
                type="tel"
                value={m.mobile}
                onChange={(e) => handleChange(i, "mobile", e.target.value)}
                className="flex-1 border-b-2 border-gray-300 focus:border-blue-600 outline-none text-sm sm:text-base px-2 py-1 bg-gray-50 rounded"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-200"
      >
        + સભ્ય ઉમેરો
      </button>
    </div>
  );
}