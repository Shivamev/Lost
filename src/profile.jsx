import { useState } from 'react';
import {
  User,
  List,
  Award,
  Settings,
  ChevronDown,
  ChevronUp,
  LogOut,
} from 'lucide-react';

const ProfileSection = ({BottomNav}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const user = {
    name: 'Shivam Sharma',
    email: 'shivam@example.com',
  };

  const logout = () => {
    // Replace this with real logout logic if needed
    console.log('User logged out');
    setShowLogoutPopup(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-fancy animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-white shadow-sm animate-slideUp">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md animate-bounceIn">
              <User size={32} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>

            <div className="flex justify-center space-x-6 mt-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">12</div>
                <div className="text-xs text-gray-500">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">8</div>
                <div className="text-xs text-gray-500">Helped</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-yellow-600">4.8⭐</div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Options Section */}
      <div className="max-w-md mx-auto px-4 py-4 animate-slideUp">
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          {/* My Posts */}
          <button className="w-full flex items-center p-4 hover:bg-gray-50 transition duration-200 border-b border-gray-100 active:scale-[0.98]">
            <List size={20} className="text-blue-500 mr-3" />
            <span className="text-gray-800 font-medium">My Posts</span>
          </button>

          {/* Badges */}
          <button className="w-full flex items-center p-4 hover:bg-gray-50 transition duration-200 border-b border-gray-100 active:scale-[0.98]">
            <Award size={20} className="text-yellow-500 mr-3" />
            <span className="text-gray-800 font-medium">Badges & Rewards</span>
            <span className="ml-auto bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">3 new</span>
          </button>

          {/* Accordion for Settings */}
          <button
            className="w-full flex items-center p-4 hover:bg-gray-50 transition duration-200 border-b border-gray-100 active:scale-[0.98]"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={20} className="text-gray-600 mr-3" />
            <span className="text-gray-800 font-medium">Settings</span>
            <span className="ml-auto">
              {showSettings ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </button>
          {showSettings && (
            <div className="px-6 py-4 text-sm text-gray-600 bg-gray-50 animate-fadeIn border-t border-gray-100">
              <p className="mb-1">• Change password</p>
              <p className="mb-1">• Notification preferences</p>
              <p>• Privacy & visibility</p>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={() => setShowLogoutPopup(true)}
            className="w-full flex items-center p-4 hover:bg-red-50 transition duration-200 text-red-600 font-medium active:scale-[0.98]"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default ProfileSection;
