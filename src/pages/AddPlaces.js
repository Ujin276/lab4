import { useState } from 'react';

export default function AddPlacePage({ navigateTo }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSave = () => {
    if (!title || !location || !description || !address || !imageUrl) {
      alert('Бүх талбарыг бүрэн бөглөнө үү!');
      return;
    }

    
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userIndex = loggedInUser?.index;

    if (userIndex === undefined) {
      alert('Хэрэглэгч нэвтрээгүй байна.');
      return;
    }

    const newPlace = {
      title,
      location,
      description,
      address,
      imageUrl,
      userIndex: userIndex, // 🟡 Хэрэглэгчтэй холбох индекс
    };

    const existingPlaces = JSON.parse(localStorage.getItem('places')) || [];
    const updatedPlaces = [...existingPlaces, newPlace];
    localStorage.setItem('places', JSON.stringify(updatedPlaces));

    alert('Газар амжилттай нэмэгдлээ!');
    navigateTo('AfterLogin');
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4 text-center">Газар бүртгэх</h2>

      <input
        type="text"
        placeholder="Гарчиг"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border w-full px-3 py-2 mb-2 rounded"
      />

      <input
        type="text"
        placeholder="Байршил"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border w-full px-3 py-2 mb-2 rounded"
      />

      <input
        type="text"
        placeholder="Тайлбар"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border w-full px-3 py-2 mb-2 rounded"
      />

      <input
        type="text"
        placeholder="Хаяг"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border w-full px-3 py-2 mb-2 rounded"
      />

      <input
        type="text"
        placeholder="Зурагны URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="border w-full px-3 py-2 mb-4 rounded"
      />

      <div className="flex justify-between">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Хадгалах
        </button>
        <button
          onClick={() => navigateTo('AfterLogin')}
          className="border px-4 py-2 rounded"
        >
          Буцах
        </button>
      </div>
    </div>
  );
}
