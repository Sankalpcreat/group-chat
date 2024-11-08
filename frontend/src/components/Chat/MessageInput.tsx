import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="mt-4 flex">
      <input
        type="text"
        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
