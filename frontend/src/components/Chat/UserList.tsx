import React from 'react';

interface UserListProps {
  users: string[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Users in Room</h3>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index} className="text-sm text-gray-700">
              {user}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No users in the room.</p>
      )}
    </div>
  );
};

export default UserList;
