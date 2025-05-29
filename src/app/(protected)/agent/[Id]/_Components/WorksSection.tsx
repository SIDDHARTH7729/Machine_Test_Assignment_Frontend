"use client"
import axios from 'axios';
import React, { useEffect } from 'react';

interface Works {
  _id: string;
  FirstName: string;
  Phone: string;
  Notes: string;
  agentId: string;
  sameId: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface Agent {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const WorksSection = ({ agentId }: { agentId: string }) => {
  const [error, setError] = React.useState<null | string>(null);
  const [works, setWorks] = React.useState<Works[]>([]);
  const [agent, setAgent] = React.useState<Agent | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const response = await axios.post(
          "/api/specificAgentWorks",
          { agentId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
       
        if (response.data.success) {
          setWorks(response.data.data.agentWorks);
          setAgent(response.data.data.agent);
          setError(null);
        } else {
          setError(response.data.error || "Something went wrong.");
        }
      } catch (err: any) {
        setError(err?.response?.data?.error || "Failed to fetch agent data.");
      } finally {
        setLoading(false);
      }
    };

    if (agentId) {
      fetchAgentData();
    }
  }, [agentId]);

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-96">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg">Loading agent data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Works</h1>
        </div>
        <p className="text-gray-600">Manage and view all works assigned to this agent</p>
      </div>

      
      {agent && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{agent.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">EMAIL</p>
                    <p className="text-gray-900 font-medium">{agent.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">MOBILE</p>
                    <p className="text-gray-900 font-medium">{agent.mobile}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 md:col-span-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M3 7h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">JOINED</p>
                    <p className="text-gray-900 font-medium">{new Date(agent.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Works Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Total Works: <span className="text-blue-500">{works.length}</span>
          </h3>
        </div>
      </div>

      {works.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <div key={work._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">{work.FirstName}</h4>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600 font-medium">{work.Phone}</span>
                  </div>

                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-600 text-sm leading-relaxed">{work.Notes}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M3 7h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                      </svg>
                      <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Created</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{new Date(work.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                  </div>
                </div>

                {/* <div className="mt-6">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200">
                    View Details
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Works Found</h3>
          <p className="text-gray-600">This agent doesn't have any works assigned yet.</p>
        </div>
      )}
    </div>
  );
};

export default WorksSection;
