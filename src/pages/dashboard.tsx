import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(usersData);
  }, []);

  const columns = [
    { label: 'S. No.', key: 'serial' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Skillset', key: 'skillset' },
    { label: 'Bio', key: 'bio' },
    { label: 'Profile Picture', key: 'profilePicture' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-black">Welcome to Dashboard</h1>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-black">
            {columns.map((col) => (
              <th key={col.key} className="py-2 px-4 text-left">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user.email || index} className="border-b border-gray-200 text-black">
              {columns.map((col) => {
                const value = col.key === 'serial' ? index + 1 : user[col.key];
                if (col.key === 'profilePicture') {
                  return (
                    <td key={col.key} className="py-2 px-4">
                      {value ? (
                        <img
                          src={value}
                          alt={`${user.name || user.fullName || 'User'}'s profile`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 italic text-black">No picture</span>
                      )}
                    </td>
                  );
                }

                return (
                  <td key={col.key} className="py-2 px-4">
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Dashboard;
