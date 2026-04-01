import React, { useState } from "react";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form Submitted");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">

        {/* Header */}
        <h1 className="text-center font-bold text-xl underline mb-2">
          જય શ્રી શ્રીયાદેમાં
        </h1>
        <h2 className="text-center font-semibold underline mb-2">
          શ્રી શ્રીયાદે પ્રજાપતિ ચેરીટેબલ ટ્રસ્‍ટ
        </h2>
        <h3 className="text-center underline mb-6">
          નિ: શુલ્ક ચોપડા વિતરણ લાભાર્થી ફોર્મ ૨૦૨૬
        </h3>

        {/* Instructions */}
        <div className="mt-6 text-sm space-y-2 mt-10">
          <h3 className="text-center font-bold text-lg underline mb-7">-: સૂચનો :-</h3>
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
          <h3 className="font-semibold mt-6 mb-2 underline">
            ઘરના અન્ય સભ્યોની વિગત :-
          </h3>

          <table className="w-full border text-sm">
            <thead>
              <tr>
                <th className="border p-2">નં.</th>
                <th className="border p-2">નામ</th>
                <th className="border p-2">મોબાઈલ નંબર</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, i) => (
                <tr key={i}>
                  <td className="border p-2 text-center">{i + 1}</td>
                  <td className="border p-2">
                    <input className="w-full outline-none" />
                  </td>
                  <td className="border p-2">
                    <input className="w-full outline-none" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-10">

          {/* Student Name */}
          <div>
            <label className="block font-medium mb-1">
              વિદ્યાર્થીનું નામ (ગોત્ર સાથે) :-
            </label>
            <input
              type="text"
              name="studentName"
              onChange={handleChange}
              className="w-full border-b outline-none"
            />
          </div>

          {/* Father & Mother */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>પિતાનું નામ :-</label>
              <input
                type="text"
                name="fatherName"
                onChange={handleChange}
                className="w-full border-b outline-none"
              />
            </div>
            <div>
              <label>માતાનું નામ :-</label>
              <input
                type="text"
                name="motherName"
                onChange={handleChange}
                className="w-full border-b outline-none"
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label>મોબાઈલ નંબર :-</label>
            <input
              type="text"
              name="mobile"
              onChange={handleChange}
              className="w-full border-b outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label>ઘરનું સરનામું :-</label>
            <textarea
              name="address"
              onChange={handleChange}
              className="w-full border-b outline-none"
            />
          </div>

          {/* School Name */}
          <div>
            <label>શાળાનું નામ :-</label>
            <input
              type="text"
              name="schoolName"
              onChange={handleChange}
              className="w-full border-b outline-none"
            />
          </div>

          {/* Standard */}
          <div>
            <label>ધોરણ :-</label>
            <input
              type="text"
              name="standard"
              onChange={handleChange}
              className="w-full border-b outline-none"
            />
          </div>

          {/* School Address */}
          <div>
            <label>શાળાનું સરનામું :-</label>
            <textarea
              name="schoolAddress"
              onChange={handleChange}
              className="w-full border-b outline-none"
            />
          </div>

          {/* Student Table with class and school name */}
          <div>
            <h3 className="font-semibold mt-6 mb-2 underline">
              ઘરમાં જે ભણતા હોયે એમની વિગત :-
            </h3>

            <table className="w-full border text-sm">
              <thead>
                <tr>
                  <th className="border p-2">નં.</th>
                  <th className="border p-2">નામ</th>
                  <th className="border p-2">ધોરણ</th>
                  <th className="border p-2">શાળાનું નામ</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, i) => (
                  <tr key={i}>
                    <td className="border p-2 text-center">{i + 1}</td>
                    <td className="border p-2">
                      <input className="w-full outline-none" />
                    </td>
                    <td className="border p-2">
                      <input className="w-full outline-none" />
                    </td>
                    <td className="border p-2">
                      <input className="w-full outline-none" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Submit */}
          <div className="text-center mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}