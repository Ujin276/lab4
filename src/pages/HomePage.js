import { useEffect, useState } from 'react';

export default function HomePage({ navigateTo }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(savedUsers);
  }, []);

  const handleUserClick = (index) => {
    localStorage.setItem('selectedUserIndex', index);
    navigateTo('userPlaces');
  };

  return (
    <div className="w-full max-w-md border border-gray-300 rounded">
      <div className="flex justify-end border-b border-gray-300">
        <div className="p-2 text-sm flex space-x-2">
          <button onClick={() => navigateTo('register')} className="text-blue-600 hover:underline">
            Бүртгүүлэх
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('login')} className="text-blue-600 hover:underline">
            Нэвтрэх
          </button>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-medium text-center mb-4">Нүүр хуудас</h2>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">Бүртгэлтэй хэрэглэгч алга.</p>
        ) : (
          <div className="space-y-4">
            {users.map((u, index) => (
              <div key={index} className="flex items-center space-x-3">
                <img src={u.imageURL || users} alt="User" className="w-8 h-8 rounded-full object-cover" />
                <button
                  onClick={() => handleUserClick(index)}
                  className="border border-gray-300 rounded px-4 py-2 w-64 text-left"
                >
                  {u.name || `Хэрэглэгч ${index + 1}`}
                </button>
              </div>  
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
