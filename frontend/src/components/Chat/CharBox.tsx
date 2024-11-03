import React from 'react';
import { Message } from '../../types/Message';

interface ChatBoxProps {
  messages: Message[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div className="chat-box overflow-y-auto p-4 bg-gray-100 h-full">
      {messages.map((message) => (
        <div key={message.id} className="mb-2">
          <strong>{message.userName}:</strong> {message.content}
          <div className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
