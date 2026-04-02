import { useState } from "react";
import FamilyMembersTable from "./FamilyMembersTable";
import StudentDetailsTable from "./StudentDetailsTable";
import SuccessModal from "./SuccessModal";

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

  const [files, setFiles] = useState({
    resultFile: null,
    aadharFile: null,
  });

  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      const dataToSend = {
        ...formData,
        familyMembers,
        students,
      };
      
      console.log("=== Frontend: Preparing to send ===");
      console.log("Form data:", dataToSend);
      console.log("Files:", files);
      
      formDataToSend.append("formData", JSON.stringify(dataToSend));

      if (files.resultFile) {
        formDataToSend.append("resultFile", files.resultFile);
        console.log("Appending resultFile:", files.resultFile.name);
      }
      
      if (files.aadharFile) {
        formDataToSend.append("aadharFile", files.aadharFile);
        console.log("Appending aadharFile:", files.aadharFile.name);
      }

      console.log("Sending to:", `${import.meta.env.VITE_API_URL}/api/form/submit`);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/form/submit`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        // Show success modal with registration number
        setRegistrationNumber(data.registrationNumber);
        setShowSuccessModal(true);
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

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setRegistrationNumber("");
    
    // Reset form after user acknowledges
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
    setFiles({ resultFile: null, aadharFile: null });
    
    // Reset file inputs
    document.querySelectorAll('input[type="file"]').forEach(input => {
      input.value = '';
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-3 sm:p-6 flex justify-center items-start py-8">
      {/* Success Modal */}
      <SuccessModal 
        registrationNumber={registrationNumber}
        onClose={handleModalClose}
      />
      
      <div className="bg-white shadow-2xl rounded-lg p-6 sm:p-10 w-full max-w-5xl border-t-4 border-blue-600">

        {/* Header */}
        <div className="border-b-2 border-red-600 pb-4 mb-6">
          <div className="flex flex-col items-center mb-4">
            <img
              src="/main-logo.png"
              alt="શ્રી શ્રીયાદે પ્રજાપતિ ચેરીટેબલ ટ્રસ્‍ટ"
              className="h-20 sm:h-24 w-auto mb-3"
            />
          </div>
          <h1 className="text-center font-bold text-xl sm:text-2xl text-red-700 mb-2">
            જય શ્રી શ્રીયાદેમાં
          </h1>
          <h2 className="text-center font-semibold text-base sm:text-lg text-red-600 mb-2">
            શ્રી શ્રીયાદે પ્રજાપતિ ચેરીટેબલ ટ્રસ્‍ટ
          </h2>
          <h3 className="text-center text-sm sm:text-base text-gray-700 font-medium">
            નિ: શુલ્ક ચોપડા વિતરણ લાભાર્થી ફોર્મ ૨૦૨૬
          </h3>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 mb-8 rounded-r-lg">
          <h3 className="text-center font-bold text-base sm:text-lg text-blue-900 mb-4">સૂચનો</h3>
          <div className="text-xs sm:text-sm space-y-2 text-gray-800">
            <p className="flex items-start">
              <span className="font-semibold mr-2 text-blue-700">1.</span>
              <span>આ ચોપડા વિતરણ માત્ર અને માત્ર ભણતરને ધ્યાનમાં રાખીને જ કરવામાં આવી રહ્યું છે.</span>
            </p>
            <p className="flex items-start">
              <span className="font-semibold mr-2 text-blue-700">2.</span>
              <span>આ ચોપડા વિતરણ આપણા પુરબીયા પ્રજાપતિ સમાજ પુરતુ જ રાખવામાં આવેલ છે.</span>
            </p>
            <p className="flex items-start">
              <span className="font-semibold mr-2 text-blue-700">3.</span>
              <span>દરેક વિદ્યાર્થીએ પોતાના આધારકાર્ડની તેમજ જે તે ધોરણની પરીક્ષા પાસ કરી હોય એ ધોરણના માર્કશીટની ઝેરોક્ષ ફોર્મની સાથે જોડવાની રહેશે.</span>
            </p>
            <p className="flex items-start">
              <span className="font-semibold mr-2 text-blue-700">4.</span>
              <span>આ ચોપડા વિતરણ ધોરણ ૫ થી ૧૨ ના વિદ્યાર્થીઓ માટે જ રાખવામાં આવેલ છે.</span>
            </p>
            <p className="flex items-start">
              <span className="font-semibold mr-2 text-blue-700">5.</span>
              <span>દરેક વિદ્યાર્થી દીઠ એક ડઝન ચોપડા મફત આપવામાં આવશે, જેનાં વિદ્યાર્થીઓ એ કોઈ પૈસા ચૂકવવાના રહેશે નહિ.</span>
            </p>
            <p className="flex items-start">
              <span className="font-semibold mr-2 text-blue-700">6.</span>
              <span>આ ફોર્મમાં ઘરના અન્ય સભ્યોની વિગત મોબાઈલ નંબર સાથેની આપવાની રહેશે દરેક એ પોતાની ગોત્ર લખવી.</span>
            </p>
            <p className="flex items-start">
              <span className="font-semibold mr-2 text-blue-700">7.</span>
              <span>વિદ્યાર્થીનીઓ સિવાય માતા/ બહેન/ દીકરીઓની વિગતમાં મોબાઈલ નંબર લાખવાના રહેશે નહિ.</span>
            </p>
          </div>
        </div>

        {/* Student Table with class and school name */}
        <div className="mt-8 mb-8">
          <h3 className="font-semibold text-base sm:text-lg text-blue-900 mb-4 pb-2 border-b-2 border-blue-200">
            ઘરમાં જે ભણતા હોયે એમની વિગત
          </h3>

          <StudentDetailsTable
            students={students}
            setStudents={setStudents}
          />
        </div>

        <form onSubmit={handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
          }
        }} className="space-y-6">

          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 pb-3 border-b-4 border-blue-600">વિદ્યાર્થીની વિગત</h2>
          </div>

          {/* Student Name */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="font-medium whitespace-nowrap text-sm sm:text-base text-gray-700 min-w-fit">
                વિદ્યાર્થીનું નામ (ગોત્ર સાથે) :-
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="flex-1 border-b-2 border-gray-300 focus:border-blue-600 outline-none text-sm sm:text-base px-2 py-1 bg-white rounded"
                required
              />
            </div>
          </div>

          {/* Father & Mother */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="whitespace-nowrap text-sm sm:text-base text-gray-700 font-medium">પિતાનું નામ :-</label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className="flex-1 border-b-2 border-gray-300 focus:border-blue-600 outline-none text-sm sm:text-base px-2 py-1 bg-white rounded"
                  required
                />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="whitespace-nowrap text-sm sm:text-base text-gray-700 font-medium">માતાનું નામ :-</label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  className="flex-1 border-b-2 border-gray-300 focus:border-blue-600 outline-none text-sm sm:text-base px-2 py-1 bg-white rounded"
                  required
                />
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="whitespace-nowrap text-sm sm:text-base text-gray-700 font-medium">મોબાઈલ નંબર :-</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="flex-1 border-b-2 border-gray-300 focus:border-blue-600 outline-none text-sm sm:text-base px-2 py-1 bg-white rounded"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex flex-col gap-2">
              <label className="whitespace-nowrap text-sm sm:text-base text-gray-700 font-medium">ઘરનું સરનામું :-</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="flex-1 border-2 border-gray-300 focus:border-blue-600 outline-none text-sm sm:text-base px-3 py-2 bg-white rounded"
                required
              />
            </div>
          </div>

          {/* School Name */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="whitespace-nowrap text-sm sm:text-base text-gray-700 font-medium">શાળાનું નામ :-</label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                className="flex-1 border-b-2 border-gray-300 focus:border-blue-600 outline-none text-sm sm:text-base px-2 py-1 bg-white rounded"
                required
              />
            </div>
          </div>

          {/* Standard */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="whitespace-nowrap text-sm sm:text-base text-gray-700 font-medium">ધોરણ :-</label>
              <input
                type="text"
                name="standard"
                value={formData.standard}
                onChange={handleChange}
                className="flex-1 border-b-2 border-gray-300 focus:border-blue-600 outline-none text-sm sm:text-base px-2 py-1 bg-white rounded"
                required
              />
            </div>
          </div>

          {/* School Address */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex flex-col gap-2">
              <label className="whitespace-nowrap text-sm sm:text-base text-gray-700 font-medium">શાળાનું સરનામું :-</label>
              <textarea
                name="schoolAddress"
                value={formData.schoolAddress}
                onChange={handleChange}
                rows="3"
                className="flex-1 border-2 border-gray-300 focus:border-blue-600 outline-none text-sm sm:text-base px-3 py-2 bg-white rounded"
                required
              />
            </div>
          </div>

          {/* Document Uploads Section */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 sm:p-6 rounded-r-lg">
            <h3 className="font-semibold text-base sm:text-lg text-blue-900 mb-4">દસ્તાવેજો અપલોડ કરો</h3>
            
            {/* Result File */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base text-gray-700 font-medium">
                  પરિણામ (માર્કશીટ) - PDF અથવા ઈમેજ :-
                </label>
                <input
                  type="file"
                  name="resultFile"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="text-sm sm:text-base text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, JPEG અથવા PNG ફાઈલ અપલોડ કરો</p>
              </div>
            </div>

            {/* Aadhar Card File */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base text-gray-700 font-medium">
                  આધાર કાર્ડ - PDF અથવા ઈમેજ :-
                </label>
                <input
                  type="file"
                  name="aadharFile"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="text-sm sm:text-base text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, JPEG અથવા PNG ફાઈલ અપલોડ કરો</p>
              </div>
            </div>
          </div>

          {/* Family Members Table */}
          <div className="mb-8">
            <h3 className="font-semibold text-base sm:text-lg text-blue-900 mb-4 pb-2 border-b-2 border-blue-200">
              ઘરના અન્ય સભ્યોની વિગત
            </h3>

            <FamilyMembersTable
              members={familyMembers}
              setMembers={setFamilyMembers}
            />
          </div>

          {/* Submit */}
          <div className="text-center mt-8 pt-6 border-t-2 border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 sm:px-12 py-3 rounded-lg text-sm sm:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              {/* {loading ? "સબમિટ થઈ રહ્યું છે..." : "ફોર્મ સબમિટ કરો"} */}
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}