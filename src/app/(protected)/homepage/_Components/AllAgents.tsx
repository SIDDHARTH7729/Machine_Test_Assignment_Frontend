"use client"
import React, { useEffect, useState } from 'react'
import { User, Mail, Phone, Calendar, AlertCircle, Users } from 'lucide-react'
import axios from 'axios';
import { useRouter } from 'next/navigation'

type Props = {}
interface Agent {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const AllAgents = (props: Props) => {
    const [ErrorMap, SetErrorMap] = useState<boolean>(false);
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    
    // formatting the date from response
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Function to handle view details button click
    const handleViewDetails = (agentId: string) => {
        router.push(`/agent/${agentId}`);
    }

    useEffect(() => {
        async function fetchAgents() {
            try {
                setLoading(true);
                const response = await axios.get('/api/getallagents', {
                    headers: {
                        'Content-Type': 'application/json',
                    },withCredentials:true,
                });
                
                const data = response.data;
                
                if (!data.success) {
                    SetErrorMap(true);
                } else {
                    SetErrorMap(false);
                    const agentsArray: Agent[] = data.data;
                    setAgents(agentsArray);
                }
            } catch (error: any) {
                console.error("Error fetching agents:", error);
                SetErrorMap(true);
            } finally {
                setLoading(false);
            }
        }
        fetchAgents();
    }, []);

    
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    
    if (ErrorMap) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Agents</h3>
                    <p className="text-red-600">Unable to fetch agents data. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="mb-8">
                <div className="flex items-center mb-4">
                    <Users className="w-8 h-8 text-blue-600 mr-3" />
                    <h1 className="text-3xl font-bold text-gray-900">All Agents</h1>
                </div>
                <p className="text-gray-600">
                    Manage and view all registered agents in your system
                </p>
                <div className="mt-4 flex items-center">
                    <span className="text-sm text-gray-500">
                        Total Agents: 
                    </span>
                    <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {agents.length}
                    </span>
                </div>
            </div>

            {agents.length === 0 ? (
                <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Agents Found</h3>
                    <p className="text-gray-500">There are no agents registered in the system yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {agents.map((agent) => (
                        <div
                            key={agent._id}
                            id={agent._id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden group"
                        >
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-3">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-white text-center truncate">
                                    {agent.name}
                                </h3>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-4">
                                {/* Email */}
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Mail className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                            Email
                                        </p>
                                        <p className="text-sm text-gray-900 break-words">
                                            {agent.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Phone className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                            Mobile
                                        </p>
                                        <p className="text-sm text-gray-900">
                                            {agent.mobile}
                                        </p>
                                    </div>
                                </div>

                                {/* Created At */}
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Calendar className="w-4 h-4 text-gray-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                            Joined
                                        </p>
                                        <p className="text-sm text-gray-900">
                                            {formatDate(agent.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                <button onClick={() => handleViewDetails(agent._id)} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllAgents;