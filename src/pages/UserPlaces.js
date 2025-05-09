import { useEffect, useState } from 'react';
import places from '../assets/places.jpg';

export default function UserPlaces({ navigateTo }) {
  const [userPlaces, setUserPlaces] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
  const index = Number(localStorage.getItem('selectedUserIndex')); 
  const allUsers = JSON.parse(localStorage.getItem('users')) || [];

  if (allUsers[index]) {
    setUserName(allUsers[index].name || `Хэрэглэгч ${index + 1}`);
  }

  const allPlaces = JSON.parse(localStorage.getItem('places')) || [];

  const filtered = allPlaces
    .map((place, i) => ({ ...place, originalIndex: i }))
    .filter((p) => p.userIndex === index); 

  setUserPlaces(filtered);
}, []);


  return (
    <div className="w-full max-w-md border border-gray-300 rounded">
      <div className="border-b border-gray-300 p-2 text-sm">
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigateTo('home')}
            className="text-blue-600 hover:underline"
          >
            Буцах
          </button>
          
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-medium text-center mb-4">
          {userName} - ийн газрууд
        </h2>

        {userPlaces.length === 0 ? (
          <p className="text-center text-gray-500">Газар бүртгэгдээгүй байна.</p>
        ) : (
          <div className="space-y-4">
            {userPlaces.map((place, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <img
                  src={place.imageUrl || places}
                  alt="Place"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <button
                  onClick={() => {
                    localStorage.setItem('selectedPlaceIndex', place.originalIndex);
                    localStorage.setItem('selectedPlaceFrom', 'userPlaces');
                    navigateTo('detail');
                  }}
                  className="border border-gray-300 rounded px-4 py-2 w-64 text-left"
                >
                  {place.title || `Газар ${idx + 1}`}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
