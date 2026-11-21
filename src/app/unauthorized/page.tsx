"use client"
const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-7xl font-bold text-red-500 mb-4">
          403
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Access Denied
        </h1>

        <p className="text-gray-500 mb-8">
          Sorry, you don't have permission to access this page.
          Please contact the administrator if you think this is a mistake.
        </p>

        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

export default Unauthorized
