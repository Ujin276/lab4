import { useEffect, useState } from 'react';

export default function PlaceDetail({ navigateTo }) {
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const index = localStorage.getItem('selectedPlaceIndex');
    const allPlaces = JSON.parse(localStorage.getItem('places')) || [];

    if (index !== null && allPlaces[index]) {
      setPlace(allPlaces[index]);
    }
  }, []);

  if (!place) {
    return <p className="text-center mt-10">Газрын мэдээлэл олдсонгүй...</p>;
  }

  return (
    <div className="w-full max-w-sm border border-black mx-auto mt-4 p-4 space-y-4">
      <button
  onClick={() => {
    const from = localStorage.getItem('selectedPlaceFrom');
    if (from === 'AfterLogin') {
      navigateTo('AfterLogin');
    } else if (from === 'userPlaces') {
      navigateTo('userPlaces');
    } else {
      navigateTo('home'); // default
    }
  }}
  className="text-blue-600 hover:underline"
>
  Буцах
</button>

      <div className="text-lg font-semibold text-center">{place.title}</div>

      <img
        src={place.imageUrl}
        alt="place"
        className="w-full h-40 object-cover border"
      />

      <div className="border p-2 rounded bg-gray-100">
        <strong>Тайлбар:</strong> {place.description}
      </div>

      <div className="border p-2 rounded bg-gray-100">
        <strong>Байршил:</strong> {place.location}
      </div>
    </div>
  );
}
