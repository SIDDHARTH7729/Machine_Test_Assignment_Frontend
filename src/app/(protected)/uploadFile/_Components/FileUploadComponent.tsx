'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { UploadFileProps } from '../page';
import axios from 'axios';
interface ResultType{
  setResult: (result:UploadFileProps ) => void;
}

const FileUpload = ({setResult}:ResultType) => {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage(null);
      setError(null);
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const files = e.dataTransfer.files
    if (files && files.length > 0 && files[0].type === 'text/csv') {
      setFile(files[0])
      setMessage(null)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file to upload.")
      setMessage(null)
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const response = await axios.post("/api/uploadFile", formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },withCredentials:true,
      })

      // get response data from apii route
      const data = await response.data;
      console.log("Response from upload API:", data.data.data)
      if (data.success) {
        setMessage("File uploaded and processed successfully.")
        setFile(null)
        setResult(data.data.data)
      } else {
        setError(data.message || "Upload failed.")
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong during upload.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="  p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Upload CSV File</h1>
              <p className="text-gray-400 text-lg">Drag and drop your CSV file or click to browse</p>
            </div>

            {/* Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer hover:bg-gray-750 ${
                dragOver 
                  ? 'border-blue-400 bg-blue-400/10' 
                  : file 
                    ? 'border-green-400 bg-green-400/10' 
                    : 'border-gray-600 hover:border-gray-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="space-y-4">
                {file ? (
                  <>
                    <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white">{file.name}</p>
                      <p className="text-gray-400">
                        {(file.size / 1024).toFixed(2)} KB • CSV File
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                      dragOver ? 'bg-blue-500/20' : 'bg-gray-700'
                    }`}>
                      <Upload className={`w-8 h-8 transition-colors ${
                        dragOver ? 'text-blue-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white mb-2">
                        {dragOver ? 'Drop your CSV file here' : 'Choose a CSV file'}
                      </p>
                      <p className="text-gray-400">
                        Drag and drop your file here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Supports: CSV files up to 10MB
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleUpload}
                disabled={loading || !file}
                className="px-8 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl min-w-[200px] transition-all duration-200"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center gap-3">
                    <Upload className="w-5 h-5" />
                    Upload File
                  </span>
                )}
              </Button>
            </div>

            {/* Status Messages */}
            {(message || error) && (
              <div className="mt-8">
                {message && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <p className="text-green-300 font-medium">{message}</p>
                  </div>
                )}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                    <p className="text-red-300 font-medium">{error}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-750 px-8 py-6 border-t border-gray-700">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Supported formats: CSV</span>
              <span>Maximum file size: 10MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUpload
