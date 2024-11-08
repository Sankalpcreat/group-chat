import React from 'react';
import { Message } from '../../types/Message';

interface ChatBoxProps {
  messages: Message[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div className="h-64 border border-gray-300 rounded-lg overflow-y-scroll p-4 bg-white">
      {messages.map((message) => (
        <div key={message.id} className="mb-2">
          <strong>{message.userName}:</strong> <span>{message.content}</span>
          <div className="text-xs text-gray-400">{new Date(message.timestamp).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
