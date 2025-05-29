import { UploadCloud } from 'lucide-react'

const FileUploadWelcome = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-6">
          <UploadCloud className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
          Upload Task List
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Welcome to the Upload Section. Here, you can upload a CSV file containing contact data including phone numbers and notes. This helps in bulk task distribution, saving time and reducing manual effort. Make sure the format is correct before uploading.
        </p>
      </div>
    </div>
  )
}

export default FileUploadWelcome
