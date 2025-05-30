"use client";
import React, { useState } from "react";
import {
  Home,
  ChevronLeft,
  ChevronRight,
  File,
  LogOut,
  PersonStanding,
  LayoutDashboardIcon,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  onClick?: () => void;
}

const logout = async () => {
  try {
    const response = await axios.get("/api/logout", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (response.data.success) {
      toast.success("Logged out successfully");
      window.location.href = "/";
    } else {
      toast.error("Failed to log out");
    }
  } catch (error) {
    toast.error("Logout failed");
  }
};

const items: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/homepage",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "createAgent",
    url: "/createAgent",
    icon: PersonStanding,
  },
  {
    title: "uploadFile",
    url: "/uploadFile",
    icon: File,
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
    onClick: logout,
  },
];

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`bg-gray-900 text-white pt-18 h-screen transition-all duration-300 ease-in-out ${
        isMinimized ? "w-12" : "w-48"
      } relative flex flex-col`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-gray-900 border border-gray-700 rounded-full p-1.5 hover:bg-gray-800 transition-colors duration-200 z-10"
        aria-label={isMinimized ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isMinimized ? (
          <ChevronRight size={16} className="text-gray-400" />
        ) : (
          <ChevronLeft size={16} className="text-gray-400" />
        )}
      </button>

      <div className="p-4 border-b border-gray-700">
        <h2
          className={`font-bold text-xl transition-opacity duration-300 ${
            isMinimized ? "opacity-0" : "opacity-100"
          }`}
        >
          {!isMinimized && ""}
        </h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            if (item.onClick) {
              return (
                <li key={index}>
                  <button
                    onClick={item.onClick}
                    title={isMinimized ? item.title : undefined}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 group w-full text-left cursor-pointer"
                  >
                    <IconComponent
                      size={20}
                      className="text-gray-400 group-hover:text-white transition-colors duration-200"
                    />
                    <span
                      className={`ml-3 transition-all duration-300 ${
                        isMinimized
                          ? "opacity-0 w-0 overflow-hidden"
                          : "opacity-100 w-auto"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                </li>
              );
            }

            return (
              <li key={index}>
                <Link
                  href={item.url}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 group"
                  title={isMinimized ? item.title : undefined}
                >
                  <IconComponent
                    size={20}
                    className="text-gray-400 group-hover:text-white transition-colors duration-200"
                  />
                  <span
                    className={`ml-3 transition-all duration-300 ${
                      isMinimized
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100 w-auto"
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div
          className={`text-sm text-gray-400 transition-opacity duration-300 ${
            isMinimized ? "opacity-0" : "opacity-100"
          }`}
        >
          {!isMinimized && "© Agents APP"}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
