import { useEffect, useState } from 'react';
import logOut from '../assets/log out.png';
import places from '../assets/places.jpg';
import deletePng from '../assets/delete.png';
import edit from '../assets/edit.png';

export default function AfterLoginPage({ navigateTo, setSelectedPlaceIndex }) {
  const [username, setUsername] = useState('');
  const [placesList, setPlaces] = useState([]);

  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (storedUser && storedUser.name) {
    setUsername(storedUser.name);
  }

  const savedPlaces = JSON.parse(localStorage.getItem('places')) || [];

  if (storedUser && typeof storedUser.index === 'number') {
    const myPlaces = savedPlaces.filter(p => p.userIndex === storedUser.index); 
    setPlaces(myPlaces);
  } else {
    setPlaces([]); 
  }
}, []);


  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert('Та системээс гарлаа.');
    navigateTo('home');
  };

  const handleDelete = (index) => {
    if (window.confirm('Та энэ газрыг устгахдаа итгэлтэй байна уу?')) {
      const updated = [...placesList];
      updated.splice(index, 1);
      setPlaces(updated);
      localStorage.setItem('places', JSON.stringify(updated));
    }
  };

  const handleEdit = (index) => {
    setSelectedPlaceIndex(index);
    navigateTo('editPlace');
  };

  const handleViewDetail = (index) => {
    localStorage.setItem('selectedPlaceIndex', index);
    localStorage.setItem('selectedPlaceFrom', 'AfterLogin');
    navigateTo('detail');
  };

  return (
    <div className="w-full max-w-md border border-gray-300 rounded">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 px-2 py-1 text-sm">
        <button
          onClick={() => navigateTo('addPlace')}
          className="text-blue-600 hover:underline"
        >
          Газар нэмэх
        </button>
        <div className="flex space-x-2 items-center">
          <button className="text-black">{username || 'Хэрэглэгч'}</button>
          <button onClick={handleLogout}>
            <img src={logOut} alt="logout" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-medium text-center mb-4">Нүүр хуудас</h2>

        {placesList.length === 0 ? (
          <p className="text-center text-gray-500">Газар оруулаагүй байна.</p>
        ) : (
          <div className="space-y-4">
            {placesList.map((place, index) => (
              <div key={index} className="flex items-center space-x-2">
                <img
                  src={place.imageUrl || places}
                  alt="Place"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <button
                  onClick={() => handleViewDetail(index)}
                  className="flex-1 border border-gray-300 rounded px-4 py-2 text-left"
                >
                  {place.title || `Миний газар ${index + 1}`}
                </button>

                <img
                  src={edit}
                  alt="edit"
                  className="w-4 h-4 cursor-pointer hover:scale-110"
                  onClick={() => handleEdit(index)}
                />
                <img
                  src={deletePng}
                  alt="delete"
                  className="w-4 h-4 cursor-pointer hover:scale-110"
                  onClick={() => handleDelete(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
