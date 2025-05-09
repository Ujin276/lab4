import { useState, useEffect } from 'react';

export default function EditPlacePage({ navigateTo, selectedPlaceIndex }) {
  const [places, setPlaces] = useState([]);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    setPlaces(storedPlaces);

    if (
      selectedPlaceIndex !== null &&
      storedPlaces[selectedPlaceIndex]
    ) {
      const selected = storedPlaces[selectedPlaceIndex];
      setTitle(selected.title || '');
      setLocation(selected.location || '');
      setDescription(selected.description || '');
      setAddress(selected.address || '');
      setImageUrl(selected.imageUrl || '');
    }
  }, [selectedPlaceIndex]);

  const handleSave = () => {
    const updated = [...places];
    updated[selectedPlaceIndex] = {
      ...updated[selectedPlaceIndex],
      title,
      location,
      description,
      address,
      imageUrl,
    };
    localStorage.setItem('places', JSON.stringify(updated));
    alert('Амжилттай хадгалагдлаа!');
    navigateTo('AfterLogin');
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-4 text-center">Газрыг засах</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Гарчиг"
        className="w-full border p-2 mb-2 rounded"
      />

      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Байршил"
        className="w-full border p-2 mb-2 rounded"
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Тайлбар"
        className="w-full border p-2 mb-2 rounded"
      />

      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Хаяг"
        className="w-full border p-2 mb-2 rounded"
      />

      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Зураг URL"
        className="w-full border p-2 mb-4 rounded"
      />

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Хадгалах
      </button>
    </div>
  );
}
