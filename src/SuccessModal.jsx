export default function SuccessModal({ registrationNumber, onClose }) {
  if (!registrationNumber) return null;

  return (
    <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 sm:p-8 animate-fadeIn">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-3">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-xl sm:text-2xl font-bold text-center text-green-600 mb-4">
          ફોર્મ સફળતાપૂર્વક સબમિટ થયું!
        </h2>

        {/* Registration Number */}
        <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700 text-center mb-2">તમારો રજિસ્ટ્રેશન નંબર:</p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 text-center tracking-wider">
            {registrationNumber}
          </p>
        </div>

        {/* Important Note */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-sm text-gray-800 font-semibold mb-2">⚠️ મહત્વપૂર્ણ સૂચના:</p>
          <p className="text-xs sm:text-sm text-gray-700">
            આ રજિસ્ટ્રેશન નંબર સુરક્ષિત રાખો. ભવિષ્યમાં તમારી વિગત શોધવા માટે આ નંબરની જરૂર પડશે.
          </p>
        </div>

        {/* OK Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-lg text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          OK
        </button>
      </div>
    </div>
  );
}
