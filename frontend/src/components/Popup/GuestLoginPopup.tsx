import React, { useState } from 'react';

interface GuestLoginPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onLogin: (userName: string) => void;
}

const GuestLoginPopup: React.FC<GuestLoginPopupProps> = ({ isVisible, onClose, onLogin }) => {
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (name.trim() !== '') {
      onLogin(name);
      setName('');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Enter your name to join</h2>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
          onClick={handleLogin}
        >
          Join
        </button>
        <button className="mt-2 text-sm text-gray-600" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GuestLoginPopup;
