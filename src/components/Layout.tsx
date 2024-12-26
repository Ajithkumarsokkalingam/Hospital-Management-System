import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  Package,
  AlertCircle,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react';
import { useState } from 'react';

function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const { currentUser, setCurrentUser } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
          <div className="flex flex-col h-full">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">HMS</h1>
            </div>
            
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <LayoutDashboard className="w-5 h-5 mr-3" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/appointments"
                    className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <Calendar className="w-5 h-5 mr-3" />
                    Appointments
                  </Link>
                </li>
                <li>
                  <Link
                    to="/patients"
                    className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <Users className="w-5 h-5 mr-3" />
                    Patients
                  </Link>
                </li>
                <li>
                  <Link
                    to="/doctors"
                    className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <Stethoscope className="w-5 h-5 mr-3" />
                    Doctors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inventory"
                    className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <Package className="w-5 h-5 mr-3" />
                    Inventory
                  </Link>
                </li>
                <li>
                  <Link
                    to="/emergency"
                    className="flex items-center p-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <AlertCircle className="w-5 h-5 mr-3" />
                    Emergency
                  </Link>
                </li>
              </ul>
            </nav>
            
            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Logged in as: {currentUser?.name}
                <br />
                Role: {currentUser?.role}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;