import { useState } from "react";
import FamilyMembersTable from "./FamilyMembersTable";
import StudentDetailsTable from "./StudentDetailsTable";

export default function App() {
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    mobile: "",
    address: "",
    schoolName: "",
    standard: "",
    schoolAddress: "",
  });

  const [familyMembers, setFamilyMembers] = useState([
    { name: "", mobile: "" },
  ]);

  const [students, setStudents] = useState([
    { name: "", class: "", school: "" },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        familyMembers,
        students,
      };

      console.log("Sending data:", payload);

      const response = await fetch("http://localhost:3002/api/form/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert("Form submitted successfully!");
        // Reset form
        setFormData({
          studentName: "",
          fatherName: "",
          motherName: "",
          mobile: "",
          address: "",
          schoolName: "",
          standard: "",
          schoolAddress: "",
        });
        setFamilyMembers([{ name: "", mobile: "" }]);
        setStudents([{ name: "", class: "", school: "" }]);
      } else {
        alert("Error: " + (data.error || "Failed to submit"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form. Make sure backend is running on port 3002");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6 flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-8 w-full max-w-4xl">

        {/* Header */}
        <h1 className="text-center font-bold text-lg sm:text-xl underline mb-2">
          જય શ્રી શ્રીયાદેમાં
        </h1>
        <h2 className="text-center font-semibold text-sm sm:text-base underline mb-2">
          શ્રી શ્રીયાદે પ્રજાપતિ ચેરીટેબલ ટ્રસ્‍ટ
        </h2>
        <h3 className="text-center text-sm sm:text-base underline mb-6">
          નિ: શુલ્ક ચોપડા વિતરણ લાભાર્થી ફોર્મ ૨૦૨૬
        </h3>

        {/* Instructions */}
        <div className="mt-6 text-xs sm:text-sm space-y-2 mt-10">
          <h3 className="text-center font-bold text-base sm:text-lg underline mb-7">-: સૂચનો :-</h3>
          <p>1. આ ચોપડા વિતરણ માત્ર અને માત્ર ભણતરને ધ્યાનમાં રાખીને જ કરવામાં આવી
            રહ્યું છે,
          </p>
          <p>2. આ ચોપડા વિતરણ આપણા પુરબીયા પ્રજાપતિ સમાજ પુરતુ જ રાખવામાં આવેલ છે.</p>
          <p>3. દરેક વિદ્યાર્થીએ પોતાના આધારકાર્ડની તેમજ જે તે ધોરણની પરીક્ષા પાસ કરી હોય
            એ ધોરણના માર્કશીટની ઝેરોક્ષ ફોર્મની સાથે જોડવાની રહેશે.</p>
          <p>4. આ ચોપડા વિતરણ ધોરણ ૫ થી ૧૨ ના વિદ્યાર્થીઓ માટે જ રાખવામાં આવેલ છે.</p>
          <p>5. દરેક વિદ્યાર્થી દીઠ એક ડઝન ચોપડા મફત આપવામાં આવશે, જેનાં વિદ્યાર્થીઓ એ
            કોઈ પૈસા ચૂકવવાના રહેશે નહિ.</p>
          <p>6. આ ફોર્મમાં ઘરના અન્ય સભ્યોની વિગત મોબાઈલ નંબર સાથેની આપવાની રહેશે
            દરેક એ પોતાની ગોત્ર લખવી.</p>
          <p>7. વિદ્યાર્થીનીઓ સિવાય માતા/ બહેન/ દીકરીઓની વિગતમાં મોબાઈલ નંબર લાખવાના રહેશે નહિ.</p>
        </div>

        {/* Family Members Table */}
        <div className="mt-10">
          <h3 className="font-semibold mt-6 mb-2 underline text-sm sm:text-base">
            ઘરના અન્ય સભ્યોની વિગત :-
          </h3>

          <FamilyMembersTable 
            members={familyMembers}
            setMembers={setFamilyMembers}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-10">

          {/* Student Name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <label className="font-medium whitespace-nowrap text-sm sm:text-base">
              વિદ્યાર્થીનું નામ (ગોત્ર સાથે) :-
            </label>
            <input
              type="text"
              name="studentName"
              onChange={handleChange}
              className="flex-1 border-b outline-none text-sm sm:text-base"
            />
          </div>

          {/* Father & Mother */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <label className="whitespace-nowrap text-sm sm:text-base">પિતાનું નામ :-</label>
              <input
                type="text"
                name="fatherName"
                onChange={handleChange}
                className="flex-1 border-b outline-none text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <label className="whitespace-nowrap text-sm sm:text-base">માતાનું નામ :-</label>
              <input
                type="text"
                name="motherName"
                onChange={handleChange}
                className="flex-1 border-b outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <label className="whitespace-nowrap text-sm sm:text-base">મોબાઈલ નંબર :-</label>
            <input
              type="text"
              name="mobile"
              onChange={handleChange}
              className="flex-1 border-b outline-none text-sm sm:text-base"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <label className="whitespace-nowrap text-sm sm:text-base">ઘરનું સરનામું :-</label>
            <textarea
              name="address"
              onChange={handleChange}
              className="flex-1 border-b outline-none text-sm sm:text-base"
            />
          </div>

          {/* School Name */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <label className="whitespace-nowrap text-sm sm:text-base">શાળાનું નામ :-</label>
            <input
              type="text"
              name="schoolName"
              onChange={handleChange}
              className="flex-1 border-b outline-none text-sm sm:text-base"
            />
          </div>

          {/* Standard */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <label className="whitespace-nowrap text-sm sm:text-base">ધોરણ :-</label>
            <input
              type="text"
              name="standard"
              onChange={handleChange}
              className="flex-1 border-b outline-none text-sm sm:text-base"
            />
          </div>

          {/* School Address */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <label className="whitespace-nowrap text-sm sm:text-base">શાળાનું સરનામું :-</label>
            <textarea
              name="schoolAddress"
              onChange={handleChange}
              className="flex-1 border-b outline-none text-sm sm:text-base"
            />
          </div>

          {/* Student Table with class and school name */}
          <div>
            <h3 className="font-semibold mt-10 mb-2 underline text-sm sm:text-base">
              ઘરમાં જે ભણતા હોયે એમની વિગત :-
            </h3>

            <StudentDetailsTable 
              students={students}
              setStudents={setStudents}
            />
          </div>

          {/* Submit */}
          <div className="text-center mt-6">
            <button 
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base w-full sm:w-auto disabled:bg-blue-400"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}