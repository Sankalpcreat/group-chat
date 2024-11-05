import React, { useState } from 'react';
import { GuestLoginPopupProps } from '../../types/GuestLoginPopup';
import { UserName, UserAge } from '../../types/User';

const GuestLoginPopup: React.FC<GuestLoginPopupProps> = ({ isVisible, onClose, onLogin }) => {
  const [name, setName] = useState<UserName>('');  
  const [age, setAge] = useState<UserAge>('');    

  const handleLogin = () => {
    const ageNumber = parseInt(age, 10);
    if (name.trim() && ageNumber > 0) {
      onLogin(name, ageNumber);
      onClose();
    } else {
      alert('Please enter a valid name and age.');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Enter Guest Details</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-4 text-gray-600">Cancel</button>
          <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">Login</button>
        </div>
      </div>
    </div>
  );
};

export default GuestLoginPopup;
