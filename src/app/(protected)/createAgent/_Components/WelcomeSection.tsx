import { UserPlus2 } from 'lucide-react'
import React from 'react'

type Props = {}

const WelcomeSection = (props: Props) => {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
                    <UserPlus2 className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                    Welcome, Admin!
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Ready to expand your team? Creating new agents helps distribute workload,streamline operations, and improve responsiveness. Assign tasks efficiently and scale your support system with ease.
                </p>
            </div>
        </div>

    )
}

export default WelcomeSection