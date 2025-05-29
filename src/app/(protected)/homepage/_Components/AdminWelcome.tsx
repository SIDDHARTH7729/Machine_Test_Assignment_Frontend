import { BarChart3 } from 'lucide-react'
import React from 'react'

type Props = {}

const AdminWelcome = (props: Props) => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Your central hub for managing agents, analyzing and assigning tasks to them, adding agents and seeing their tasks.
          Navigate through different sections using the sidebar to get started.
        </p>
      </div>
    </div>
  )
}

export default AdminWelcome