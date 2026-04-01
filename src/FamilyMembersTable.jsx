import React, { useState } from "react";

export default function FamilyMembersTable() {
  const [members, setMembers] = useState([
    { name: "", mobile: "" },
  ]);

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
    <div className="mt-6">

      {members.map((m, i) => (
        <div key={i} className="border p-4 rounded-lg mb-3 bg-gray-50">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Member {i + 1}</span>
            {members.length > 1 && (
              <button
                onClick={() => removeRow(i)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3">
            <label className="whitespace-nowrap">નામ :-</label>
            <input
              type="text"
              value={m.name}
              onChange={(e) => handleChange(i, "name", e.target.value)}
              className="flex-1 border-b outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">મોબાઈલ નંબર :-</label>
            <input
              type="text"
              value={m.mobile}
              onChange={(e) => handleChange(i, "mobile", e.target.value)}
              className="flex-1 border-b outline-none"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addRow}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        + Add Member
      </button>
    </div>
  );
}